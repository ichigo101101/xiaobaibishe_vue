<template>
    <div class="about">
        <div>
            <el-input v-model="params.name" style="width: 200px" placeholder="カテゴリー名を入力してください"></el-input>
            <el-button type="purple" style="margin-left: 10px" @click="findBySearch()">捜査</el-button>
            <el-button type="purple" @click="reset()">リセット</el-button>
            <el-button type="primary" style="margin-left: 10px" @click="add()">追加</el-button>
            <el-popconfirm title="削除してもよろしいですか？" @confirm="delBatch()">
                <el-button slot="reference" type="danger" style="margin-left: 5px">一括削除</el-button>
            </el-popconfirm>


        </div>
        <div>
            <el-table :data="tableData" style="width: 100%; margin: 15px 0px"  ref="table" @selection-change="handleSelectionChange" :row-key="getRowKeys">
                <el-table-column ref="table" type="selection" width="55" align="center" :reserve-selection="true"></el-table-column>-->
                <el-table-column prop="name" label="カテゴリー名" ></el-table-column>
                <el-table-column prop="description" label="カテゴリーの説明 " ></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="purple" @click="edit(scope.row)">編集</el-button>
                        <el-popconfirm title="削除しますか？" @confirm="del(scope.row.id)">
                            <el-button slot="reference" type="primary" style="margin-left: 5px" label="削除">削除</el-button>
                        </el-popconfirm>
                    </template>

                </el-table-column>
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
                        <el-form-item label="カテゴリー名" label-width="15%">
                            <el-input v-model="form.name" autocomplete="off" style="width: 90%"></el-input>
                        </el-form-item>
                        <el-form-item label="説明" label-width="15%">
                            <el-input v-model="form.description" autocomplete="off" style="width: 90%"></el-input>
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
        name: "TypeView",
        data() {
            return {
                // data里定义一个params
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
        //页面加载的时候，做一些事情，在created里面
        created() {
            this.load();
        },
        //定义一些页面上控件触发的时间调用
        methods: {
            load() {
                request.get("/type").then(res => {
                        if (res.code === '0' ) {
                            this.tableData = res.data;
                        }
                    });

            },
            // methods里定义一个findBySearch
            findBySearch() {
                request.get("/type/search", {
                    params: this.params
                }).then(res => {
                    if (res.code === '0') {
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                    } else {
                        this.$message({
                            message:res.msg,
                            type:'error'
                        });

                    }
                })
            },

            // findBySearch() {
            //     request.get("/type/search", {
            //         params: this.params
            //     }).then(res => {
            //         if (res.code === '0') {
            //             this.tableData = res.data.list;
            //             this.total = res.data.total;
            //         } else {
            //             this.$message({
            //                 message: res.msg,
            //                 type: 'error'
            //             });
            //         }
            //     }).catch(error => {
            //         console.error('Error fetching data:', error);
            //     });
            // },

            // findBySearch() {
            //     request.get("/type/search", {
            //         params: {
            //             name: this.params.name,
            //             pageNum: this.params.pageNum,
            //             pageSize: this.params.pageSize
            //         }
            //     }).then(res => {
            //         if (res.code === '0') {
            //             this.tableData = res.data.list;
            //             this.total = res.data.total;
            //         } else {
            //             this.$message({
            //                 message: res.msg,
            //                 type: 'error'
            //             });
            //         }
            //     }).catch(error => {
            //         console.error('Error fetching data:', error);
            //     });
            // },



            reset() {
                this.params = {
                    pageNum: 1,
                    pageSize: 5,
                    name: '',
                    // description: ''
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
                    this.$message.warning("请勾选您要删除的项")
                    return
                }
                request.put("/type/delBatch", this.multipleSelection).then(res => {
                    if (res.code === '0') {
                        this.$message.success("批量删除成功")
                        this.findBySearch()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getRowKeys(row) {
                return row.id;
            }
        },

    }
</script>

