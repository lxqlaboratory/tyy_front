<template>
  <div class="app-container">

    <div class="filter-container">
      <div class="filter-item">
        <label>分销商类型</label>
        <el-select :value="queryForm.disType" @change="getList" clearable placeholder="请选择分销商类型" style="width: 300px;"
                   v-model="queryForm.disType">
          <el-option
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
            v-for="item in disTypeList"
          ></el-option>
        </el-select>
      </div>

      <div class="filter-item">
        <label>分销商省份</label>
        <el-select :value="queryForm.disProvince" @change="getList" clearable placeholder="请选择分销商省份"
                   style="width: 300px;"
                   v-model="queryForm.disProvince">
          <el-option :key="item" :label="item" :value="item" v-for="item of provinceList"></el-option>
        </el-select>
      </div>

      <div class="filter-item">
        <label>分销商地区</label>
        <el-select :value="queryForm.disCity" @change="getList" clearable placeholder="请选择分销商地区" style="width: 300px;"
                   v-model="queryForm.disCity">
          <el-option :key="item" :label="item" :value="item" v-for="item of cityList"></el-option>
        </el-select>
      </div>

      <div class="filter-item">
        <label>分销商名称</label>
        <el-input maxlength="20" placeholder="请检索分销商名称" style="margin-left: 15px; width: 300px"
                  v-model="queryForm.disName"></el-input>
      </div>

      <div class="filter-item">
        <el-button @click="getList" icon="el-icon-search" type="primary">查询</el-button>
      </div>


    </div>


    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      stripe
      style="margin-top: 15px;"
      v-loading="onLoading"
    >
      <el-table-column align="center" label="单位名称" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.disName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单总数" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.orderSum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="总游客数" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.touNum }}人
        </template>
      </el-table-column>
      <el-table-column align="center" label="欠费金额" min-width="45">
        <template slot-scope="scope">
          <price-show :price="scope.row.arrears"></price-show>
        </template>
      </el-table-column>
      <el-table-column align="center" label="应支付" min-width="45">
        <template slot-scope="scope">
          <price-show :price="scope.row.chargeNum"></price-show>
        </template>
      </el-table-column>
      <el-table-column align="center" label="已支付" min-width="45">
        <template slot-scope="scope">
          <price-show :price="scope.row.paid"></price-show>

        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button @click="toReF" type="warning">欠费订单</el-button>
          <el-button @click="toJsList(scope.row.disName)" type="primary">流水记录</el-button>
          <el-button v-if="$_has('PAYUPDATE')" @click="topL(scope.row.id)" type="success">批量结算</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page.sync="queryForm.pageNum"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="getList"
      background
      layout="prev, pager, next"
      style="margin-top: 15px;"/>

  </div>
</template>

<script>
    import {getDisList, getDisType} from '@/api/distribute'
    import {getDisMoneyList} from "@/api/money";
    import priceShow from '@/views/com/priceShow'


    export default {
        name: "disMoney",
        data() {
            return {

                //对disProvince和disCity进行set 得到省份和城市列表
                disList: [],
                disTypeList: [],

                onLoading: true,
                list: [],
                total: 0,


                queryForm: {
                    disName: '',
                    disType: '',

                    disProvince: '',
                    disCity: '',

                    pageNum: 1,
                    pageSorted: 'desc',
                    pageSize: 10
                }
            }
        },
        created() {

            if (this.$route.query.disName) {
                this.queryForm.disName = this.$route.query.disName
            }
            //得到分销商类型表
            this.getTypeList()
            //得到分销商总表 初始化筛选框
            this.getDisList()


            //得到表数据
            this.getList()
        },
        components:{priceShow},
        computed: {
            provinceList() {
                return Array.from(new Set(this.disList.map(item => item.disProvince)));
            },
            cityList() {
                return Array.from(new Set(this.disList.map(item => item.disCity)));
            }
        },
        methods: {
            //结算记录
            toJsList: function (disName) {
                this.$router.push({path: 'disMoneyList', query: {disName}})
            },
            toReF: function (id) {
                //跳转到分销商流水记录。

            },

            topL: function (id) {
                this.$router.push({path: 'disMoneyPlcz', query: {id}})
            },


            getTypeList: function () {
                getDisType().then(res => {
                    this.disTypeList = res
                }).catch(error => {
                })
            },
            getDisList() {
                getDisList().then(res => {
                    this.disList = res
                    console.log(res)
                }).catch(error => {
                })
            },
            //得到表单数据
            getList() {
                this.onLoading = true
                getDisMoneyList(this.queryForm).then(res => {
                    console.log(res)
                    this.list = res.list
                    this.total = res.pagination.total
                    this.onLoading = false
                }).catch(error => {
                    this.onLoading = false
                })
            }
        }
    }
</script>

<style scoped>

</style>
