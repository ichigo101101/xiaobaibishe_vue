<template>
    <div>
        <div style="margin-bottom: 15px">
            <el-input v-model="params.name" style="width: 200px" placeholder="カテゴリー名を入力してください"></el-input>
            <el-button type="purple" style="margin-left: 10px" @click="findBySearch()">捜査</el-button>
            <el-button type="purple" style="margin-left: 10px" @click="reset()">リセット</el-button>
            <el-button type="purple" style="margin-left: 10px" @click="add()">追加</el-button>
            <el-popconfirm title="削除してもよろしいですか？？" @confirm="delBatch()">
                <el-button slot="reference" type="primary" style="margin-left: 5px">一括削除</el-button>
            </el-popconfirm>
            <el-button type="success" style="margin-left: 10px" @click="exp()">エクスポート</el-button>
            <el-upload action="http://localhost:8080/api/type/upload" style="display: inline-block; margin-left: 10px" :show-file-list="false" :on-success="successUpload">
                <el-button size="small" type="primary">一括インポート</el-button>
            </el-upload>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%" ref="table" @selection-change="handleSelectionChange" :row-key="getRowKeys">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="カテゴリー名"></el-table-column>
                <el-table-column prop="description" label="カテゴリーの説明"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="purple" @click="edit(scope.row)">編集</el-button>
                        <el-popconfirm title="削除しますか？" @confirm="del(scope.row.id)">
                            <el-button slot="reference" type="purple" style="margin-left: 5px">削除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
                    <el-form-item label="カテゴリー名" label-width="15%">
                        <el-input v-model="form.name" autocomplete="off" style="width: 90%"></el-input>
                    </el-form-item>
                    <el-form-item label="カテゴリーの説明" label-width="15%">
                        <el-input v-model="form.description" autocomplete="off" style="width: 90%"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">キャンセル</el-button>
                    <el-button type="primary" @click="submit()">確 認</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import request from "@/utils/request";

    export default {
        data() {
            return {
                params: {
                    name: '',
                    pageNum: 1,
                    pageSize: 5
                },
                tableData: [],
                total: 0,
                dialogFormVisible: false,
                form: {},
                multipleSelection: []
            }
        },
        // 页面加载的时候，做一些事情，在created里面
        created() {
            this.findBySearch();
        },
        // 定义一些页面上控件出发的事件调用的方法
        methods: {
            findBySearch() {
                request.get("/type/search", {
                    params: this.params
                }).then(res => {
                    if (res.code === '0') {
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                    }
                })
            },
            add() {
                this.form = {};
                this.dialogFormVisible = true;
            },
            edit(obj) {
                this.form = obj;
                this.dialogFormVisible = true;
            },
            reset() {
                this.params = {
                    pageNum: 1,
                    pageSize: 5,
                    name: '',
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
            submit() {
                request.post("/type", this.form).then(res => {
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
                request.delete("/type/" + id).then(res => {
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
            delBatch() {
                if (this.multipleSelection.length === 0) {
                    this.$message.warning("削除する項目を選択してください")
                    return
                }
                request.put("/type/delBatch", this.multipleSelection).then(res => {
                    if (res.code === '0') {
                        this.$message.success("一括削除が完了しました")
                        this.findBySearch()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getRowKeys(){
                return row.id;
            },
            exp() {
                let user = localStorage.getItem("user");
                location.href = 'http://localhost:8080/api/type/export?token=' + JSON.parse(user).token
            },
            successUpload(res) {
                if (res.code === '0') {
                    this.$message.success("批量导入成功")
                    this.findBySearch()
                } else {
                    this.$message.error(res.msg)
                }
            }
        }
    }
</script>


