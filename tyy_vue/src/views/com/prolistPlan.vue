<template>
  <div  style="position: relative;">
    <el-dialog :visible.sync="v_showDialog" top="0" v-dialog-drag>
      <el-tabs>
        <el-tab-pane label="计划列表">
          <div>
            <el-table
              :data="list"
              border
              fit
              highlight-current-row
              stripe
            >
              <el-table-column align="center" label="计划编号" min-width="8">
                <template slot-scope="scope">
                  {{scope.row.planNum}}
                </template>
              </el-table-column>


              <el-table-column align="center" label="所属产品" min-width="8">
                <template slot-scope="scope">
                  <el-button @click="toProDuct(scope.row.proId)" type="text"> {{scope.row.proName}}</el-button>

                </template>
              </el-table-column>

              <el-table-column align="center" label="出团时间" min-width="6">
                <template slot-scope="scope">
                  {{scope.row.travelDate.substr(0,10)}}
                </template>
              </el-table-column>

              <el-table-column align="center" label="计划人数" min-width="6">
                <template slot-scope="scope">
                  {{scope.row.numTourist}}
                  <span style="color: orangered"> / {{scope.row.numLimit}}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="已确认订单数" min-width="4">
                <template slot-scope="scope">
                  <span>  {{scope.row.surOrderNum}}</span>
                </template>
              </el-table-column>


              <el-table-column align="center" label="未确认订单数" min-width="4">
                <template slot-scope="scope">
                  <span style="color: orangered">  {{scope.row.noOrderNum}}</span>
                </template>
              </el-table-column>


              <el-table-column align="center" label="销售状态" min-width="8">
                <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.saleState===1">正常销售</el-tag>
                  <el-tag type="danger" v-else>暂停销售</el-tag>
                </template>
              </el-table-column>


            </el-table>
            <el-pagination
              :current-page.sync="queryForm.pageNum"
              :page-size="5"
              :total="total"
              @current-change="getList"
              background
              layout="prev, pager, next"
              style="margin-top: 15px;"/>
          </div>
        </el-tab-pane>
        <el-tab-pane  label="计划日程">
          <el-calendar>
            <template
              slot="dateCell"
              slot-scope="{date, data}">
              <div :class="getItem(date) ? 'is-selected' : ''">
                {{ data.day.split('-').slice(1).join('-') }}
                <div class="tcolor" v-if="getItem(date)">
                  收客：
                  {{getItem(date).numTourist}}
                  <span> / {{getItem(date).numLimit}}</span>
                </div>
                <div class="tcolor" v-if="getItem(date)">
                  订单：
                  {{getItem(date).surOrderNum}}
                  <span style="color: orangered"> : {{getItem(date).noOrderNum}}</span>
                </div>
              </div>
            </template>
          </el-calendar>
        </el-tab-pane>

      </el-tabs>
    </el-dialog>


    <el-button  @click="getList" slot="reference">全部计划</el-button>

  </div>
</template>

<script>
  import {getPlans} from '@/api/plan'
  import {parseTime} from "@/utils/index"

  export default {
    name: 'prolistPlan',
    data() {
      return {


        total: 0,
        list: [],
        pageNum: 1,
        queryForm: {
          proNum: '',
          pageNum: 1,
          pageSorted: 'desc',
          pageSize: 5
        },
        v_showDialog: false

      }
    },
    props: {
      proNum: ''
    },
    methods: {
      getList() {

        this.v_showDialog = false
        this.queryForm.proNum = this.proNum
        getPlans(this.queryForm).then(res => {
          this.list = res.list
          this.total = res.pagination.total
          this.v_showDialog = true
        }).catch(error => {

        })
      },
      getItem(date) {
        let datestr = parseTime(date).substr(0, 10)
        if (this.list && this.list.length > 0) {
          return this.list.find(item => (item.travelDate.substr(0, 10) === datestr))
        }

      }
    }
  }
</script>

<style >

  .is-selected {
    color: #1989FA;
  }

</style>
