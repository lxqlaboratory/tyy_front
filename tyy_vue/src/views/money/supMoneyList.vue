<template>
  <div class="app-container">
    <el-dialog v-dialog-drag   :visible.sync="state.v_supMoneyInfo">
      <!--团队明细标题-->
      <div class="o-title">
        {{}}
      </div>

      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div style="display: flex;align-items: center;flex-wrap: wrap;justify-content: space-around">
        <div class="item-info">
          <label>项目类型</label>
        </div>

      </div>


    </el-dialog>

    <div class="filter-container">
      <div class="filter-item">
        <label>账单时间</label>
        <el-date-picker @change="getList" end-placeholder="结束日期" format="yyyy-MM-dd" range-separator="至"
                        start-placeholder="开始日期" type="daterange"
                        v-model="queryForm.supMoneyDate"
                        value-format="yyyy-MM-dd"></el-date-picker>
      </div>

      <div class="filter-item">
        <label>流水分类</label>
        <el-select :value="queryForm.supMoneyType" @change="getList" clearable v-model="queryForm.supMoneyType">
          <el-option :value="0">消费</el-option>
          <el-option :value="1">充值</el-option>
        </el-select>

      </div>

      <div class="filter-item">
        <label>供应商名</label>
        <el-input v-model="queryForm.supName"></el-input>
      </div>


      <div class="filter-item">
        <label>流水编号</label>
        <el-input v-model="queryForm.supMoneyNum"></el-input>
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



      <el-table-column align="center" label="流水单号" min-width="50">
        <template slot-scope="scope">
          {{ scope.row.recNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="供应商" min-width="50">
        <template slot-scope="scope">
          {{ scope.row.supName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="金额" min-width="50">
        <template slot-scope="scope">
          <price-show style="color: orangered" :price="scope.row.payment"></price-show>
        </template>
      </el-table-column>

      <el-table-column align="center" label="类型" min-width="50">
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.recType===0&&scope.row.payment<=0">消费</el-tag>

          <el-tag type="primary" v-if="scope.row.recType===0&&scope.row.payment>0">取消审批补回</el-tag>

          <el-tag type="success" v-if="scope.row.recType===1">充值</el-tag>

        </template>
      </el-table-column>

      <el-table-column align="center" label="日期" min-width="50">
        <template slot-scope="scope">
          {{ scope.row.createTime.substr(0,10) }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="备注" min-width="50">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作人" min-width="50">
        <template slot-scope="scope">
          {{ scope.row.userName }}
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
    import {getRecodes} from "@/api/money";
    import priceShow from '@/views/com/priceShow'

    export default {
        name: "supMoneyList",
        data() {
            return {
                onLoading: false,
                list: [],
                total: 0,
                state: {
                    v_supMoneyInfo: false
                },

                queryForm: {
                    supMoneyDate: [],
                    //xf or cz or 空值||null
                    supMoneyType: '',
                    supName: '',
                    supMoneyNum: '',

                    pageNum: 1,
                    pageSorted: 'desc',
                    pageSize: 10
                }
            }
        },
        created() {
            this.queryForm.supName = this.$route.query.supName
            this.getList()
        },
        components:{priceShow},
        methods: {
            getList() {
                this.onLoading = true
                getRecodes(this.queryForm).then(res => {
                    console.log(res)
                    this.onLoading = false
                    this.list = res.list
                    this.total = res.pagination.total
                }).catch(error => {
                    this.onLoading = false
                })
            }
        }
    }
</script>

<style scoped>
  .o-title {
    font-weight: bold;
    font-size: 19px;
    background-color: whitesmoke;
    border-radius: 3px;
    color: #333;
    margin: 10px 0 25px 0;
    padding: 8px 15px;
  }

  .item-info {
    width: 40%;
    display: flex;
    align-items: center;
  }

  .item-info label {
    min-width: 100px;
  }


</style>
