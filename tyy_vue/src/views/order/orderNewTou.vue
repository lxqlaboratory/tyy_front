<template>
  <div style="min-height: 130px;">

    <el-dialog :visible.sync="v_editTou" append-to-body title="编辑游客" v-dialog-drag width="1500px">
      <el-row :gutter="10" style="margin: 15px 0;">
        <el-col :span="2">
          <el-select :value="editForm.touType" placeholder="选择类型" v-model="editForm.touType">
            <el-option :key="typeItem.id" :label="typeItem.name" :value="typeItem.name"
                       v-for="typeItem in planChargeList"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-input placeholder="游客姓名" v-model="editForm.touName"></el-input>
        </el-col>
        <el-col :span="2">
          <el-select :value="editForm.touSex" placeholder="选择性别" v-model="editForm.touSex">
            <el-option :value="1" label="男"></el-option>
            <el-option :value="0" label="女"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-input placeholder="年龄" v-model="editForm.age"></el-input>
        </el-col>
        <el-col :span="2">
          <el-select :value="editForm.cerType" placeholder="证件类型" v-model="editForm.cerType">
            <el-option :key="cerItem.code" :label="cerItem.description" :value="cerItem.code"
                       v-for="cerItem in this.cerTypeList"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="证件号码" v-model="editForm.cerNum"></el-input>
        </el-col>

        <el-col :span="3">
          <el-input placeholder="联系电话" v-model="editForm.phone"></el-input>
        </el-col>
        <el-col :span="5">
          <el-input placeholder="游客备注" v-model="editForm.remark"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button @click="saveEidt" type="primary">保存修改</el-button>
        </el-col>
      </el-row>


    </el-dialog>


    <div style="display: flex;align-items: center;justify-content: flex-start;width: 90%">
      <div style="display: flex;align-items: center">
        <el-input placeholder="请使用 空格 或者 ，或者 | 等符号分割数据类别，使用回车分割游客" style="width: 40vw" type="textarea"
                  v-model="textTourist"></el-input>
        <el-button @click="parserTourist" style="margin-left: 15px;" type="success">解析导入</el-button>
      </div>
    </div>
    <!--<el-row :gutter="10" style="margin: 15px 0;">-->
      <!--<el-col :span="2">-->
        <!--<el-select :value="addTouItemForm.touType" placeholder="选择类型" v-model="addTouItemForm.touType">-->
          <!--<el-option :key="typeItem.id" :label="typeItem.name" :value="typeItem.name"-->
                     <!--v-for="typeItem in planChargeList"></el-option>-->
        <!--</el-select>-->
      <!--</el-col>-->
      <!--<el-col :span="2">-->
        <!--<el-input placeholder="游客姓名" v-model="addTouItemForm.touName"></el-input>-->
      <!--</el-col>-->
      <!--<el-col :span="2">-->
        <!--<el-select :value="addTouItemForm.touSex" placeholder="选择性别" v-model="addTouItemForm.touSex">-->
          <!--<el-option :value="1" label="男"></el-option>-->
          <!--<el-option :value="0" label="女"></el-option>-->
        <!--</el-select>-->
      <!--</el-col>-->
      <!--<el-col :span="2">-->
        <!--<el-input placeholder="年龄" v-model="addTouItemForm.age"></el-input>-->
      <!--</el-col>-->
      <!--<el-col :span="2">-->
        <!--<el-select :value="addTouItemForm.cerType" placeholder="证件类型" v-model="addTouItemForm.cerType">-->
          <!--<el-option :key="cerItem.code" :label="cerItem.description" :value="cerItem.code"-->
                     <!--v-for="cerItem in cerTypeList"></el-option>-->
        <!--</el-select>-->
      <!--</el-col>-->
      <!--<el-col :span="4">-->
        <!--<el-input placeholder="证件号码" v-model="addTouItemForm.cerNum"></el-input>-->
      <!--</el-col>-->

      <!--<el-col :span="3">-->
        <!--<el-input placeholder="联系电话" v-model="addTouItemForm.phone"></el-input>-->
      <!--</el-col>-->
      <!--<el-col :span="5">-->
        <!--<el-input placeholder="游客备注" v-model="addTouItemForm.remark"></el-input>-->
      <!--</el-col>-->
      <!--<el-col :span="2">-->
        <!--<el-button :disabled="onAddTouItem" @click="addTouItem" type="success">手工录入</el-button>-->
      <!--</el-col>-->
    <!--</el-row>-->


    <el-table :data="touristList.slice((query.currentPage - 1) * query.pageSize, query.currentPage * query.pageSize)" border
              ref="mtable"
              stripe>
      <el-table-column type="selection"></el-table-column>

      <el-table-column align="center" label="游客姓名">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column align="center" label="游客性别">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.sex===1">男</el-tag>
          <el-tag type="warning" v-if="scope.row.sex===0">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="游客年龄">
        <template slot-scope="scope">{{scope.row.age}}</template>
      </el-table-column>
      <el-table-column align="center" label="证件类型">
        <template slot-scope="scope">{{scope.row.cerType}}</template>
      </el-table-column>
      <el-table-column align="center" label="证件号码">
        <template slot-scope="scope">{{scope.row.cerNum}}</template>
      </el-table-column>
      <el-table-column align="center" label="联系电话">
        <template slot-scope="scope">{{scope.row.phone}}</template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">{{scope.row.remark}}</template>
      </el-table-column>
      <!--<el-table-column align="center" label="操作" width="350px">-->
        <!--<template slot-scope="scope">-->
          <!--<div>-->
            <!--<el-button @click="editTou(scope.row)" type="primary">编辑</el-button>-->
            <!--<el-button @click="delTou(scope.row.id)" type="danger">删除</el-button>-->
            <!--<el-button @click="editIsBlack(scope.row.id,1)" type="warning" v-if="scope.row.isBlack===0">拉黑</el-button>-->
            <!--<el-button @click="editIsBlack(scope.row.id,0)" type="success" v-if="scope.row.isBlack===1">恢复</el-button>-->
          <!--</div>-->

        <!--</template>-->
      <!--</el-table-column>-->

    </el-table>

    <el-row :gutter="10" style="margin: 15px;">
      <el-col :span="1">合计--:</el-col>
      <el-col :span="5">
        <span style="margin-right: 10px;" v-for="item in num_planChan">
          <label>{{item.name}}：</label>
          <span>{{item.num}}</span>人
        </span>
      </el-col>
      <el-col :span="6">
        <span style="margin-right: 10px;">
          <label>男：</label>
          <span>{{num_men}}</span>人
        </span>
        <span>
          <label>女：</label>
          <span>{{num_women}}</span>人
        </span>
      </el-col>
    </el-row>

    <div style="display: flex;align-items: center;justify-content: flex-start">
      <el-pagination
        :current-page.sync="query.currentPage"
        :page-size="query.pageSize"
        :total="touristList.length"
        background
        v-loading="onLoading"
        layout="prev, pager, next"
        style="margin-top: 15px;"/>

      <el-select style="margin-left:  5px;" v-model="query.pageSize">
        <el-option :value="10" label="10条/页"></el-option>
        <el-option :value="30" label="30条/页"></el-option>
        <el-option :value="50" label="50条/页"></el-option>
      </el-select>


      <el-button @click="export2Excel" icon="el-icon-document" style="margin-left: 15px" type="primary">导出游客列表
      </el-button>
    </div>


  </div>
