<!--<template>-->
<!--&lt;!&ndash;    <div>&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        <el-button type="primary">按钮</el-button>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;        <div>ようこそ</div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <div style="color: #89031d; font-size: 24px; ">ようこそ</div>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--    <div>-->
<!--        <div style="display: flex">-->
<!--            <div style="flex: 1;">-->
<!--                <div style="margin-bottom: 15px; font-weight: bold; font-size: 18px">システム告知</div>-->
<!--                <el-collapse v-model="activeName" accordion>-->
<!--                    <el-collapse-item v-for="item in data" :title="item.name" :name="item.id">-->
<!--                        <div style="padding: 0 20px">{{ item.content }}</div>-->
<!--                    </el-collapse-item>-->
<!--                </el-collapse>-->
<!--            </div>-->
<!--            <div style="width: 50px"></div>-->
<!--            <div style="flex: 1; margin-top: 50px;">-->
<!--                <div id="bie" style="width: 100%; height: 400px"></div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div style="display: flex">-->
<!--            <div style="flex: 1; margin-top: 50px">-->
<!--                <div id="bar" style="width: 100%; height: 400px"></div>-->
<!--            </div>-->
<!--            <div style="flex: 1; margin-top: 50px">-->
<!--                <div id="line" style="width: 100%; height: 400px"></div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->

<!--    import request from "@/utils/request";-->
<!--    import * as echarts from "echarts";-->

<!--    export default {-->
<!--        name: 'HomeView',-->

<!--        data(){-->
<!--            return{-->
<!--                activeName:'1',-->
<!--                data:[]-->
<!--            };-->
<!--        },-->
<!--        mounted(){-->
<!--            this.findNotice();-->
<!--            this.initEcharts();-->
<!--        },-->
<!--        methods:{-->
<!--            findNotice(){-->
<!--                request.get("/notice").then(res =>{-->
<!--                    if(res.code === '0') {-->
<!--                        this.data = res.data;-->
<!--                        this.activeName = res.data[0].id;-->
<!--                    }else{-->
<!--                        this.$message.error(res.msg)-->
<!--                    }-->
<!--                })-->
<!--            },-->
<!--            initEcharts() {-->
<!--                request.get("/book/echarts/bie").then(res => {-->
<!--                    if (res.code === '0') {-->
<!--                        // 开始渲染饼图数据-->
<!--                        this.initBie(res.data)-->
<!--                    } else {-->
<!--                        this.$message.error(res.msg)-->
<!--                    }-->
<!--                })-->
<!--                request.get("/book/echarts/bar").then(res => {-->
<!--                    if (res.code === '0') {-->
<!--                        // 开始渲染柱状图数据-->
<!--                        let map = res.data;-->
<!--                        this.initBar(map.xAxis, map.yAxis)-->
<!--                        // 开始渲染折线图数据-->
<!--                        this.initLine(map.xAxis, map.yAxis)-->
<!--                    } else {-->
<!--                        this.$message.error(res.msg)-->
<!--                    }-->
<!--                })-->
<!--            },-->
<!--            initBie(data) {-->
<!--                let chartDom = document.getElementById('bie');-->
<!--                let myChart = echarts.init(chartDom);-->
<!--                let option;-->

<!--                option = {-->
<!--                    title: {-->
<!--                        text: '图书统计（饼图）',-->
<!--                        subtext: '统计维度：图书分类',-->
<!--                        left: 'center'-->
<!--                    },-->
<!--                    tooltip: {-->
<!--                        trigger: 'item'-->
<!--                    },-->
<!--                    legend: {-->
<!--                        orient: 'vertical',-->
<!--                        left: 'left'-->
<!--                    },-->
<!--                    series: [-->
<!--                        {-->
<!--                            name: '图书分类',-->
<!--                            type: 'pie',-->
<!--                            radius: '50%',-->
<!--                            data: data,-->
<!--                            emphasis: {-->
<!--                                itemStyle: {-->
<!--                                    shadowBlur: 10,-->
<!--                                    shadowOffsetX: 0,-->
<!--                                    shadowColor: 'rgba(0, 0, 0, 0.5)'-->
<!--                                }-->
<!--                            }-->
<!--                        }-->
<!--                    ]-->
<!--                };-->

<!--                option && myChart.setOption(option);-->
<!--            },-->
<!--            initBar(xAxis, yAxis) {-->
<!--                let chartDom = document.getElementById('bar');-->
<!--                let myChart = echarts.init(chartDom);-->
<!--                let option;-->

<!--                option = {-->
<!--                    title: {-->
<!--                        text: '图书统计（柱状图）',-->
<!--                        subtext: '统计维度：图书分类',-->
<!--                        left: 'center'-->
<!--                    },-->
<!--                    xAxis: {-->
<!--                        type: 'category',-->
<!--                        data: xAxis-->
<!--                    },-->
<!--                    yAxis: {-->
<!--                        type: 'value'-->
<!--                    },-->
<!--                    series: [-->
<!--                        {-->
<!--                            data: yAxis,-->
<!--                            type: 'bar',-->
<!--                            showBackground: true,-->
<!--                            backgroundStyle: {-->
<!--                                color: 'rgba(180, 180, 180, 0.2)'-->
<!--                            }-->
<!--                        }-->
<!--                    ]-->
<!--                };-->

<!--                option && myChart.setOption(option);-->
<!--            },-->
<!--            initLine(xAxis, yAxis) {-->
<!--                let chartDom = document.getElementById('line');-->
<!--                let myChart = echarts.init(chartDom);-->
<!--                let option;-->

<!--                option = {-->
<!--                    title: {-->
<!--                        text: '图书统计（折线图）',-->
<!--                        subtext: '统计维度：图书分类',-->
<!--                        left: 'center'-->
<!--                    },-->
<!--                    xAxis: {-->
<!--                        type: 'category',-->
<!--                        data: xAxis-->
<!--                    },-->
<!--                    yAxis: {-->
<!--                        type: 'value'-->
<!--                    },-->
<!--                    series: [-->
<!--                        {-->
<!--                            data: yAxis,-->
<!--                            type: 'line'-->
<!--                        }-->
<!--                    ]-->
<!--                };-->

<!--                option && myChart.setOption(option);-->
<!--            },-->


<!--        }-->
<!--    }-->
<!--</script>-->

