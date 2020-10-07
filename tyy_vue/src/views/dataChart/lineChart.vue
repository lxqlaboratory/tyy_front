<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from 'echarts'

    export default {
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
                default: '400px'
            },
            title:{
                type:Object,
                default :()=>{
                    return {
                        text: '',
                        subtext: '',
                        left: 'center'
                    }
                },
            },
            chartX: {
                type: Array,
                required: true
            },
            lineList: {
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
            lineList: {
                deep: true,
                handler(val) {
                    this.lineList = val;
                    this.setOptions()
                }
            },

        },
        computed: {
            operatorList: function () {
                const data = [];
                this.lineList.map((value)=>{
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
                        title: {
                            text: this.title.name,
                            subtext: this.title.subtext,
                            left: this.title.left
                        },
                    xAxis: {
                        data: this.chartX,
                        boundaryGap: true,
                        axisTick: {
                            show: false
                        }
                    },
                    grid: {
                        left: 10,
                        right: 0,
                        bottom: 20,
                        top: 30,
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        padding: [5, 10]
                    },
                    yAxis: {
                        axisTick: {
                            show: false
                        }
                    },
                    legend: {
                        data: this.operatorList
                    },
                    series: this.getOperatorList(this.lineList)
                })
            },
            getOperatorList(data){
                console.log(data)
                const list =[];
                data.map((value)=>{
                    list.push({
                        name: value.name,
                        smooth: true,
                        type: 'line',
                        data: value.data,
                    })
                });
                return list;

            }
        }
    }
</script>
