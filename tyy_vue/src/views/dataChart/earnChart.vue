<template>
  <div style="display: flex;flex-direction: column;">
    <div style="display: flex;flex-direction: row;justify-content: center;margin-top: 30px;">
      <el-card style="width: 50%;margin-left: 20px;">
        <div>
          <span>最近毛利状况(单位：元)</span>
        </div>
        <line-chart :line-list="preSevenGroup.chartY" :chart-x="preSevenGroup.chartX" width="100%"></line-chart>
      </el-card>
      <el-card style="width: 50%;margin-left: 20px;margin-right: 20px">
        <div>
          <span>最近五年毛利对比(单位：元)</span>
        </div>
        <bar-chart :data-list="monthGroup.chartY" :chart-x="monthGroup.chartX"></bar-chart>
      </el-card>
    </div>
    <div style="display: flex;flex-direction: row;justify-content: center;margin-top: 30px;margin-bottom: 50px;">
      <el-card style="width: 100%;margin-left: 20px;">
        <div>
          <span>月毛利对比(单位：元)</span>
        </div>
        <bar-chart :data-list="fiveYearGroup.chartY" :chart-x="fiveYearGroup.chartX"></bar-chart>
      </el-card>
    </div>
  </div>
</template>

<script>
  import lineChart from '@/views/dataChart/lineChart'
  import barChart  from '@/views/dataChart/barChart'
  import bingChart  from '@/views/dataChart/bingChart'

  import {getEarnCharts} from '@/api/group'

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
              getEarnCharts().then(res=>{
                  this.preSevenGroup=res.preSevenDay;
                  this.preSevenGroup.chartY.forEach(value => {
                      value.data.forEach((num,index,arr)=>{
                          arr[index]/=100;
                      })
                  });
                  this.fiveYearGroup=res.fiveYear;
                  this.fiveYearGroup.chartY.forEach(value => {
                      value.data.forEach((num,index,arr)=>{
                          arr[index]/=100;
                      })
                  });
                  this.monthGroup.chartY=res.twoYearMonth;
                  this.monthGroup.chartY.forEach(value => {
                      value.data.forEach((num,index,arr)=>{
                          arr[index]/=100;
                      })
                  });
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
