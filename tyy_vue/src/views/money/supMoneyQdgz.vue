<template>
  <div class="app-container">
    <el-dialog :visible.sync="v_editSupMony" title="修改签单挂账记录">
      <el-form :model="editForm" label-width="100px" ref="editForm">
        <div style="display: flex;align-items: flex-start;justify-content: flex-start;width: 80vw;">
          <div style="margin-right: 35px;">
            <el-form-item label="项目类型" prop="pjType">
              <el-select :value="editForm.payType" placeholder="请选择项目类型" v-model="editForm.pjType">
                <el-option :key="item.code" :label="item.description" :value="item.code"
                           v-for="item in initData.chargeTypeList"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目名" prop="pjName">
              <el-input placeholder="请输入项目名" v-model="editForm.pjName"></el-input>
            </el-form-item>

            <el-form-item label="数量" prop="pjNum">
              <el-input placeholder="请输入项目数量" type="number" v-model.number="editForm.pjNum"></el-input>
            </el-form-item>

            <el-form-item label="支付方式" prop="payType">
<!--              <el-select :value="editForm.payType" placeholder="请选择支付方式" v-model="editForm.payType">-->
<!--                <el-option :key="item.code" :label="item.description" :value="item.code"-->
<!--                           v-for="item in initData.payTypeList"></el-option>-->
<!--              </el-select>-->
              <channel-select :pay-type.sync="editForm.payType"></channel-select>
            </el-form-item>

            <el-form-item label="支出金额" prop="pjAmount">
              <price-input placeholder="请输入项目总金额" v-model="editForm.pjAmount"></price-input>
            </el-form-item>

            <el-form-item label="账单时间" prop="payDate">
              <el-date-picker format="yyyy-MM-dd" placeholder="请选择账单支出时间" v-model="editForm.payDate"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>

            <el-form-item label="说明">
              <el-input placeholder="请输入备注说明" style="max-width: 400px;" type="textarea"
                        v-model="editForm.remark"></el-input>
            </el-form-item>
            <div style="width: 800px">
              <el-form-item label="报账凭证">
                <upload-images v-model="editForm.imgRids" :value="editForm.imgRids" :res-type="4"></upload-images>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button @click="saveEidt" type="primary">保存修改</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </el-dialog>
    <div class="filter-container">
      <div class="filter-item">
        <label>交易日期</label>
        <el-date-picker
          :picker-options="pickerOptions"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          range-separator="-"
          start-placeholder="开始日期"
          type="daterange"
          v-model="queryForm.dateTrate"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>

      <div class="filter-item">
        <label>团队编号</label>
        <el-input v-model="queryForm.groupNum"></el-input>
      </div>

      <div class="filter-item">
        <label>团队名</label>
        <el-input v-model="queryForm.groupName"></el-input>
      </div>


      <div class="filter-item">
        <label>供应商类型</label>
        <el-input v-model="queryForm.supType"></el-input>
      </div>


      <div class="filter-item">
        <label>供应商名</label>
        <el-input v-model="queryForm.supName"></el-input>
      </div>

      <div class="filter-item">
        <label>项目类型</label>
        <el-select :value="queryForm.moneyType" placeholder="请选择项目类型" v-model="queryForm.moneyType" clearable>
          <el-option :key="item.code" :label="item.description" :value="item.code"
                     v-for="item in initData.chargeTypeList"></el-option>
        </el-select>
      </div>

      <div class="filter-item">
        <label>报账项目名</label>
        <el-input v-model="queryForm.moneyName"></el-input>
      </div>

      <div class="filter-item">
        <el-button @click="getList" icon="el-icon-search" type="primary">查询</el-button>
      </div>

    </div>
    <el-table :data="data.list"
              border
              fit
              highlight-current-row
              stripe
              style="margin-top: 15px;"
              v-loading="state.onLoading">

      <el-table-column align="center" label="报账凭证">
        <template slot-scope="scope">
          <el-popover placement="right" v-if="scope.row.payImage&&scope.row.payImage.length>0">


            <div slot="reference">
              <el-image :src="scope.row.payImage[0]" style="width: 100px;height: 50px;"
                        v-if="scope.row.payImage.length===1"></el-image>
              <el-button type="text" v-else>共{{scope.row.payImage.length}}张</el-button>
            </div>

            <div style="max-width: 85vw;max-height: 75vh">
              <el-image :src="item" style="width: 350px;height: 240px;margin: 25px;"
                        v-for="item in scope.row.payImage"></el-image>
            </div>


          </el-popover>
          <span style="color:gray" v-else>未上传</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="流水单号" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.payNum }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="项目" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.pjName }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="支付方式" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.payType }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="金额" min-width="45">
        <template slot-scope="scope">
          <price-show :price="scope.row.pjAmount"></price-show>
        </template>
      </el-table-column>


      <el-table-column align="center" label="数量" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.pjNum }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="供应商" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.supName }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="录入日期" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.createTime.substr(0,10) }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="审批状态" min-width="45">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state===1">已审批</el-tag>
          <el-tag type="info" v-else>未审批</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="录入人" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.adminName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.remarak }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="100">
        <template slot-scope="scope">

          <el-button @click="checkSupState(scope.row,1)" type="success" v-if="scope.row.state===0 && $_has('PAYUPDATE')">审批</el-button>
          <el-button @click="eidt(scope.row,1)" type="primary" v-if="scope.row.state===0 && $_has('PAYUPDATE')">审批</el-button>
          <el-button @click="checkSupState(scope.row,0)" type="warning" v-if="scope.row.state===1 && $_has('PAYUPDATE')">取消审批</el-button>


          <el-button @click="delSupPayment(scope.row.id)" type="danger"
                     v-if="scope.row.state===0 && $_has('PAYUPDATE')">删除
          </el-button>
          <el-button v-if="$_has('PAYUPDATE')" @click="editSupPayment(scope.row)" type="primary">修改</el-button>
        </template>
      </el-table-column>

    </el-table>


    <el-pagination
      :current-page.sync="queryForm.pageNum"
      :page-size="queryForm.pageSize"
      :total="data.total"
      @current-change="getList"
      background
      layout="prev, pager, next"
      style="margin-top: 15px;"/>

  </div>
