<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        name:'bingChart',
        props: {
            name:{
                type: String,
                default: ''
            },
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
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: this.operatorList
                    },
                    series: [
                        {
                            type: 'pie',
                            name:this.name,
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: this.dataList,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                })
            },

        }
    }
</script>
