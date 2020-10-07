<template>
  <div class="app-container">

    <el-dialog :close-on-click-modal="false" :visible.sync="v_addSzMoney" title="录入收支记录" v-dialog-drag width="60vw">
      <el-form :model="addForm" class="demo-ruleForm" label-width="100px" ref="mform">
        <el-form-item label="金额" prop="price">
          <price-input placeholder="请输入收支金额" v-model="addForm.price"></price-input>
          <span style="font-size: 12px;color: gray">正数为收入，负数为支出</span>
        </el-form-item>

        <el-form-item label="收款人" prop="fPerson">
          <el-input placeholder="请输入收款人姓名" v-model="addForm.fPerson"></el-input>
        </el-form-item>
        <el-form-item label="付款人" prop="sPerson">
          <el-input maxlength="20" placeholder="请输入付款人姓名" v-model="addForm.sPerson"></el-input>
        </el-form-item>

        <el-form-item label="收支时间" prop="payDate">
          <el-date-picker format="yyyy-MM-dd" placeholder="请选择收支时间" v-model="addForm.payDate"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>

        <el-form-item label="资金渠道" prop="payType">
<!--          <el-select placeholder="选择收付款方式" v-model="addForm.payType">-->
<!--            <el-option :key="item.code" :label="item.description" :value="item.code"-->
<!--                       v-for="item in payTypeList"></el-option>-->
<!--          </el-select>-->
          <channel-select :pay-type.sync="addForm.payType"></channel-select>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input placeholder="请输入备注信息" type="textarea" v-model="addForm.remark"></el-input>
        </el-form-item>


        <el-form-item style="width: 80%;display: flex;flex-direction: row;justify-content: flex-start;margin: 15px;">
          <el-button @click="submitForm('mform')" type="success">录入收支记录</el-button>
        </el-form-item>


      </el-form>

    </el-dialog>

    <div class="filter-container">
      <div class="filter-item">
        <label>账单编号</label>
        <el-input placeholder="检索账单编号" v-model="queryForm.payNum"></el-input>

      </div>

      <div class="filter-item">
        <label>起始日期</label>

        <el-date-picker
          :picker-options="pickerOptions"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          range-separator="-"
          start-placeholder="开始日期"
          type="daterange"
          v-model="queryForm.payDate"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>

      <div class="filter-item">
        <label>资金渠道</label>
