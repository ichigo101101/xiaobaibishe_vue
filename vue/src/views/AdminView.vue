<!--<template>-->
<!--    <div class="about">-->
<!--        <div>-->
<!--            <el-input v-model="params.name" style="width: 200px" placeholder="名前を入力してください"></el-input>-->
<!--            <el-input v-model="params.phone" style="width: 200px; margin-left: 5px" placeholder="電話番号を入力してください"></el-input>-->
<!--            <el-button type="purple" style="margin-left: 10px" @click="findBySearch()">捜査</el-button>-->
<!--            <el-button type="purple" @click="reset()">リセット</el-button>-->
<!--            <el-button type="primary" style="margin-left: 10px" @click="add()">追加</el-button>-->

<!--        </div>-->
<!--        <div>-->
<!--            <el-table :data="tableData" style="width: 100%; margin: 15px 0px">-->
<!--                <el-table-column prop="name" label="名前" ></el-table-column>-->
<!--                <el-table-column prop="sex" label="性別" ></el-table-column>-->
<!--                <el-table-column prop="age" label="年齢" ></el-table-column>-->
<!--                <el-table-column prop="phone" label="電話番号" ></el-table-column>-->
<!--                <el-table-column prop="role" label="角色"></el-table-column>-->
<!--                <el-table-column label="操作">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button type="purple" @click="edit(scope.row)">編集</el-button>-->
<!--                        <el-popconfirm title="削除しますか？" @confirm="del(scope.row.id)">-->
<!--                            <el-button slot="reference" type="primary" style="margin-left: 5px" label="削除">削除</el-button>-->
<!--                        </el-popconfirm>-->
<!--                    </template>-->

<!--                </el-table-column>-->
<!--            </el-table>-->

<!--            <div style="margin-top: 10px">-->
<!--                <el-pagination-->
<!--                        @size-change="handleSizeChange"-->
<!--                        @current-change="handleCurrentChange"-->
<!--                        :current-page.sync="params.pageNum"-->
<!--                        :page-sizes="[5, 10, 15, 20]"-->
<!--                        :page-size="params.pageSize"-->
<!--                        layout="total, sizes, prev, pager, next"-->
<!--                        :total="total">-->
<!--                </el-pagination>-->

<!--            </div>-->
<!--            <div>-->
<!--                <el-dialog title="情報を入力してください" :visible.sync="dialogFormVisible" width="30%">-->
<!--                    <el-form :model="form">-->
<!--                        <el-form-item label="名前" label-width="15%">-->
<!--                            <el-input v-model="form.name" autocomplete="off" style="width: 90%"></el-input>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="性別" label-width="15%">-->
<!--                            <el-radio v-model="form.sex" label="男性">男性</el-radio>-->
<!--                            <el-radio v-model="form.sex" label="女性">女性</el-radio>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="年齢" label-width="15%">-->
<!--                            <el-input v-model="form.age" autocomplete="off" style="width: 90%"></el-input>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="電話" label-width="15%">-->
<!--                            <el-input v-model="form.phone" autocomplete="off" style="width: 90%"></el-input>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="角色" label-width="15%">-->
<!--                            <el-select v-model="form.role" placeholder="请选择" style="width: 90%">-->
<!--                                <el-option label="教师" value="ROLE_TEACHER"></el-option>-->
<!--                                <el-option label="学生" value="ROLE_STUDENT"></el-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
<!--                    </el-form>-->
<!--                    <div slot="footer" class="dialog-footer">-->
<!--                        <el-button @click="dialogFormVisible = false">キャンセル</el-button>-->
<!--                        <el-button type="primary" @click="submit()">確認</el-button>-->
<!--                    </div>-->
<!--                </el-dialog>-->
<!--            </div>-->

<!--        </div>-->

<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import request from "@/utils/request";-->

