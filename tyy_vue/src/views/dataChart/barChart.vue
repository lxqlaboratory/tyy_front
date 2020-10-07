<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        name:'barChart',
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '350px'
            },
            chartX: {
                type: Array,
                required: true
            },
            dataList: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                chart: '' ,
            }
        },
        watch: {
            chartX: {
                deep: true,
                handler(val) {
                    this.chartX = val;
                    this.setOptions()
                }
            },
            dataList: {
                deep: true,
                handler(val) {
                    this.dataList = val;
                    this.setOptions()
                }
            },

        },
        computed: {
            operatorList: function () {
                const data = [];
                this.dataList.map((value)=>{
                    data.push(value.name)
                });
                return data
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initChart()
            })
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
        methods: {
            initChart() {
                this.chart = echarts.init(this.$el, 'macarons')
                this.setOptions()
            },
            setOptions() {
                this.chart.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: this.operatorList
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.chartX
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: this.getOperatorList(this.dataList)
                })
            },
            getOperatorList(data){
                console.log(data)
                const list =[];
                data.map((value)=>{
                    list.push({
                        name: value.name,
                        smooth: true,
                        type: 'bar',
                        data: value.data,
                    })
                });
                return list;

            }
        }
    }
</script>
