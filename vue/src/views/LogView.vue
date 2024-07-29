<template>
    <div>
        <div style="margin-bottom: 15px">
            <el-input v-model="params.name" style="width: 200px" placeholder="操作内容を入力してください"></el-input>
            <el-input v-model="params.username" style="width: 200px; margin-left: 5px" placeholder="操作人を入力してください"></el-input>
            <el-button type="warning" style="margin-left: 10px" @click="findBySearch">検索</el-button>
            <el-button type="warning" style="margin-left: 10px" @click="reset">リセット</el-button>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="操作内容"></el-table-column>
                <el-table-column prop="time" label="操作時間"></el-table-column>
                <el-table-column prop="username" label="操作人"></el-table-column>
                <el-table-column prop="ip" label="IP"></el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-popconfirm title="削除しますか？" @confirm="del(row.id)">
                            <el-button slot="reference" type="danger" style="margin-left: 5px">削除</el-button>
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
                    username: '',
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
                request.get("/log/search", {
                    params: this.params
                }).then(res => {
                    if (res.code === '0') {
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error' // 修正为 error 类型
                        });
                    }
                });
            },
            reset() {
                this.params = {
                    pageNum: 1,
                    pageSize: 5,
                    name: '',
                    username: '' // 修正为 username
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
                request.post("/log", this.form).then(res => {
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
                            type: 'error' // 修正为 error 类型
                        });
                    }
                });
            },
            del(id) {
                request.delete("/log/" + id).then(res => {
                    if (res.code === '0') {
                        this.$message({
                            message: '削除しました',
                            type: 'success'
                        });
                        this.findBySearch();
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error' // 修正为 error 类型
                        });
                    }
                });
            }
        }
    };
</script>