<!--    export default {-->
<!--        name: "AdminView",-->
<!--        data() {-->
<!--            return {-->
<!--                // data里定义一个params-->
<!--                params: {-->
<!--                    name: '',-->
<!--                    phone: '',-->
<!--                    pageNum: 1,-->
<!--                    pageSize: 5-->
<!--                },-->
<!--                tableData: [],-->
<!--                total: 0,-->
<!--                dialogFormVisible: false,-->
<!--                form: {}-->
<!--            }-->
<!--        },-->
<!--        //页面加载的时候，做一些事情，在created里面-->
<!--        created() {-->
<!--            this.load();-->
<!--        },-->
<!--        //定义一些页面上控件触发的时间调用-->
<!--        methods: {-->
<!--            load() {-->
<!--                request.get("/admin").then(res => {-->
<!--                        if (res.code === '0' ) {-->
<!--                            this.tableData = res.data;-->
<!--                        }-->
<!--                    });-->

<!--            },-->
<!--            // methods里定义一个findBySearch-->
<!--            findBySearch() {-->
<!--                request.get("/admin/search", {-->
<!--                    params: this.params-->
<!--                }).then(res => {-->
<!--                    if (res.code === '0') {-->
<!--                        this.tableData = res.data.list;-->
<!--                        this.total = res.data.total;-->
<!--                    } else {-->
<!--                        this.$message({-->
<!--                            message:res.msg,-->
<!--                            type:'error'-->
<!--                        });-->

<!--                    }-->
<!--                })-->
<!--            },-->
<!--            reset() {-->
<!--                this.params = {-->
<!--                    pageNum: 1,-->
<!--                    pageSize: 5,-->
<!--                    name: '',-->
<!--                    phone: ''-->
<!--                }-->
<!--                this.findBySearch();-->
<!--            },-->
<!--            handleSizeChange(pageSize) {-->
<!--                this.params.pageSize = pageSize;-->
<!--                this.findBySearch();-->
<!--            },-->
<!--            handleCurrentChange(pageNum) {-->
<!--                this.params.pageNum = pageNum;-->
<!--                this.findBySearch();-->
<!--            },-->
<!--            add() {-->
<!--                this.form = {};-->
<!--                this.dialogFormVisible = true;-->
<!--            },-->
<!--            edit(obj) {-->
<!--                this.form = obj;-->
<!--                this.dialogFormVisible = true;-->
<!--            },-->
<!--            submit() {-->
<!--                request.post("/admin", this.form).then(res => {-->
<!--                    if (res.code === '0') {-->
<!--                        this.$message({-->
<!--                            message: '操作が完了しました',-->
<!--                            type: 'success'-->
<!--                        });-->
<!--                        this.dialogFormVisible = false;-->
<!--                        this.findBySearch();-->
<!--                    } else {-->
<!--                        this.$message({-->
<!--                            message: res.msg,-->
<!--                            type: 'error'-->
<!--                        });-->
<!--                    }-->
<!--                })-->
<!--            },-->
<!--            del(id) {-->
<!--                request.delete("/admin/" + id).then(res => {-->
<!--                    if (res.code === '0') {-->
<!--                        this.$message({-->
<!--                            message: '削除しました',-->
<!--                            type: 'success'-->
<!--                        });-->
<!--                        this.findBySearch();-->
<!--                    } else {-->
<!--                        this.$message({-->
<!--                            message: res.msg,-->
<!--                            type: 'success'-->
<!--                        });-->
<!--                    }-->
<!--                })-->
<!--            }-->
<!--        },-->

<!--    }-->

<!--</script>-->

<template>
    <div class="about">
        <div>
            <el-input v-model="params.name" style="width: 200px" placeholder="名前を入力してください"></el-input>
            <el-input v-model="params.phone" style="width: 200px; margin-left: 5px" placeholder="電話番号を入力してください"></el-input>
            <el-button type="purple" style="margin-left: 10px" @click="findBySearch()">捜査</el-button>
            <el-button type="purple" @click="reset()">リセット</el-button>
            <el-button type="primary" style="margin-left: 10px" @click="add()">追加</el-button>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%; margin: 15px 0px">
                <el-table-column prop="name" label="名前"></el-table-column>
                <el-table-column prop="sex" label="性別"></el-table-column>
                <el-table-column prop="age" label="年齢"></el-table-column>
                <el-table-column prop="phone" label="電話番号"></el-table-column>
                <el-table-column prop="role" label="角色"></el-table-column>
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
                        :current-page.sync="params.pageNum"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="params.pageSize"
                        layout="total, sizes, prev, pager, next"
                        :total="total">
                </el-pagination>
            </div>
            <el-dialog title="情報を入力してください" :visible.sync="dialogFormVisible" width="30%">
                <el-form :model="form">
                    <el-form-item label="名前" label-width="15%">
                        <el-input v-model="form.name" autocomplete="off" style="width: 90%"></el-input>
                    </el-form-item>
                    <el-form-item label="性別" label-width="15%">
                        <el-radio v-model="form.sex" label="男性">男性</el-radio>
                        <el-radio v-model="form.sex" label="女性">女性</el-radio>
                    </el-form-item>
                    <el-form-item label="年齢" label-width="15%">
                        <el-input v-model="form.age" autocomplete="off" style="width: 90%"></el-input>
                    </el-form-item>
                    <el-form-item label="電話" label-width="15%">
                        <el-input v-model="form.phone" autocomplete="off" style="width: 90%"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" label-width="15%">
                        <el-select v-model="form.role" placeholder="请选择" style="width: 90%">
                            <el-option label="教师" value="ROLE_TEACHER"></el-option>
                            <el-option label="学生" value="ROLE_STUDENT"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">キャンセル</el-button>
                    <el-button type="primary" @click="submit()">確認</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import request from "@/utils/request";

    export default {
        name: "AdminView",
        data() {
            return {
                params: {
                    name: '',
                    phone: '',
                    pageNum: 1,
                    pageSize: 5
                },
                tableData: [],
                total: 0,
                dialogFormVisible: false,
                form: {}
            };
        },
        created() {
            this.findBySearch();
        },
        methods: {
            findBySearch() {
                request.get("/admin/search", {
                    params: this.params
                }).then(res => {
                    if (res.code === '0') {
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            },
            reset() {
                this.params = {
                    pageNum: 1,
                    pageSize: 5,
                    name: '',
                    phone: ''
                };
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
                        this.$message.success("操作が完了しました");
                        this.dialogFormVisible = false;
                        this.findBySearch();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            },
            del(id) {
                request.delete("/admin/" + id).then(res => {
                    if (res.code === '0') {
                        this.$message.success("削除しました");
                        this.findBySearch();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            }
        }
    };
</script>

1