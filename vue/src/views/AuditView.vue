<template>
    <div>
        <div style="margin-bottom: 15px">
            <el-input v-model="params.name" style="width: 200px" placeholder="休暇の理由を入力してください"></el-input>
            <el-button type="purple" style="margin-left: 10px" @click="findBySearch()">検索</el-button>
            <el-button type="purple" style="margin-left: 10px" @click="reset()">リセット</el-button>
            <el-button type="primary" style="margin-left: 10px" @click="add()" v-if="user.role === 'ROLE_STUDENT'">追加</el-button>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="理由"></el-table-column>
                <el-table-column prop="time" label="休暇日"></el-table-column>
                <el-table-column prop="day" label="日数"></el-table-column>
                <el-table-column prop="userName" label="休暇ユーザー"></el-table-column>
                <el-table-column prop="status" label="審査状況"></el-table-column>
                <el-table-column prop="reason" label="審査意見"></el-table-column>
<!--                <el-table-column label="操作">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-row type="flex" justify="start" align="middle" style="margin-bottom: 5px;">-->
<!--                            <el-col :span="10">-->
<!--                                <el-button type="purple" @click="edit(scope.row)" size="mini" v-if="isStudentRole">編集</el-button>-->
<!--                            </el-col>-->
<!--                            <el-col :span="12">-->
<!--                                <el-button type="purple" @click="audit(scope.row)" size="mini" v-if="isTeacherRole">審査</el-button>-->
<!--                            </el-col>-->

<!--                            <el-col :span="10">-->
<!--                                <el-popconfirm title="削除しますか？" @confirm="del(scope.row.id)">-->
<!--                                    <el-button slot="reference" type="primary" size="mini">削除</el-button>-->
<!--                                </el-popconfirm>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
<!--                    </template>-->
<!--                </el-table-column>-->

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="purple" @click="edit(scope.row)"  size="mini" v-if="isStudentRole">編集</el-button>
                        <el-button type="purple" @click="audit(scope.row)" size="mini" v-if="isTeacherRole">審査</el-button>
                        <el-popconfirm title="削除しますか？" @confirm="del(scope.row.id)">
                            <el-button slot="reference" type="primary" style="margin-left: 5px" label="削除" size="mini">削除</el-button>
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
                    <el-form-item label="理由" label-width="15%">
                        <el-input v-model="form.name" autocomplete="off" style="width: 90%"></el-input>
                    </el-form-item>
                    <el-form-item label="休暇日" label-width="15%">
                        <el-date-picker v-model="form.time" type="date" style="width: 90%" placeholder="日付選択" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="日数" label-width="15%">
                        <el-input v-model="form.day" autocomplete="off" style="width: 90%"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">キャンセル</el-button>
                    <el-button type="primary" @click="submit()">確認</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog title="審査を行ってください" :visible.sync="auditVisible" width="30%">
                <el-form :model="form">
                    <el-form-item label="審査状況" label-width="15%">
                        <el-radio v-model="form.status" label="承認"></el-radio>
                        <el-radio v-model="form.status" label="不承認"></el-radio>
                    </el-form-item>
                    <el-form-item label="審査意見" label-width="15%">
                        <el-input v-model="form.reason" autocomplete="off" style="width: 90%"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="auditVisible = false">キャンセル</el-button>
                    <el-button type="primary" @click="submit()">確認</el-button>
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
                    name: "",
                    phone: "",
                    pageNum: 1,
                    pageSize: 5
                },
                tableData: [],
                total: 0,
                dialogFormVisible: false,
                auditVisible: false,
                form: {},
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
            };
        },
        computed: {
            isStudentRole() {
                return this.user.role === "ROLE_STUDENT";
            },
            isTeacherRole() {
                return this.user.role === "ROLE_TEACHER";
            }
        },
        created() {
            this.findBySearch();
        },
        methods: {
            findBySearch() {
                request
                    .get("/audit/search", {
                        params: this.params
                    })
                    .then((res) => {
                        if (res.code === "0") {
                            this.tableData = res.data.list;
                            this.total = res.data.total;
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
            },
            add() {
                this.form = {};
                this.form.userId = this.user.id;
                this.dialogFormVisible = true;
            },
            edit(obj) {
                this.form = obj;
                this.dialogFormVisible = true;
            },
            audit(obj) {
                this.form = obj;
                this.auditVisible = true;
            },
            reset() {
                this.params = {
                    pageNum: 1,
                    pageSize: 5,
                    name: "",
                    phone: ""
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
            submit() {
                request
                    .post("/audit", this.form)
                    .then((res) => {
                        if (res.code === "0") {
                            this.$message.success("操作が完了しました");
                            this.dialogFormVisible = false;
                            this.auditVisible = false;
                            this.findBySearch();
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
            },
            del(id) {
                request
                    .delete("/audit/" + id)
                    .then((res) => {
                        if (res.code === "0") {
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