<!--        <el-select clearable placeholder="选择收付款方式" v-model="queryForm.payQD">-->
<!--          <el-option :key="item.name" :label="item.name" :value="item.name"-->
<!--                     v-for="item in payTypeList"></el-option>-->
<!--        </el-select>-->
        <channel-select :pay-type.sync="queryForm.payQD"></channel-select>
      </div>


      <div class="filter-item">
        <label>收支类别</label>
        <el-select clearable placeholder="选择资金流向" v-model="queryForm.payType">
          <el-option :value="0" label="收入"></el-option>
          <el-option :value="1" label="支出"></el-option>
        </el-select>
      </div>
      <div class="filter-item">
        <label>付款人</label>
        <el-input placeholder="检索付款人" v-model="queryForm.payFKR"></el-input>
      </div>
      <div class="filter-item">
        <label>收款人</label>
        <el-input placeholder="检索收款人" v-model="queryForm.paySKR"></el-input>
      </div>
      <div class="filter-item">
        <el-button @click="getList" size="medium" type="primary">查询</el-button>
        <el-button @click="addSzMoney" size="medium" type="success">录入</el-button>
      </div>
    </div>

    <el-table
      :data="list"
      autocapitalize="words"
      border
      highlight-current-row
      show-summary
      style="margin-top: 15px;"
      :row-style="tableRowClassName"
      v-loading="onLoading"
      ref="mtable"
    >
      <el-table-column type="selection" width="65" align="center"></el-table-column>

      <el-table-column align="center" label="账单号" min-width="7">
        <template slot-scope="scope">
          {{scope.row.payNum}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="资金渠道" min-width="7">
        <template slot-scope="scope">

          {{scope.row.payType}}
        </template>
      </el-table-column>


      <el-table-column align="center" label="付款人" min-width="7">
        <template slot-scope="scope">
          {{scope.row.fPerson}}
        </template>
      </el-table-column>


      <el-table-column align="center" label="收款人" min-width="7">
        <template slot-scope="scope">
          {{scope.row.sPerson}}
        </template>
      </el-table-column>


      <el-table-column align="center" label="收入" min-width="7" prop="inPrice">
        <template slot-scope="scope">
          <span style="color: green"> {{scope.row.inPrice}}</span>
<!--          <price-show :price="scope.row.inPrice"></price-show>-->

        </template>
      </el-table-column>

      <el-table-column align="center" label="支出" min-width="7" prop="outPrice">
        <template slot-scope="scope">
          <span style="color: orangered"> {{scope.row.outPrice}}</span>
<!--          <price-show :price="scope.row.outPrice"></price-show>-->
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作人" min-width="7">
        <template slot-scope="scope">
          {{scope.row.userName}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间" min-width="7">
        <template slot-scope="scope">
          {{scope.row.payTime.substr(0,10)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" min-width="7">
        <template slot-scope="scope">
          {{scope.row.remark}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="7">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.payNum.substr(0,2)!=='FY'" @click="delPayment(scope.row.payNum)" size="mini"
                     type="danger">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="display: flex;align-items: center;margin-top: 15px;">
      <el-pagination
        :current-page.sync="queryForm.pageNum"
        :page-size="queryForm.pageSize"
        :total="total"
        @current-change="getList"
        background
        layout="prev, pager, next"
      />
      <div>
        <el-select :value="queryForm.pageSize" @change="getList" style="margin-left:  5px;"
                   v-model="queryForm.pageSize">
          <el-option :value="10" label="10条/页"></el-option>
          <el-option :value="20" label="20条/页"></el-option>
          <el-option :value="30" label="30条/页"></el-option>
          <el-option :value="40" label="40条/页"></el-option>
          <el-option :value="50" label="50条/页"></el-option>
        </el-select>

        <el-button style="margin-left: 15px" type="primary" icon="el-icon-document" @click="export2Excel()">导出选中条目(Excel)</el-button>
      </div>
    </div>


  </div>
</template>

<script>
  import {addPayment, delPayment, getPayments} from "@/api/money"
  import channelSelect from "@/views/money/channelSelect"
  import priceShow from '@/views/com/priceShow'
  import priceInput from '@/views/com/priceInput'
  export default {
    name: "szMoney",
    data() {
      return {
        addForm: {
          payDate: '',
          price:'',
          sPerson:'',
          fPerson:'',
          payType:'',
          remark:''
        },

        v_addSzMoney: false,
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
        },
        // payTypeList: [],
        list: [],
        total: 0,
        onLoading: true,
        queryForm: {
          payNum: '',
          payDate: '',
          payQD: '',
          paySKR: '',
          payFKR: '',
          payType: '',


          pageNum: 1,
          pageSorted: 'desc',
          pageSize: 10
        }
      }
    },
    created() {
        this.getList();
    },
      components: {channelSelect,priceInput,priceShow},
    methods: {
      export2Excel(){
        if(this.$refs.mtable.selection.length===0){
          this.$message({
            type:'error',
            message:'您未选中任何收支记录'
          })
          return
        }
        this.$message({
          type:'success',
          message:'导出'+this.$refs.mtable.selection.length+'条记录成功'
        })

        let filename=new Date().toLocaleString()+"收支记录列表导出"

        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['账单号', '资金渠道', '付款人', '收款人', '收入','支出','操作人','时间','备注']
          let templistArray=[]
          this.$refs.mtable.selection.forEach(item=>{templistArray[templistArray.length]=[item.payNum,item.payType,item.fPerson,item.sPerson,item.inPrice,item.outPrice,item.userName,item.payTime,item.remark]})
          excel.export_json_to_excel({
            header: tHeader,
            data:templistArray,
            filename,
            autoWidth: true,
            bookType:'xlsx'
          })
        })
      },



      tableRowClassName({row, rowIndex}){
        console.log(row)
        if(row.price>0)
          return {'background-color':'lightskyblue !important'};
        else
          return {'background-color':'LightSalmon','color':'white'};
      },
      delPayment(payNum) {
        this.$confirm('此操作不可撤销，是否继续', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          delPayment(payNum).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          }).catch(error => {
          })
        })
      },


      submitForm() {
        addPayment(this.addForm).then(res => {
          this.$message({type: 'success', message: '保存成功'})
          this.v_addSzMoney = false;
          this.getList()
        }).catch(error => {
        })
      },

      addSzMoney() {
        this.v_addSzMoney = true;
          this.addForm.price='';
        this.addForm.sPerson='';
        this.addForm.fPerson='';
        this.addForm.payDate='';
        this.addForm.remark='';
        // this.$nextTick(() => {
        //   this.$refs['mform'].resetFields()
        // })

      },
      getList() {
        getPayments(this.queryForm).then(res => {
          this.onLoading = false
          res.list.forEach(item => {
            if (item.price >= 0) {
              item.inPrice = item.price / 100;
              item.outPrice = 0
            } else {
              item.inPrice = 0
              item.outPrice = -item.price / 100
            }
          })
          this.list = res.list
          this.total = res.pagination.total
        }).catch(error => {

        })
      }
    }

  }
</script>

<style scoped>
  .in-price{
    color: yellow;
    background-color:lightskyblue !important;
  }
  .out-price{
    background-color: lightcoral !important;
  }
</style>
