<template>
  <span>
    <el-button @click="openContractEdit" icon="el-icon-document" size="mini" style="margin-left: 8px;" type="success">游客合同</el-button>

    <el-dialog :visible.sync="v_contract" append-to-body title="游客合同" top="10px" v-dialog-drag>
      <div style="display: flex;align-items: flex-start;justify-content: flex-start">
        <el-form :model="contractForm" label-width="150">
          <el-form-item label="合同编号" prop="numContract" required>
            <el-input v-model="contractForm.numContract"></el-input>
          </el-form-item>
          <el-form-item label="游客姓名(展示)" prop="nameTou" required>
            <el-input v-model="contractForm.nameTou"></el-input>
          </el-form-item>
          <el-form-item label="游客人数" prop="countTou" required>
            <el-input v-model="contractForm.countTou"></el-input>
          </el-form-item>

          <el-form-item label="分销商经营许可证号" prop="numDis" required>
            <el-input v-model="contractForm.numDis"></el-input>
          </el-form-item>

          <el-form-item label="出发日期" prop="dateStart" required>
            <el-date-picker format="yyyy-MM-dd" placeholder="请选择出发日期" v-model="contractForm.dateStart"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>

          <el-form-item label="返回日期" prop="dateEnd" required>
            <el-date-picker format="yyyy-MM-dd" placeholder="请选择出发日期" v-model="contractForm.dateEnd"
                                  value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>

          <el-form-item label="住宿天数" prop="countTravetDate" required>
            <el-input v-model.number="contractForm.countTravetDate"  type="number">

            </el-input>
          </el-form-item>

          <el-form-item label="游客类型结算" prop="numContract" required>
            <el-input v-model="contractForm.numContract"></el-input>
          </el-form-item>
        </el-form>
          <iframe src="https://view.officeapps.live.com/op/view.aspx?src=http://localhost:8080/tyy/print/viewContract"
                  style="min-width: 400px;height: 800px;"></iframe>
      </div>
    </el-dialog>


  </span>
</template>

<script>
  import {orderTouContractInit} from "@/api/order"

  export default {
    name: "orderTouContract",
    props: ['orderId'],
    data() {
      return {
        v_contract: false,
        contractForm: {
          //合同自增值
          id: -1,
          //附属订单ID
          idOrder: -1,
          //合同编号
          numContract: '',
          //第一个游客的姓名
          nameTou: '',
          //设定的游客数
          countTou: -1,
          //分销商经营许可证
          numDis: '',
          //出发日期
          dateStart: '',
          //返回日期
          dateEnd: '',
          //住宿总夜数
          countTravetDate: 0,
          //游客类型价格
          desPrice: [],
          //导游服务费
          priceGuide: 0,
          //总费用
          countPrice: 0,
          //支付方式
          typePay: '',
          //支付时间
          datePay: '',
          //最低成团人数
          numMinTou: 0,
          //其他约定事项
          desOtherNotice: '',
          //附件1旅游报名表订单号
          encSignOrderNum: ''


        }
      }
    },

    created() {

    },
    methods: {
      openContractEdit() {
        //得到后台初始化 数据。展示另一侧合同预览
        orderTouContractInit(this.orderId).then(res => {
          this.contractForm = res
          this.v_contract = true
        }).catch(error => {
        })
      },
    }

  }
</script>

<style scoped>

</style>
