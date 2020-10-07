<template>
  <div style="display: flex;flex-direction: column;">
    <div style="display: flex;flex-direction: row;justify-content: center;margin-top: 30px;">
      <el-card style="width: 50%;margin-left: 20px;">
        <div>
          <span>过去七天出团(单位：人)</span>
        </div>
        <line-chart :line-list="preSevenGroup.chartY" :chart-x="preSevenGroup.chartX" width="100%"></line-chart>
      </el-card>
      <el-card style="width: 50%;margin-left: 20px;margin-right: 20px">
        <div>
          <span>未来七天出团(单位：人)</span>
        </div>
        <line-chart :line-list="nextSevenGroup.chartY" :chart-x="nextSevenGroup.chartX" width="100%" ></line-chart>
      </el-card>
    </div>
    <div style="display: flex;flex-direction: row;justify-content: center;margin-top: 30px;margin-bottom: 50px">
      <el-card style="width: 50%;margin-left: 20px;">
        <div>
          <span>月出团对比(单位：人)</span>
        </div>
        <bar-chart :data-list="fiveYearGroup.chartY" :chart-x="fiveYearGroup.chartX"></bar-chart>
      </el-card>
      <el-card style="width: 50%;margin-left: 20px;margin-right: 20px">
        <div>
          <span>最近五年出团对比(单位：人)</span>
        </div>
        <bar-chart :data-list="monthGroup.chartY" :chart-x="monthGroup.chartX"></bar-chart>
      </el-card>
    </div>
  </div>
</template>

<script>
  import lineChart from '@/views/dataChart/lineChart'
  import barChart  from '@/views/dataChart/barChart'
  import bingChart  from '@/views/dataChart/bingChart'

  import {getGroupCharts} from '@/api/group'

  export default {
        name: "groupChart",
        components:{lineChart,barChart,bingChart},
        data(){
            return{
                preSevenGroup:{
                    chartX: [],
                    chartY: [
                        {
                            name:'过去七天团',
                            data: [],
                        }
                    ]
                },
                nextSevenGroup:{
                    chartX: [],
                    chartY: [
                        {
                            name:'未来七天团',
                            data: [],
                        }
                    ]
                },
                fiveYearGroup:{
                    chartX: [],
                    chartY: [
                        {
                            name:'最近五年出团',
                            data: [],
                        }
                    ]
                },
                monthGroup:{
                    chartX: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                    chartY: [
                        {
                            name:'月出团',
                            data: [],
                        }
                    ]
                },

            }
        },
      methods: {
          initData(){
              getGroupCharts().then(res=>{
                  this.preSevenGroup=res.preSevenDay;
                  this.nextSevenGroup=res.nextSevenDay;
                  this.fiveYearGroup=res.fiveYear;
                  this.monthGroup.chartY=res.twoYearMonth;
              }).catch(err=>{

              })

          },
      },
      created() {
          this.initData()
      },

  }
</script>

<style scoped>

</style>
