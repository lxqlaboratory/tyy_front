<template>
  <div class="dashboard-container">

    <el-row :gutter="15">
      <!--        <div style="display: flex;align-items: center;flex-direction: column">-->
      <!--          <div class="pane" style="background-color: #66CDAA">-->
      <!--            <div class="pane-header">-->
      <!--              <span style="font-weight: bold">今日出发</span>-->
      <!--              <span>订单10笔</span>-->
      <!--            </div>-->
      <!--            <div style="text-align: center">100人</div>-->
      <!--          </div>-->

      <!--          <div class="pane" style="background-color: #66CDAA;">-->
      <!--            <div class="pane-header">-->
      <!--              <span style="font-weight: bold">明日出发</span>-->
      <!--              <span>订单10笔</span>-->
      <!--            </div>-->
      <!--            <div style="text-align: center">100人</div>-->
      <!--          </div>-->

      <!--          <div class="pane" style="background-color: #66CDAA;">-->
      <!--            <div class="pane-header">-->
      <!--              <span style="font-weight: bold">今日出发</span>-->
      <!--              <span>订单10笔</span>-->
      <!--            </div>-->
      <!--            <div style="text-align: center;flex-grow: 1;margin: 0 auto">100人</div>-->
      <!--          </div>-->


      <!--        </div>-->


      <el-col :span="24">
        <panel-group :pgdata="indexData"></panel-group>

      </el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col :span="6">
        <!--        <el-card>-->
        <!--          <div class="card-header" slot="header">-->
        <!--            <div style="font-weight: bold">毛利</div>-->
        <!--            <div class="right-cor">单位：{{}}元</div>-->
        <!--          </div>-->
        <!--        </el-card>-->

        <el-card>
          <div class="item-infoList">
            <div>总收客人数</div>
            <div>{{indexData.touCount}}人</div>
          </div>

          <div class="item-infoList">
            <div>产品总数</div>
            <div>{{indexData.proCount}}个</div>
          </div>

          <div class="item-infoList">
            <div>分销商</div>
            <div>{{indexData.disCount}}家</div>
          </div>
          <div class="item-infoList">
            <div>订单总数</div>
            <div>{{indexData.orderCount}}个</div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="18">
        <el-card>
          <div class="card-header" slot="header">
            <div style="font-weight: bold">未处理订单</div>
            <div class="right-cor">共{{indexData.orderList.length}}笔未审核</div>
          </div>
          <el-table :data="indexData.orderList">
            <el-table-column label="旅行社" prop="disName"></el-table-column>
            <el-table-column label="总金额" prop="payCharge"></el-table-column>
            <el-table-column label="产品名" prop="proName"></el-table-column>
            <el-table-column label="游客数" prop="touNum"></el-table-column>
            <el-table-column label="出发日期" prop="travelDate"></el-table-column>
          </el-table>
        </el-card>

        <el-card>
          <div class="card-header" slot="header">
            <div style="font-weight: bold">未来三天成团</div>
            <div class="right-cor">
              共{{indexData.adtGroupList.length+indexData.nowGroupList.length+indexData.tomGroupList.length}}个团待发
            </div>
          </div>
          <el-tabs>
            <el-tab-pane label="今天">
              <el-table :data="indexData.nowGroupList">
                <el-table-column label="团队名" prop="groupName"></el-table-column>
                <el-table-column label="游客数" prop="touNum"></el-table-column>
                <el-table-column label="订单数" prop="orderCount"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="明天">
              <el-table :data="indexData.tomGroupList">
                <el-table-column label="团队名" prop="groupName"></el-table-column>
                <el-table-column label="游客数" prop="touNum"></el-table-column>
                <el-table-column label="订单数" prop="orderCount"></el-table-column>
              </el-table>

            </el-tab-pane>
            <el-tab-pane label="后天">
              <el-table :data="indexData.adtGroupList">
                <el-table-column label="团队名" prop="groupName"></el-table-column>
                <el-table-column label="游客数" prop="touNum"></el-table-column>
                <el-table-column label="订单数" prop="orderCount"></el-table-column>
              </el-table>

            </el-tab-pane>

          </el-tabs>

        </el-card>

      </el-col>
    </el-row>


  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import PanelGroup from "@/views/dashboard/PanelGroup";
    import {getIndexData} from "@/api/index";

    export default {
        name: 'Dashboard',

        data() {
            return {
                indexData: {
                    adtGroupList: [],
                    disCount: 0,
                    errPaySum: 0,
                    groupSum: 0,
                    inPaySum: 0,
                    nowGroupList: [],
                    orderCount: 0,
                    orderList: [],
                    outPaySum: 0,
                    proCount: 0,
                    tomGroupList: [],
                    touCount: 0
                }

            }
        },

        computed: {
            ...mapGetters([
                'name'
            ])
        },


        // created() {
        //     getIndexData().then(res => {
        //         this.indexData = res
        //         this.indexData.orderList.forEach(order=>{
        //             order.payCharge/=100;
        //         })
        //     }).catch(error => {
        //     })
        // },
        components: {
            PanelGroup
        }
    }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }


  }

  .card-header {
    height: 100%;
    padding-left: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-left: 8px solid #66CDAA;
  }


  .pane-header {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /deep/ .el-card__header {
    padding: 10px 10px !important;
  }

  .right-cor {
    background-color: #66CDAA;
    padding: 8px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
  }

  .item-infoList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 2px solid lightgrey;
    margin: 18px 0;
  }

  .item-infoList div:first-child {
    font-weight: bold;
    color: black;
    font-size: 18px;
  }

  .item-infoList div:nth-child(2) {
    color: #66CDAA;
    font-weight: bold;
  }

  .pane {
    display: flex;
    flex-direction: column;

    padding: 10px;
    flex-grow: 1;
    margin: 0 15px;
    font-size: 16px;
    color: white;
  }

</style>
