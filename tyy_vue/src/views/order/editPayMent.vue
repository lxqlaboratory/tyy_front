<template>
  <div >
    <el-button @click="openEdit" type="primary">编辑账单</el-button>
    <el-dialog v-dialog-drag  :visible.sync="v_editPayMent" title="编辑账单"  append-to-body @close="refreshB">
      <el-form :model="moneyEditForm"  ref="moneyEditForm" style="width:60vw;padding-left: 15px;box-sizing: border-box">
        <div style="display: flex;align-items: flex-start;justify-content: flex-start;width: 100%;">
          <div style="width: 40%;">
            <el-form-item label="收款方式" prop="payType" required>
<!--              <el-select :value="moneyEditForm.payTypeId" placeholder="请选择收款方式" style="width: 200px"-->
<!--                         v-model="moneyEditForm.payTypeId">-->
<!--                <el-option :key="item.code" :label="item.description" :value="item.code"-->
<!--                           v-for="item in payTypeList"></el-option>-->
<!--              </el-select>-->
              <channel-select :pay-type.sync="moneyEditForm.payTypeId"></channel-select>
            </el-form-item>

            <el-form-item label="收款金额" prop="payment" required>
<!--              <el-input placeholder="请输入收款金额" style="width: 200px" type="number"-->
<!--                        v-model.number="moneyEditForm.payment">-->
<!--                <template slot="append">元</template>-->
<!--              </el-input>-->
              <price-input placeholder="请输入收款金额" style="width: 200px" v-model="moneyEditForm.payment"></price-input>
            </el-form-item>
            <el-form-item label="收款日期" prop="payTime" required>
              <el-date-picker :picker-options="pickerOptions" align="right" format="yyyy-MM-dd"
                              placeholder="请选择收款日期"
                              style="width: 200px" type="date" v-model="moneyEditForm.payTime"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="收款人" label-width="5em" prop="payee" required>
              <el-input maxlength="8" placeholder="请输入实际收款人" style="width: 200px"
                        v-model="moneyEditForm.payee"></el-input>
            </el-form-item>

            <el-form-item label="备注说明" prop="remark">
              <el-input maxlength="200" placeholder="请为账单增添备注" show-word-limit style="max-width: 75%;"
                        type="textarea" v-model="moneyEditForm.remark">
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="payImage">
              <label>入账凭证</label>
              <upload-single-image :res-type="4" style="width: 300px;"
                                   v-model="moneyEditForm.rId"></upload-single-image>
            </el-form-item>
          </div>
        </div>
        <el-form-item>
          <el-button :loading="onEidtMoney" @click="submitMoneyForm" type="primary">录入</el-button>
          <el-button @click="resetForm('moneyEditForm')">重置</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

  </div>
</template>

<script>
  import uploadSingleImage from "@/views/com/uploadSingleImage"
  import {getMoneyInfo, getPayType} from "@/api/order"
  import {editMoneyInfo} from "@/api/money"
  import priceShow from '@/views/com/priceShow'
  import priceInput from '@/views/com/priceInput'
  import channelSelect from "@/views/money/channelSelect"


  export default {
    name: "editPayMent",
    props: ['paymentid'],
    data() {
      return {
        payTypeList: [],
        onEidtMoney: false,
        v_editPayMent: false,
        moneyEditForm: {
          payTypeId: '',
          payee: '',
          payment: '',
          payTime: '',
          remark: '',
          rId:''
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }]
        }
      }
    },
    components: {uploadSingleImage,priceInput,priceShow,channelSelect},
    created() {
      getPayType().then(res => {
        this.payTypeList = res
      }).catch(error => {
      })
    },
    methods: {
      openEdit() {
        getMoneyInfo(this.paymentid).then(res => {
          this.moneyEditForm = res
          this.v_editPayMent = true
        }).catch(error => {
        })
      },
      submitMoneyForm() {
        this.onEidtMoney = true
        this.moneyEditForm.orderId = this.orderId
        editMoneyInfo(this.moneyEditForm).then(res => {
          this.$message({
            type: 'success',
            message: '修改账单成功'
          })
          this.onEidtMoney = false
          this.v_editPayMent=false
          this.resetForm('moneyEditForm')
        }).catch(error => {
          this.onEidtMoney = false
        })
      },

      resetForm(formName) {
        this.$refs[formName].resetFields()
      },

      refreshB(){
        this.$emit("refreshFather",{})
      }

    }
  }
</script>

<style scoped>

</style>