</template>

<script>
  import {editSupPayment,checkSupState, delSupPayment, getSupPayList} from '@/api/money'
  import {getEnums} from "@/api/baseApi"
  import UploadImages from "@/views/com/uploadImages"
  import channelSelect from "@/views/money/channelSelect"
  import priceShow from '@/views/com/priceShow'
  import priceInput from '@/views/com/priceInput'

  export default {
    name: "supMoneyQdgz",
    data() {
      return {
        data: {
          list: [],
          total: 0
        },

        state: {
          onLoading: false
        },
          v_editSupMony:false,
        editForm:{
            id:'',
            supId: '',
            bzType: 'jd',
            pjType: '',
            pjName: '',
            pjNum: '',
            payType: '',
            payDate: '',
            pjAmount: '',
            remark: '',
            payImage: '',
            imgRids:''

          },
          initData: {
              // payTypeList: [],
              chargeTypeList: []
          },
        queryForm: {
          dateTrate: [],
          groupNum: '',
          groupName: '',
          supName: '',
          supType: '',
          moneyName: '',
          moneyType: '',
          moneyState: '',
          moneyTaState: '',

          pageNum: 1,
          pageSorted: 'desc',
          pageSize: 10
        },

        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    created() {
      this.queryForm.supName = this.$route.query.supName;
      this.getList();
        this.init();
    },
      components: {
          UploadImages,channelSelect,priceShow,priceInput
      },
    methods: {
        init() {
            //找到项目类型
            getEnums('CHARGETYPE').then(res => {
                this.initData.chargeTypeList = res
            }).catch(error => {
            })
            //获取支付类型
            // getEnums('PAYTYPE').then(res => {
            //     this.initData.payTypeList = res
            // }).catch(error => {
            // })

        },
      delSupPayment(id) {
        this.$confirm('此操作不可撤销', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          delSupPayment(id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          }).catch(error => {
            this.getList()
          })
        })
      },

      checkSupState(item, state) {
        checkSupState(item.id, state).then(res => {
          this.$message({type: "success", message: "改变审批状态成功"})
          item.state = state
        }).catch(error => {
        })
      },
        editSupPayment(payForm){
            this.editForm = JSON.parse(JSON.stringify(payForm))
            this.v_editSupMony = true
        },
        saveEidt(){
            this.editForm.payImage=this.editForm.imgRids;
            editSupPayment(this.editForm).then(res=>{
                this.$message({
                    type:'success',
                    message:'修改成功！！'
                });
                this.v_editSupMony=false;
                this.getList();
            })
        },
      getList() {
        this.state.onLoading = true
        getSupPayList(this.queryForm).then(res => {
          this.state.onLoading = false
          this.data.list = res.list
          this.data.total = res.pagination.total
        }).catch(error => {
          this.state.onLoading = true
        })
      }
    }
  }
</script>

<style scoped>

</style>
