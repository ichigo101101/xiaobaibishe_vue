<template>
    <div class="about">
        <div>
            <el-input style="width: 200px; margin-right: 10px" placeholder="内容を入力してください"></el-input>
            <el-button type="warning">捜査</el-button>
            <el-button type="primary">新規作成</el-button>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%; margin: 15px 0px">
                <el-table-column prop="date" label="日付" width="180"></el-table-column>
                <el-table-column prop="name" label="名前" width="180"></el-table-column>
                <el-table-column prop="address" label="アドレス"></el-table-column>
                <el-table-column label="操作">
                    <el-button type="primary">編集</el-button>
                    <el-button type="danger">削除</el-button>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '田中愛',
                    address: '千葉県市川市平田４丁目'
                }, {
                    date: '2016-05-04',
                    name: '田中愛',
                    address: '千葉県市川市平田４丁目'
                }, {
                    date: '2016-05-01',
                    name: '田中愛',
                    address: '千葉県市川市平田４丁目'
                }, {
                    date: '2016-05-03',
                    name: '田中愛',
                    address: '千葉県市川市平田４丁目'
                }]
            }
        }
    }
</script>

