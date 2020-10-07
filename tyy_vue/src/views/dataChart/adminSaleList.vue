<template>
  <div class="app-container">


    <el-row align="medium" type="flex">
      <el-col :span="22">
        <div class="filter-container">
          <div class="filter-item">
            <label>产品分类</label>
            <el-select :value="queryForm.proType_1" clearable v-model="queryForm.proType_1">
              <el-option :key="item.id" :label="item.proTypeName" :value="item.id"
                         v-for="item in proTypeList"></el-option>
            </el-select>
          </div>
          <div class="filter-item">
            <label>二级分类</label>
            <el-select :value="queryForm.proType_2" clearable v-model="queryForm.proType_2">
              <el-option :key="item.id" :label="item.proTypeName" :value="item.id"
                         v-for="item in proTypeList_2"></el-option>
            </el-select>
          </div>
          <div class="filter-item">
            <label>下单时间</label>
            <el-date-picker
              :picker-options="pickerOptions"
              end-placeholder="结束日期"
              range-separator="-"
              start-placeholder="开始日期"
              type="daterange"
              v-model="queryForm.createTime"
              value-format="yyyy-MM-dd">
            >
            </el-date-picker>

          </div>
          <div class="filter-item">
            <label>出团日期</label>
            <el-date-picker
              :picker-options="pickerOptions"
              end-placeholder="结束日期"
              range-separator="-"
              start-placeholder="开始日期"
              type="daterange"
              v-model="queryForm.createTime"
              value-format="yyyy-MM-dd">
              >
            </el-date-picker>

          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <el-button @click="getList" icon="el-icon-search" style="width: 180px" type="primary">查询</el-button>
      </el-col>
    </el-row>


    <el-table
      :data="list"
      autocapitalize="words"
      border
      highlight-current-row
      stripe
      style="margin-top: 15px;"
      v-loading="onLoading"
    >
      <el-table-column align="center" label="排名" min-width="20" sortable prop="sortNum" >
        <template slot-scope="scope">
          {{ scope.row.sortNum}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="业务员名字" min-width="20" prop="adminName">
        <template slot-scope="scope">
          {{ scope.row.adminName}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="累计销售额（元）" min-width="10" prop="saleSum">
        <template slot-scope="scope">
          <price-show :price="scope.row.saleSum"></price-show>
        </template>
      </el-table-column>

      <el-table-column align="center" label="收客人数（人）" min-width="15" sortable prop="touNum">
        <template slot-scope="scope">
          {{scope.row.touNum}}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page.sync="pageNum"
      :page-size="pageSize"
      :total="list.length"
      @current-change="getList"
      background
      layout="prev, pager, next"
      style="margin-top: 15px;"/>
  </div>
</template>

<script>

    //批量结算界面。显示 已审核的 未结算的 属于特定分销商的 所有订单。复用 getOrders接口 使用前端分页 不筛选
    import {getAdminSales} from "@/api/order";
    import priceShow from '@/views/com/priceShow'
    import {getProTye} from "@/api/production"



    export default {
        name: "adminSaleList",
        data() {
            return {
                //分销商账目页面传过来的disId 复用getOrders接口得到 页面
                disName: '',
                proTypeList: [],
                list: [],
                onLoading: true,
                //分销商列表。只用来set出省份和城市
                disList: [],
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },

                queryForm: {
                    createTime: [],
                    travelDate: [],
                    proType_1: '',
                    proType_2: '',
                },

                pageNum: 1,
                pageSize: 10
            }
        },
        components:{priceShow},
        computed: {
            proTypeList_2() {
                if (this.queryForm.proType_1) {
                    return this.proTypeList.find(item => (item.id === this.queryForm.proType_1)).children
                }
                return []
            }
        },
        created() {
            this.getList();
            this.getProTypes();
        },
        methods: {
            getList() {
                getAdminSales(this.queryForm).then(res => {
                    this.onLoading = false
                    this.list = res
                }).catch(error => {
                })
            },
            getProTypes(){
                getProTye().then(res => {
                    this.proTypeList = res
                }).catch(error => {
                })
            }
        }


    }
</script>

<style scoped>

</style>