<template>
    <div>
        <div style="display: flex">
            <div style="flex: 1;">
                <div style="margin-bottom: 15px; font-weight: bold; font-size: 18px">システム告知</div>
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item v-for="item in data" :key="item.id" :title="item.name" :name="item.id">
                        <div style="padding: 0 20px">{{ item.content }}</div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div style="width: 50px"></div>
            <div style="flex: 1; margin-top: 50px;">
                <div id="bie" style="width: 100%; height: 400px"></div>
            </div>
        </div>
        <div style="display: flex">
            <div style="flex: 1; margin-top: 50px">
                <div id="bar" style="width: 100%; height: 400px"></div>
            </div>
            <div style="flex: 1; margin-top: 50px">
                <div id="line" style="width: 100%; height: 400px"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import request from "@/utils/request";
    import * as echarts from "echarts";

    export default {
        name: 'HomeView',

        data() {
            return {
                activeName: '1',
                data: []
            };
        },
        mounted() {
            this.findNotice();
            this.$nextTick(() => {
                this.initEcharts();
            });
        },
        methods: {
            findNotice() {
                request.get("/notice").then(res => {
                    if (res.code === '0') {
                        this.data = res.data;
                        this.activeName = res.data[0].id;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            },
            initEcharts() {
                request.get("/book/echarts/bie").then(res => {
                    if (res.code === '0') {
                        this.initBie(res.data);
                    } else {
                        this.$message.error(res.msg);
                    }
                });

                request.get("/book/echarts/bar").then(res => {
                    if (res.code === '0') {
                        let map = res.data;
                        this.initBar(map.xAxis, map.yAxis);
                        this.initLine(map.xAxis, map.yAxis);
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            },
            initBie(data) {
                let chartDom = document.getElementById('bie');
                let myChart = echarts.init(chartDom);
                let option = {
                    title: {
                        text: '書籍統計（円グラフ）',
                        subtext: '統計の種類：書籍カテゴリ',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                            name: '書籍カテゴリ',
                            type: 'pie',
                            radius: '50%',
                            data: data,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                myChart.setOption(option);
            },
            initBar(xAxis, yAxis) {
                let chartDom = document.getElementById('bar');
                let myChart = echarts.init(chartDom);
                let option = {
                    title: {
                        text: '書籍統計（棒グラフ）',
                        subtext: '統計の種類：書籍カテゴリ',
                        left: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: yAxis,
                            type: 'bar',
                            showBackground: true,
                            backgroundStyle: {
                                color: 'rgba(180, 180, 180, 0.2)'
                            }
                        }
                    ]
                };

                myChart.setOption(option);
            },
            initLine(xAxis, yAxis) {
                let chartDom = document.getElementById('line');
                let myChart = echarts.init(chartDom);
                let option = {
                    title: {
                        text: '書籍統計（折れ線グラフ）',
                        subtext: '統計の種類：書籍カテゴリ',
                        left: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: yAxis,
                            type: 'line'
                        }
                    ]
                };

                myChart.setOption(option);
            }
        }
    }
</script>

<style scoped>
    /* Your CSS styles */
</style>
