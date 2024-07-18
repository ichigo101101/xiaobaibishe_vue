<template>
    <div class="about">
        <div>
            <el-input v-model="params.name" style="width: 200px" placeholder="書名を入力してください"></el-input>
            <el-input v-model="params.author" style="width: 200px; margin-left: 5px" placeholder="著者を入力してください"></el-input>
<!--            <el-button type="warning" style="margin-left: 10px" @click="findBySearch()">捜査</el-button>-->
<!--            <el-button type="warning" @click="reset()">リセット</el-button>-->
<!--            <el-button type="primary" style="margin-left: 10px" @click="add()">追加</el-button>-->
            <el-button type="purple" style="margin-left: 10px" @click="findBySearch()">捜査</el-button>
            <el-button type="purple" @click="reset()">リセット</el-button>
            <el-button type="primary" style="margin-left: 10px" @click="add()">追加</el-button>

            <!--            <el-input style="width: 200px; margin-right: 10px" placeholder="内容を入力してください"></el-input>-->
            <!--            <el-button type="warning">捜査</el-button>-->
            <!--            <el-button type="primary">新規作成</el-button>-->
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%; margin: 15px 0px">
                <el-table-column prop="name" label="書名" ></el-table-column>
                <el-table-column prop="img" label="表紙" >
                    <template v-slot="scope">
                        <el-image
                                style="width: 70px; height: 70px; border-radius: 50%"
                                :src="'http://localhost:8080/api/files/' + scope.row.img"
                                :preview-src-list="['http://localhost:8080/api/files/' + scope.row.img]">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="author" label="著者" ></el-table-column>
                <el-table-column prop="price" label="価格" ></el-table-column>
                <el-table-column prop="press" label="出版社" ></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span style="display: inline-block; width: 100%;">
                            <el-button type="purple" @click="edit(scope.row)" :style="{ fontSize: '12px', textAlign: 'center' }">編集</el-button>
                        </span>
                        <span style="display: inline-block; width: 30%;">
                            <el-popconfirm title="削除しますか？" @confirm="del(scope.row.id)" :style="{ fontSize: '12px', textAlign: 'center' }">
                                <el-button slot="reference" type="primary" label="削除">削除</el-button>
                            </el-popconfirm>
                        </span>
                        <span style="display: inline-block; width: 100%;">
                            <el-button type="purple" @click="down(scope.row.img)" :style="{ fontSize: '12px', textAlign: 'center' }">ダウンロード</el-button>
                        </span>
                    </template>
                </el-table-column>

                <!--                <el-table-column label="操作">-->
<!--                    <template slot-scope="scope">-->
<!--                        <span style="display: inline-block;">-->
<!--                        <el-button type="purple" @click="edit(scope.row)" >編集</el-button>-->
<!--                        <el-button type="purple" @click="down(scope.row.img)">ダウンロード</el-button>-->
<!--                        <el-popconfirm title="削除しますか？" @confirm="del(scope.row.id)">-->
<!--                            <el-button slot="reference" type="primary" style="margin-left: 5px" label="削除">削除</el-button>-->
<!--                        </el-popconfirm>-->
<!--                        </span>-->
<!--                    </template>-->
<!--                </el-table-column>-->

            </el-table>

            <div style="margin-top: 10px">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="params.pageNum"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="params.pageSize"
                        layout="total, sizes, prev, pager, next"
                        :total="total">
                </el-pagination>
            </div>
            <div>
                <el-dialog title="情報を入力してください" :visible.sync="dialogFormVisible" width="30%">
                    <el-form :model="form">
                        <el-form-item label="書名" label-width="20%">
                            <el-input v-model="form.name" autocomplete="off" style="width: 90%"></el-input>
                        </el-form-item>
                        <el-form-item label="表紙" label-width="20%">
                            <el-upload action="http://localhost:8080/api/files/upload" :on-success="successUpload">
                                <el-button size="small" type="primary">アップロード</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="著者" label-width="20%">
                            <el-input v-model="form.author" autocomplete="off" style="width: 90%"></el-input>
                        </el-form-item>
                        <el-form-item label="価格" label-width="20%">
                            <el-input v-model="form.price" autocomplete="off" style="width: 90%"></el-input>
                        </el-form-item>
                        <el-form-item label="出版社" label-width="20%">
                            <el-input v-model="form.press" autocomplete="off" style="width: 90%"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">キャンセル</el-button>
                        <el-button type="primary" @click="submit()">確認</el-button>
                    </div>
                </el-dialog>
            </div>

        </div>

    </div>
</template>

<script>
    import request from "@/utils/request";

    export default {
        name: "BookView",
        data() {
            return {
                // data里定义一个params
                params: {
                    name: '',
                    author: '',
                    pageNum: 1,
                    pageSize: 5
                },
                tableData: [],
                total: 0,
                dialogFormVisible: false,
                form: {}
            }
        },
        //页面加载的时候，做一些事情，在created里面
        created() {
            this.findBySearch();
        },
        //定义一些页面上控件触发的时间调用
        methods: {
            // methods里定义一个findBySearch
            findBySearch() {
                request.get("/book/search", {
                    params: this.params
                }).then(res => {
                    if (res.code === '0') {
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                    } else {
                        // this.$message({
                        //     message:res.msg,
                        //     type:'error'
                        // });
                        this.$message.error(res.msg)

                    }
                })
            },
            reset() {
                this.params = {
                    pageNum: 1,
                    pageSize: 5,
                    name: '',
                    author: ''
                }
                this.findBySearch();
            },
            handleSizeChange(pageSize) {
                this.params.pageSize = pageSize;
                this.findBySearch();
            },
            handleCurrentChange(pageNum) {
                this.params.pageNum = pageNum;
                this.findBySearch();
            },
            add() {
                this.form = {};
                this.dialogFormVisible = true;
            },
            edit(obj) {
                this.form = obj;
                this.dialogFormVisible = true;
            },
            submit() {
                request.post("/admin", this.form).then(res => {
                    if (res.code === '0') {
                        this.$message({
                            message: '操作が完了しました',
                            type: 'success'
                        });
                        this.dialogFormVisible = false;
                        this.findBySearch();
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                })
            },
            del(id) {
                request.delete("/admin/" + id).then(res => {
                    if (res.code === '0') {
                        this.$message({
                            message: '削除しました',
                            type: 'success'
                        });
                        this.findBySearch();
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                    }
                })
            },
            successUpload(res) {
                this.form.img = res.data;
            },
            down(flag) {
                location.href = 'http://localhost:8080/api/files/' + flag
            }
        }

    }
</script>

