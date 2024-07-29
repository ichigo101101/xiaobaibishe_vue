<template>
    <div>
        <div style="margin-bottom: 15px">
            <el-input v-model="params.name" style="width: 200px" placeholder="ホテル名を入力してください"></el-input>
            <el-button type="warning" style="margin-left: 10px" @click="findBySearch()">検索</el-button>
            <el-button type="warning" style="margin-left: 10px" @click="reset()">リセット</el-button>
            <el-button type="primary" style="margin-left: 10px" @click="add()" v-if="user.role === 'ROLE_ADMIN'">追加</el-button>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="hotelName" label="ホテル名"></el-table-column>
                <el-table-column prop="userName" label="予約者"></el-table-column>
                <el-table-column prop="time" label="予約時間"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-popconfirm title="削除してもよろしいですか？" @confirm="del(scope.row.id)">
                            <el-button slot="reference" type="danger" style="margin-left: 5px" v-if="user.role === 'ROLE_ADMIN'">削除</el-button>
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
    </div>
</template>

<script>
    import request from "@/utils/request";

    export default {
        data() {
            return {
                params: {
                    name: '',
                    author: '',
                    pageNum: 1,
                    pageSize: 5
                },
                tableData: [],
                total: 0,
                dialogFormVisible: false,
                form: {},
                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
            }
        },
        created() {
            this.findBySearch();
        },
        methods: {
            findBySearch() {
                request.get("/reserve/search", {
                    params: this.params
                }).then(res => {
                    if (res.code === '0') {
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                    } else {
                        this.$message.error(res.msg)
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
                    phone: ''
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
            del(id) {
                request.delete("/reserve/" + id).then(res => {
                    if (res.code === '0') {
                        this.$message.success("削除しました");
                        this.findBySearch();
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }
        }
    }
</script>

<!--<template>-->
<!--    <div>-->
<!--        <div style="margin-bottom: 15px">-->
<!--            <el-input v-model="params.name" style="width: 200px" placeholder="ホテル名を入力してください"></el-input>-->
<!--            <el-button type="warning" style="margin-left: 10px" @click="findBySearch">検索</el-button>-->
<!--            <el-button type="warning" style="margin-left: 10px" @click="reset">リセット</el-button>-->
<!--            <el-button type="primary" style="margin-left: 10px" @click="add" v-if="user.role === 'ROLE_ADMIN'">追加</el-button>-->
<!--        </div>-->
<!--        <div>-->
<!--            <el-table :data="tableData" style="width: 100%">-->
<!--                <el-table-column prop="hotelName" label="ホテル名"></el-table-column>-->
<!--                <el-table-column prop="userName" label="予約者"></el-table-column>-->
<!--                <el-table-column prop="time" label="予約時間"></el-table-column>-->
<!--                <el-table-column label="操作">-->
<!--                    <template v-slot="scope">-->
<!--                        &lt;!&ndash; 管理员和用户的操作按钮 &ndash;&gt;-->
<!--                        <el-button type="primary" @click="edit(scope.row)" v-if="user.role === 'ROLE_USER' && scope.row.userId === user.id">編集</el-button>-->
<!--                        <el-button type="primary" @click="reserve(scope.row)" v-if="user.role === 'ROLE_USER' && scope.row.userId === user.id">キャンセル</el-button>-->
<!--                        <el-popconfirm title="削除してもよろしいですか？" @confirm="del(scope.row.id)">-->
<!--                            <el-button slot="reference" type="danger" style="margin-left: 5px" v-if="user.role === 'ROLE_ADMIN'">削除</el-button>-->
<!--                        </el-popconfirm>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--            </el-table>-->
<!--        </div>-->
<!--        <div style="margin-top: 10px">-->
<!--            <el-pagination-->
<!--                    @size-change="handleSizeChange"-->
<!--                    @current-change="handleCurrentChange"-->
<!--                    :current-page="params.pageNum"-->
<!--                    :page-sizes="[5, 10, 15, 20]"-->
<!--                    :page-size="params.pageSize"-->
<!--                    layout="total, sizes, prev, pager, next"-->
<!--                    :total="total">-->
<!--            </el-pagination>-->
<!--        </div>-->
<!--        <div>-->
<!--            <el-dialog title="情報を入力してください" :visible.sync="dialogFormVisible" width="30%">-->
<!--                <el-form :model="form">-->
<!--                    <el-form-item label="ホテル名" label-width="20%">-->
<!--                        <el-input v-model="form.name" autocomplete="off" style="width: 90%"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="ホテル画像" label-width="20%">-->
<!--                        <el-upload action="http://localhost:8080/api/files/upload" :on-success="successUpload">-->
<!--                            <el-button size="small" type="primary">アップロードをクリック</el-button>-->
<!--                        </el-upload>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="ホテル料金" label-width="20%">-->
<!--                        <el-input v-model="form.price" autocomplete="off" style="width: 90%"></el-input>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="残り部屋数" label-width="20%">-->
<!--                        <el-input v-model="form.num" autocomplete="off" style="width: 90%"></el-input>-->
<!--                    </el-form-item>-->
<!--                </el-form>-->
<!--                <div slot="footer" class="dialog-footer">-->
<!--                    <el-button @click="dialogFormVisible = false">キャンセル</el-button>-->
<!--                    <el-button type="primary" @click="submit">確定</el-button>-->
<!--                </div>-->
<!--            </el-dialog>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import request from "@/utils/request";-->

<!--    export default {-->
<!--        data() {-->
<!--            return {-->
<!--                params: {-->
<!--                    name: '',-->
<!--                    pageNum: 1,-->
<!--                    pageSize: 5-->
<!--                },-->
<!--                tableData: [],-->
<!--                total: 0,-->
<!--                dialogFormVisible: false,-->
<!--                form: {},-->
<!--                user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}-->
<!--            };-->
<!--        },-->
<!--        created() {-->
<!--            this.findBySearch();-->
<!--        },-->
<!--        methods: {-->
<!--            findBySearch() {-->
<!--                // 根据用户角色调整请求-->
<!--                if (this.user.role === 'ROLE_USER') {-->
<!--                    // 普通用户只能查看自己的预约记录-->
<!--                    request.get("/reserve/user", {-->
<!--                        params: { ...this.params, userId: this.user.id }-->
<!--                    }).then(res => {-->
<!--                        if (res.code === '0') {-->
<!--                            this.tableData = res.data.list;-->
<!--                            this.total = res.data.total;-->
<!--                        } else {-->
<!--                            this.$message.error(res.msg);-->
<!--                        }-->
<!--                    });-->
<!--                } else if (this.user.role === 'ROLE_ADMIN') {-->
<!--                    // 管理员可以查看所有预约记录-->
<!--                    request.get("/reserve/search", {-->
<!--                        params: this.params-->
<!--                    }).then(res => {-->
<!--                        if (res.code === '0') {-->
<!--                            this.tableData = res.data.list;-->
<!--                            this.total = res.data.total;-->
<!--                        } else {-->
<!--                            this.$message.error(res.msg);-->
<!--                        }-->
<!--                    });-->
<!--                }-->
<!--            },-->
<!--            add() {-->
<!--                this.form = {};-->
<!--                this.dialogFormVisible = true;-->
<!--            },-->
<!--            reset() {-->
<!--                this.params = {-->
<!--                    pageNum: 1,-->
<!--                    pageSize: 5,-->
<!--                    name: ''-->
<!--                };-->
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
<!--            del(id) {-->
<!--                request.delete("/reserve/" + id).then(res => {-->
<!--                    if (res.code === '0') {-->
<!--                        this.$message.success("削除しました");-->
<!--                        this.findBySearch();-->
<!--                    } else {-->
<!--                        this.$message.error(res.msg);-->
<!--                    }-->
<!--                });-->
<!--            },-->
<!--            edit(record) {-->
<!--                this.form = { ...record };-->
<!--                this.dialogFormVisible = true;-->
<!--            },-->
<!--            reserve(record) {-->
<!--                // 用户点击取消预约-->
<!--                request.delete("/reserve/" + record.id).then(res => {-->
<!--                    if (res.code === '0') {-->
<!--                        this.$message.success("予約がキャンセルされました");-->
<!--                        this.findBySearch();-->
<!--                    } else {-->
<!--                        this.$message.error(res.msg);-->
<!--                    }-->
<!--                });-->
<!--            },-->
<!--            successUpload(res) {-->
<!--                this.form.img = res.data;-->
<!--            }-->
<!--        }-->
<!--    };-->
<!--</script>-->
