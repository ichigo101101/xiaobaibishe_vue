<template>
    <div class="about">
        <div>
            <el-input v-model="params.name" style="width: 200px" placeholder="名前を入力してください"></el-input>
            <el-input v-model="params.phone" style="width: 200px; margin-left: 5px" placeholder="電話番号を入力してください"></el-input>
            <el-button type="warning" style="margin-left: 10px" @click="findBySearch()">捜査</el-button>
            <el-button type="warning" @click="reset()">リセット</el-button>
<!--            <el-input style="width: 200px; margin-right: 10px" placeholder="内容を入力してください"></el-input>-->
<!--            <el-button type="warning">捜査</el-button>-->
<!--            <el-button type="primary">新規作成</el-button>-->
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%; margin: 15px 0px">
<!--                <el-table-column prop="name" label="名前" width="180"></el-table-column>-->
                <el-table-column prop="name" label="名前" ></el-table-column>
                <el-table-column prop="sex" label="性別" ></el-table-column>
                <el-table-column prop="age" label="年齢" ></el-table-column>
                <el-table-column prop="phone" label="電話番号" ></el-table-column>
                <el-table-column label="操作">
                    <el-button type="primary">編集</el-button>
                    <el-button type="danger">削除</el-button>
                </el-table-column>
            </el-table>

            <el-button type="warning" @click="reset()">リセット</el-button>

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
<!--            <div class="block">-->
<!--                <el-pagination-->
<!--                        @size-change="handleSizeChange"-->
<!--                        @current-change="handleCurrentChange"-->
<!--                        :current-page="currentPage4"-->
<!--                        :page-sizes="[10, 20, 30, 40]"-->
<!--                        :page-size="10"-->
<!--                        layout="total, sizes, prev, pager, next, jumper"-->
<!--                        :total="400">-->
<!--                </el-pagination>-->
<!--            </div>-->

        </div>

    </div>
</template>

<script>
    import request from "@/utils/request";

    export default {
        name: "AdminView",
        data() {
            return {
                // data里定义一个params
                params: {
                    name: '',
                    phone: '',
                    pageNum: 1,
                    pageSize: 5
                },
                tableData: [],
                total: 0
            }
        },
        //页面加载的时候，做一些事情，在created里面
        created() {
            this.load();
        },
        //定义一些页面上控件触发的时间调用
        methods: {
            load() {
                request.get("/admin").then(res => {
                        if (res.code === '0' ) {
                            this.tableData = res.data;
                        }
                    });

            },
            // methods里定义一个findBySearch
            findBySearch() {
                request.get("/admin/search", {
                    params: this.params
                }).then(res => {
                    if (res.code === '0') {
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                    } else {

                    }
                })
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
        },

    }
    // export default {
    //     data() {
    //         return {
    //             tableData: [{
    //                 date: '2016-05-02',
    //                 name: '田中愛',
    //                 address: '千葉県市川市平田４丁目'
    //             }, {
    //                 date: '2016-05-04',
    //                 name: '田中愛',
    //                 address: '千葉県市川市平田４丁目'
    //             }, {
    //                 date: '2016-05-01',
    //                 name: '田中愛',
    //                 address: '千葉県市川市平田４丁目'
    //             }, {
    //                 date: '2016-05-03',
    //                 name: '田中愛',
    //                 address: '千葉県市川市平田４丁目'
    //             }]
    //         }
    //     }
    // }
</script>

