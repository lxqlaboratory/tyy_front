<template>
  <div class="app-container">
    <div class="g-title">团队信息</div>

    <div style="display: flex;align-items: center;justify-content: flex-start;flex-wrap: wrap;margin-left: 35px;">
      <div class="infoItem">
        <label>团队编号:</label>
        <span>{{groupInfo.groupNum}}</span>
      </div>
      <div class="infoItem">
        <label>团队名称:</label>
        <span>{{groupInfo.groupName}}</span>
      </div>
      <div class="infoItem">
        <label>出团日期:</label>
        <span>{{groupInfo.travelDate}}</span>
      </div>
      <!--<div class="infoItem">-->
        <!--<label>订单数:</label>-->
        <!--<span>{{groupInfo.orderCount}}</span>-->
      <!--</div>-->

      <!--<div class="infoItem">-->
        <!--<label>游客人数:</label>-->
        <!--<span>{{groupInfo.touNum}}人</span>-->
      <!--</div>-->
      <div class="infoItem">
        <label>导游名:</label>
        <span>{{groupInfo.guiderName}}</span>
      </div>
      <div class="infoItem">
        <label>车型名:</label>
        <span>{{groupInfo.carType.typeName}}</span>
      </div>
      <div class="infoItem">
        <label>车辆名:</label>
        <span>{{groupInfo.carName}}</span>
      </div>
    </div>

    <div class="g-title">已拼团订单</div>
    <el-table ref="multipleTable" :data="inGroupList" tooltip-effect="dark" style="width: 100%">
      <el-table-column align="center" label="订单编号" ><template slot-scope="scope">{{scope.row.orderName}}</template></el-table-column>
      <el-table-column align="center" label="产品名称" ><template slot-scope="scope">{{scope.row.productName}}</template></el-table-column>
      <el-table-column align="center" label="计划编号" ><template slot-scope="scope">{{scope.row.planId}}</template></el-table-column>
      <el-table-column align="center" label="集合地点"><template slot-scope="scope">{{scope.row.location}}</template></el-table-column>
      <el-table-column align="center" label="游客人数" ><template slot-scope="scope">{{scope.row.tourNum}}</template></el-table-column>
      <el-table-column align="center" label="出团日期" ><template slot-scope="scope">{{scope.row.travelDate}}</template></el-table-column>
      <el-table-column align="center" label="操作员"><template slot-scope="scope">{{scope.row.workerName}}</template></el-table-column>
      <el-table-column align="center" v-if="this.groupState===0" label="操作" ><template slot-scope="scope"><el-button type="danger" @click="delOrder(scope.row)">订单出团</el-button></template></el-table-column>
    </el-table>

    <div v-if="this.groupInfo.touList.length!=0" class="g-title">拼团操作</div>
    <el-tabs type="border-card">
      <el-tab-pane label="订单拼团">
        <el-row align="middle" type="flex">
          <el-col :span="16" class="filter-container">
            <div class="filter-item">
              <label>订单编号</label>
              <el-input v-model="queryForm.orderName"></el-input>
            </div>

            <div class="filter-item">
              <label>集合地点</label>
              <el-input v-model="queryForm.location"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <el-button @click="getList" icon="el-icon-search" style="width: 180px" type="primary">查询</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>

        <el-table
          :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          fit
          highlight-current-row
          stripe
          style="margin-top: 15px;"
          v-loading="onLoading">
          <el-table-column align="center" label="订单编号" ><template slot-scope="scope">{{scope.row.orderName}}</template></el-table-column>
          <el-table-column align="center" label="产品名称"><template slot-scope="scope">{{scope.row.productName}}</template></el-table-column>
          <el-table-column align="center" label="计划编号" ><template slot-scope="scope">{{scope.row.planId}}</template></el-table-column>
          <el-table-column align="center" label="出团日期" ><template slot-scope="scope">{{scope.row.travelDate.substring(0,10)}}</template></el-table-column>
          <el-table-column align="center" label="集合地点"><template slot-scope="scope">{{scope.row.location}}</template></el-table-column>
          <el-table-column align="center" label="游客人数" width="100px"><template slot-scope="scope">{{scope.row.tourNum}}</template></el-table-column>
          <el-table-column align="center" label="订单状态" width="150">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.groupId===0">未拼团</el-tag>
              <el-tag type="warning" v-else>已拼团</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" v-if="this.groupState===0" label="操作" ><template slot-scope="scope"><el-button type="primary" @click="addOrder(scope.row)">订单入团</el-button></template></el-table-column>
        </el-table>
        <div style="display: flex;align-items: center;margin-top: 15px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 20, 40,100]"
            :page-size="pageSize"
            :total="list.length"
            style="margin-top: 15px;"
            background
            layout="sizes, prev, pager, next"/>

    </div>
      </el-tab-pane>
      <el-tab-pane label="座位安排">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-card class="box-card" style="">

              <div slot="header"
                   style="display: flex;align-items: center;justify-content: space-between;">
                <span>游客选座</span>
              </div>

              <el-divider content-position="center">车头</el-divider>

              <el-row :gutter="10" justify="space-around" style="flex-grow: 1" type="flex">
                <el-col :key="col"
                        :span="Math.floor(22/(groupInfo.carType.columnLeft+groupInfo.carType.columnRight))"
                        v-for="col in groupInfo.carType.columnLeft">
                  <div :id="row+''+col" :key="row" @dragover='allowDrop($event)' @drop="drop"
                       class="seat-item"
                       style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center"
                       v-for="row in groupInfo.carType.rowLeft">
                    <el-tag type="info">#{{row}}{{col}}</el-tag>
                  </div>
                </el-col>
                <el-col :span="2">
                </el-col>
                <el-col :key="groupInfo.carType.columnLeft+col"
                        :span="Math.floor(22/(groupInfo.carType.columnLeft+groupInfo.carType.columnRight))"
                        v-for="col in groupInfo.carType.columnRight">
                  <div :id="row+''+(groupInfo.carType.columnLeft+col)" :key="row" @dragover='allowDrop($event)'
                       @drop="drop"
                       class="seat-item"
                       style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center"
                       v-for="row in groupInfo.carType.rowLeft">
                    <el-tag @drop.prevent style="margin-right: 5px;" type="info">
                      #{{row}}{{groupInfo.carType.columnLeft+col}}
                    </el-tag>
                  </div>
                </el-col>
              </el-row>

              <el-divider content-position="center">车尾</el-divider>

            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="box-card">
              <div slot="header"
                   style="display: flex;align-items: center;justify-content: space-between;">
                <span>未排座游客</span>
                <el-button type="primary" @click="paiSeat(this.groupInfo.touList)">自动排座</el-button>
              </div>
              <div @dragover='allowDrop($event)' @drop="reseatInfo" style="min-height: 6vh">
                <div :id="dis.disName" :key="dis.disName"
                     :style="{'color':dis.color}"
                     style="margin: 10px;display: flex;align-items: center;justify-content: flex-start;flex-wrap: wrap;"
                     v-for="dis in disNameList">
                  <!--<el-button type="text" style="margin-right: 15px;"  @click="$router.push({name:'orderList',params:{groupNum:groupInfo.groupNum,disName:dis.disName}})">{{dis.disName}} : </el-button>-->
                  <span
                    :draggable="true"
                    :id="'t'+item.id"
                    @dragstart='dragStart($event,item)'
                    class="tou-item"
                    v-for="item in groupInfo.touList.filter(item=>(item.disName===dis.disName))"
                  >
              <el-popover
                :content="item.remark"
                :title="item.phone"
                placement="top-start"
                trigger="click"
                width="200">
                <el-button :style="{'background-color':dis.color}" plain size="mini" slot="reference"
                           style="font-size: 14px;color: white">{{item.name}}({{item.sex===1?'男':'女'}})</el-button>
              </el-popover>
            </span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {orderInGroup, orderOutGroup, getGroupDetail, sendMsg, setSeat,getGroupSOrderHasVarPlan} from "@/api/group"
  import {distinct} from "@/utils/tools"
  import MessView from "@/views/com/messView"
  import {getWeChatNoPtOrders} from "@/api/order"

  export default {
    name: "groupPlanspt",
    components: {MessView},
    data() {
      return {
        // 当前页
        currentPage: 1,
        // 每页多少条
        pageSize: 5,
        groupState:'',
        queryForm: {
          orderName:'',
          location:'',
        },
        inGroupList:[],
        messTouList:[],
        onLoading: false,
        //短信测试数据
        tempMess: [
          {
            sendTime: '2020-01-09 19:32',
            phoneNum: '15866711037',
            messType: 'send',
            result: 'success',
            content: '您好，欢迎参加云台山3日游，3月8日早5:30全福立交桥西南角上车,车号:鲁A387783,导游刘小莉18663778600;请带好身份证等相关出行用具,收到请回复.',
            user: 'zhangsan'
          },
          {
            sendTime: '2020-01-09 19:34',
            phoneNum: '15866711037',
            messType: 'save',
            result: 'success',
            content: 'OK',
            user: 'xuxxu'
          },
          {
            sendTime: '2020-01-09 19:41',
            phoneNum: '15866711037',
            messType: 'send',
            result: 'success',
            content: '您好，欢迎参加云台山3日游，3月8日早5:30全福立交桥西南角上车,车号:鲁A387783,导游刘小莉18663778600;请带好身份证等相关出行用具,收到请回复.',
            user: 'zhangsan'
          },
          {
            sendTime: '2020-01-09 19:44',
            phoneNum: '15866711037',
            messType: 'send',
            result: 'error',
            content: '您好，欢迎参加云台山3日游，3月8日早5:30全福立交桥西南角上车,车号:鲁A387783,导游刘小莉18663778600;请带好身份证等相关出行用具,收到请回复.',
            user: 'zhangsan'
          },
          {
            sendTime: '2020-01-09 19:46',
            phoneNum: '15866711037',
            messType: 'save',
            result: 'success',
            content: '好的好的好的',
            user: 'xuxxu'
          }
        ],


        //正在拖动的游客
        onSend: false,
        tourDrag: {},
        orderListQuery: {
          orderState: ''
        },
        touListQuery: {
          currentPage: 1,
          pageSize: 10,
          disName: ''
        },
        groupInfo: {
          id:'',
          groupNum: '',
          groupName: '',
          touNum: '',
          //出团日期
          groupDate: '',
          //已入团订单数
          orderCount: '',
          guiderName: '',
          carName: '',
          carType: {
            columnLeft: 0,
            columnRight: 0,
            rowLeft: 0,
            rowRight: 0
            //车型的所有信息，画大巴车用
          },
          //团内所有游客列表 把之前的接口一并放在这里
          touList: [],
          //当天可选的 审核状态正确的  未拼团的订单+已入该团的订单  用订单列表那个form 不分页。
          orderList: []
        }
      }
    },
    computed: {

      orderListC() {
        if (this.orderListQuery.orderState === undefined || this.orderListQuery.orderState === '' || this.orderListQuery.orderState === null) {
          return this.groupInfo.orderList
        }

        if (this.orderListQuery.orderState)
          return this.groupInfo.orderList.filter(item => (item.groupNum))
        else
          return this.groupInfo.orderList.filter(item => (!item.groupNum))

      },
      disNameList() {
        let colorList = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#A52A2A', '#8A2BE2', '#FAEBD7']

        let disArray = distinct(this.groupInfo.touList, 'disName')
        let i = 0

        let arraytemp = []
        disArray.forEach(item => {
          let curIndex = arraytemp.length
          arraytemp[curIndex] = {}
          arraytemp[curIndex].disName = item
          arraytemp[curIndex].color = colorList[i++]
        })
        return arraytemp
      },
      // touListC() {
      //   return this.groupInfo.touList.filter(item => (item.disName === this.touListQuery.disName || !this.touListQuery.disName))
      // }
    },

    activated() {
      this.getData()
    },
    created() {
      this.getData()
      this.init()
      this.getList()
    },

    methods: {
      // 每页多少条
      handleSizeChange(val) {
        this.pageSize = val;
      },
      // 当前页
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      getList() {
        this.onLoading = true
        getWeChatNoPtOrders(this.queryForm).then(res => {
          this.list = res.data
          this.onLoading = false
        }).catch(error => {
          this.onLoading = false
        })
      },
      init(){
        // this.groupState = this.$route.query.groupState
        let groupId = this.$route.query.id

        getGroupSOrderHasVarPlan(groupId).then(res => {
          this.inGroupList = res.data
        }).catch(error => {
          console.log(error)
        })

      },
      delOrder(item){
        let orderId = item.orderId
        orderOutGroup(orderId).then(res=>{
          if(res.re===1){
            this.$message({type: 'success', message: "订单出团成功！"})
          }else{
            this.$message({type: 'error', message: res.data})
          }
          this.onSave=false
          // this.$router.back()
          this.init()
          this.getList()
          this.getData()
        }).catch(error => {

          this.onSave=false
        })
      },

      sendMessPl(){
        if (this.$refs.mtable.selection.length === 0) {
          this.$message({
            type: 'error',
            message: '您未选中任何游客'
          })
          return
        }
        let tempTouMessList=[]

        this.$refs.mtable.selection.forEach(item => {tempTouMessList[tempTouMessList.length]=item.id})

        this.messTouList=tempTouMessList

        this.$refs['plfs'].openDialog()

      },

      export2Excel() {
        if (this.$refs.mtable.selection.length === 0) {
          this.$message({
            type: 'error',
            message: '您未选中任何游客'
          })
          return
        }

        this.$message({
          type: 'success',
          message: '导出' + this.$refs.mtable.selection.length + '条记录成功'
        })

        let filename = new Date().toLocaleString() + "游客列表导出"
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['类别', '姓名', '来自分销商', '订单号', '年龄', '性别', '证件类型', '证件号', '联系方式', '游客备注', '是否已排座']
          let templistArray = []
          this.$refs.mtable.selection.forEach(item => {
            templistArray[templistArray.length] = [item.touType, item.touName, item.disName, item.orderNum, item.age, item.touSex === 0 ? '女' : '男', item.cerType, '【' + item.cerType + '】' + item.cerNum, item.phone, item.remark, item.seatInfo ? '已排座' : '未排座']
          })
          excel.export_json_to_excel({
            header: tHeader,
            data: templistArray,
            filename,
            autoWidth: true,
            bookType: 'csv'
          })
        })
      },

      reseatInfo(ev) {
        let id = ev.dataTransfer.getData("Text")
        setSeat(this.tourDrag.id, 0).then(res => {
          this.tourDrag.seatInfo = 0
          ev.target.appendChild(document.getElementById(id))
        }).catch(error => {
          this.$message({
            type: 'error',
            message: '操作失败，请重试'
          })
        })
      },
      drop(ev) {
        ev.preventDefault()
        console.log(ev.target.className)
        let id = ev.dataTransfer.getData("Text")

        if (ev.target.className === 'seat-item') {
          //检查当前座位有没有人 遍历游客列表查看有无重复
          let seatId = ev.target.id
          let hasTour = false
          let orderId = this.tourDrag.orderId

          this.groupInfo.touList.forEach(item => {
            // console.log("111:"+this.tourDrag.id)
            // console.log("222:"+ev.target.id)
            if (item.seatInfo === seatId)
              hasTour = true
          })

          if (hasTour) {
            this.$message({
              type: 'error',
              message: '该位置已经有游客'
            })
          } else {
            setSeat(this.tourDrag.id, ev.target.id).then(res => {
              ev.target.appendChild(document.getElementById(id))
              this.tourDrag.seatInfo = ev.target.id
            }).catch(error => {
              this.$message({
                type: 'error',
                message: '操作失败，请重试'
              })
            })


          }
        }
      },

      allowDrop: function (event) { //moving
        event.preventDefault()
      },

      dragStart(ev, item) {
        ev.dataTransfer.setData("Text", ev.target.id)
        this.tourDrag = item
      },
      onClose(){
        this.getData();
      },
      addOrder(item){
        let orderId = item.orderId
        let groupId = this.groupInfo.id
        orderInGroup(orderId,groupId).then(res=>{
          if(res.re===1){
            this.$message({type: 'success', message: "订单入团成功！"})
          }else{
            this.$message({type: 'error', message: res.data})
          }
          this.onSave=false
          // this.$router.back()
          this.init()
          this.getList()
          this.getData()
        }).catch(error => {
          this.onSave=false
        })
      },
      getData() {
        let id = this.$route.query.id
        getGroupDetail(id).then(res => {
          // this.groupInfo = res.data
          this.groupInfo.groupNum = res.data.groupNum
          this.groupInfo.groupName = res.data.groupName
          this.groupInfo.travelDate = res.data.travelDate
          this.groupInfo.guiderName = res.data.guiderName
          this.groupInfo.carType.typeName = res.data.carType.typeName
          this.groupInfo.carName = res.data.carName
          this.groupInfo.groupId = res.data.id
          this.groupState = res.data.groupState
          this.$nextTick(this.initSeatInfo)

        }).catch(error => {
          console.log(error)
        })

      },

      //初始化座位位置。把对应游客放在容器里
      initSeatInfo() {
        //遍历游客 如果游客已经不存在，删除节点
        let touListItem = document.getElementsByClassName('tou-item')
        if (touListItem.length > 0)
          for (let i = 0; i < touListItem.length; i++)
            if (touListItem[i] && touListItem[i].id) {
              let id = touListItem[i].id.replace('t', '')
              let tou = this.groupInfo.touList.find(item => (item.id === parseInt(id)))
              if (!tou) {
                touListItem[i].parentNode.removeChild(touListItem[i])
                i--
              }
            }


        this.groupInfo.touList.forEach(item => {
          if (item.seatInfo) {
            document.getElementById(item.seatInfo).appendChild(document.getElementById('t' + item.id))
          }
        })
      },

      paiSeat(touList) {

        alert(touList)
        alert(this.groupInfo.carType.columnRight)

        alert(this.groupInfo.carType.rowLeft)
        alert(this.groupInfo.carType.rowRight)
      },


    }
  }
</script>

<style scoped>
  .seat-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 5px;
    min-height: 6vh;
    margin: 8px;
  }

  .tou-item {
    margin-right: 5px;
  }

  .g-title {
    font-weight: bold;
    font-size: 19px;
    background-color: whitesmoke;
    border-radius: 3px;
    color: #333;
    border-left: 7px solid #62bbc3;
    margin: 10px 0 25px 0;
    padding: 8px 15px;
  }

  .infoItem {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 33%;
    margin: 7px 0;
    padding-bottom: 3px;
    border-bottom: 1px solid whitesmoke;
  }

  .infoItem label {
    margin-right: 8px;
  }

</style>
