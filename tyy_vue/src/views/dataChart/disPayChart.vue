<template>
  <div style="display: flex;flex-direction: column;">
    <div style="display: flex;flex-direction: row;justify-content: center;margin-top: 30px;">
      <el-card style="width: 50%;margin-left: 20px;">
        <div>
          <span>过去七天营业额(单位：元)</span>
        </div>
        <line-chart :line-list="preSevenPay.chartY" :chart-x="preSevenPay.chartX" width="100%"></line-chart>
      </el-card>
      <el-card style="width: 50%;margin-left: 20px;margin-right: 20px">
        <div>
          <span>最近五年营业额对比(单位：元)</span>
        </div>
        <bar-chart :data-list="fiveYearPay.chartY" :chart-x="fiveYearPay.chartX"></bar-chart>
      </el-card>
    </div>
    <div style="display: flex;flex-direction: row;justify-content: center;margin-top: 30px;">
      <el-card style="width: 100%;margin-left: 20px;margin-right: 20px;">
        <div>
          <span>月营业额对比(单位：元)</span>
        </div>
        <bar-chart :data-list="twoYearMonthPay.chartY" :chart-x="twoYearMonthPay.chartX"></bar-chart>
      </el-card>
    </div>
    <div style="display: flex;flex-direction: row;justify-content: center;margin-top: 30px;margin-bottom: 50px">
      <el-card style="width: 50%;margin-left: 20px;">
        <div>
          <span>营业额行程天数占比(单位：元)</span>
        </div>
        <bing-chart :data-list="dateNumPay" name="营业额"></bing-chart>
      </el-card>
      <el-card style="width: 50%;margin-left: 20px;margin-right: 20px">
        <div>
          <span>最近五年出团对比(单位：元)</span>
        </div>
        <bing-chart :data-list="proTypePay" name="营业额"></bing-chart>
      </el-card>
    </div>
  </div>
</template>

<script>
  import lineChart from '@/views/dataChart/lineChart'
  import barChart  from '@/views/dataChart/barChart'
  import bingChart  from '@/views/dataChart/bingChart'

  import {getPayCharts} from '@/api/group'

  export default {
        name: "groupChart",
        components:{lineChart,barChart,bingChart},
        data(){
            return{
                preSevenPay:{
                    chartX: [],
                    chartY: [
                        {
                            name:'过去七天营业额',
                            data: [],
                        }
                    ]
                },
                twoYearMonthPay:{
                    chartX: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                    chartY: [
                        {
                            name:'未来七天营业额',
                            data: [],
                        }
                    ]
                },
                fiveYearPay:{
                    chartX: [],
                    chartY: []
                },
                dateNumPay: [],
                proTypePay:[]

            }
        },
      methods: {
          initData(){
              getPayCharts().then(res=>{
                  console.log(res);
                  this.preSevenPay=res.preSevenDay;
                  this.preSevenPay.chartY.forEach(val=>{
                      val.data.forEach((num,index,arr) =>{
                          arr[index]/=100;
                      })
                  });
                  this.fiveYearPay=res.fiveYear;
                  this.fiveYearPay.chartY.forEach(val=>{
                      val.data.forEach((num,index,arr) =>{
                          arr[index]/=100;
                      })
                  });
                  this.twoYearMonthPay.chartY=res.twoYearMonth;
                  this.twoYearMonthPay.chartY.forEach(val=>{
                      val.data.forEach((num,index,arr) =>{
                          arr[index]/=100;
                      })
                  });
                  this.dateNumPay=res.proDateChart;
                  this.dateNumPay.forEach(data=>{
                      data.value /= 100;
                  })
                  this.proTypePay=res.proTypeChart;
                  this.proTypePay.forEach(data=>{
                      data.value /= 100;
                  })
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
