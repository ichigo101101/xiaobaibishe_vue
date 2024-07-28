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