</template>

<script>
  import {delTouOrder, editTouOrder, getOrder, getTourist, getTouristList} from "@/api/order"
  import {editIsBlackByTo, getCerTypes} from "@/api/tourist"

  export default {
    name: "orderNewTou",
    props: {
      orderid: {
        type: Number,
        default: -1
      }, touMax: {
        type: Number,
        default: 100000
      }
    },
    data() {
      return {
        onLoading:false,
        touristList:[],
        v_editTou: false,
        onAddTouItem: false,
        textTourist: '',
        touList: [],

        planChargeList: [],
        //单个游客信息
        addTouItemForm: {
          orderId: '',
          id: -1,
          touType: '',
          touName: '',
          touSex: '',
          age: '',
          cerType: '',
          cerNum: '',
          phone: '',
          remark: '',

        },
        cerTypeList: [],

        query: {
          currentPage: 1,
          pageSize: 10
        },

        //编辑游客
        editForm: {}

      }


    }, computed: {
      num_planChan() {
        let array = []

        this.planChargeList.forEach(item => {
          let temp = {}
          temp.name = item.name
          temp.num = 0
          this.touList.forEach(titem => {
            if (titem.touType === item.name)
              temp.num++
          })
          array[array.length] = temp
        })
        return array
      },
      num_men() {
        let num_men = 0
        this.touList.forEach(titem => {
          if (titem.touSex === 1)
            num_men++
        })
        return num_men

      },
      num_women() {
        let num_women = 0
        this.touList.forEach(titem => {
          if (titem.touSex === 0)
            num_women++
        })
        return num_women

      },

      list: function () {
        return this.touList.filter(item => {
          let result = true
          return result
        })
      }
    },

    watch: {
      'orderid': function (val) {
        getOrder(val).then(res => {
          this.planChargeList = JSON.parse(res.proPlanCharge)
        }).catch(error => {

        })
        this.getList()
      },
      'list': function (val,oldVal) {
        if(!oldVal||!val)
          return;
        if(val.length<=oldVal.length)
          return;
        if(val&&val.length>this.touMax){
          this.$alert('游客数目（'+val.length+'人）已超过当前订单所设游客数（'+this.touMax+'人）,请及时核对修正')
        }

      }
    },
    created() {


      // getOrder(this.orderid).then(res => {
      //   this.planChargeList = JSON.parse(res.proPlanCharge)
      //
      // }).catch(error => {
      //
      // })
      this.getList()
      getCerTypes().then(res => {
        this.cerTypeList = res
      }).catch(error => {
      })
    },
    methods: {
      export2Excel() {

        if (this.$refs.mtable.selection.length === 0) {
          this.$message({
            type: 'error',
            message: '您未选中任何订单'
          })
          return
        }

        this.$message({
          type: 'success',
          message: '导出' + this.$refs.mtable.selection.length + '条记录成功'
        })


        let filename = new Date().toLocaleString() + "游客列表导出"
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['游客类型', '游客名', '性别', '年龄', '证件类型', '证件号', '联系电话', '备注']

          let templistArray = []
          this.$refs.mtable.selection.forEach(item => {
            templistArray[templistArray.length] = [item.touType, item.touName, item.touSex === 0 ? '女' : '男', item.age, item.cerTypeName, item.cerNum, item.phone, item.remark]
          })
          excel.export_json_to_excel({
            header: tHeader,
            data: templistArray,
            filename,
            autoWidth: true,
            bookType: 'xlsx'
          })
        })
      },


      getList() {
        getTouristList(this.orderid).then(res => {
          this.touList = res


        }).catch(error => {
        })
      },


      //对单个游客进行修改保存 把EDITFORM传给后台
      saveEidt() {
        this.editForm.orderId = this.orderid
        editTouOrder(this.editForm).then(res => {
          this.$message({
            type: "success",
            message: '修改成功！'
          })
          this.v_editTou = false
          this.getList()

        }).catch(error => {
        })
      },
      editIsBlack(id, isBlack) {
        editIsBlackByTo(id, isBlack).then(res => {
          this.$message({
            type: 'success',
            message: '处理成功！'
          })
          this.getList()
        })
      },
      delTou(id) {
        //删除单个游客
        delTouOrder(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.getList()
        }).catch(error => {

        })

      },

      //对单个游客进行修改
      editTou(tou) {
        this.editForm = JSON.parse(JSON.stringify(tou))
        this.v_editTou = true
      },

      //增加单个游客
      addTouItem() {
        this.addTouItemForm.orderId = this.orderid
        editTouOrder(this.addTouItemForm).then(res => {
          this.$message({
            type: "success",
            message: '录入成功！'
          })
          this.addTouItemForm = {
            orderId: '',
            id: -1,
            touType: '',
            touName: '',
            touSex: '',
            age: '',
            cerType: '',
            cerNum: '',
            phone: '',
            remark: '',
          }
          this.getList()
        }).catch(error => {
        })
      },
      //解析游客字符串  直接录入后台
      parserTourist() {
        this.onLoading = true
        getTourist(this.textTourist, this.orderid).then(res => {
          this.$message({
            type: "success",
            message: "解析成功",
            showClose: true,
          })
          this.touristList = res
          this.onLoading = false
        }).catch(error => {
          this.onLoading = false
        })

      },
    }

  }
</script>

<style scoped>

</style>
