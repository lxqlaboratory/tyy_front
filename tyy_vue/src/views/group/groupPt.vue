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
        <span>{{groupInfo.groupDate}}</span>
      </div>
      <div class="infoItem">
        <label>订单数:</label>
        <span>{{groupInfo.orderCount}}</span>
      </div>

      <div class="infoItem">
        <label>游客人数:</label>
        <span>{{groupInfo.touNum}}人</span>
      </div>
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
    <div class="g-title">拼团操作</div>
    <el-tabs type="border-card">
      <el-tab-pane label="订单拼团">
        <el-select :value="orderListQuery.orderState" clearable placeholder="选择拼团状态"
                   v-model="orderListQuery.orderState">
          <el-option :value="true" label="已拼团"></el-option>
          <el-option :value="false" label="未拼团"></el-option>
        </el-select>
        <el-table

          :data="orderListC"
          border
          fit
          highlight-current-row
          stripe
          style="margin-top: 15px;"
        >

          <el-table-column align="center" label="拼团状态">
            <template slot-scope="scope">
              <el-tag type="primary" v-if="scope.row.groupNum">已入团</el-tag>
              <el-tag type="info" v-else>未拼团</el-tag>
            </template>
          </el-table-column>

          <el-table-column align="center" label="来自分销商" sortable>
            <template slot-scope="scope">
              {{ scope.row.disName}}
            </template>
          </el-table-column>

          <el-table-column align="center" label="订单号" prop="orderNum" sortable></el-table-column>

          <el-table-column align="center" label="产品名" sortable>
            <template slot-scope="scope">
              <el-button @click="toProduct()" type="text">{{scope.row.proName}}</el-button>
            </template>
          </el-table-column>


          <el-table-column align="center" label="游客数">
            <template slot-scope="scope">
              {{ scope.row.touNum}}人
            </template>
          </el-table-column>


          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="delOrder(scope.row.id)" type="warning" v-if="scope.row.groupNum">订单出团</el-button>
              <el-button @click="addOrder(scope.row.id)" type="success" v-else>订单入团</el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-tab-pane>
      <el-tab-pane label="游客列表">
        <el-select clearable placeholder="来自分销商" v-model="touListQuery.disName">
          <el-option :key="item.disName" :label="item.disName" :value="item.disName"
                     v-for="item in disNameList"></el-option>
        </el-select>


        <el-button  @click="sendMessPl" style="float: right"  icon="el-icon-s-comment" type="primary">批量发送短信</el-button>
        <mess-view ref="plfs" style="float: right; visibility: hidden"  :user-list="messTouList" :group-id="$route.query.id" @close="onClose"></mess-view>

        <el-table
          :data="touListC.slice((this.touListQuery.currentPage - 1) * this.touListQuery.pageSize, this.touListQuery.currentPage * this.touListQuery.pageSize)"
          border
          fit
          highlight-current-row
          ref="mtable"
          stripe
          style="margin-top: 15px;"
        >
          <el-table-column align="center" type="selection"></el-table-column>

          <el-table-column align="center" label="游客类别">
            <template slot-scope="scope">
              {{ scope.row.touType}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="游客姓名">
            <template slot-scope="scope">
              {{ scope.row.touName}}
            </template>
          </el-table-column>

          <el-table-column align="center" label="来自分销商">
            <template slot-scope="scope">
              {{ scope.row.disName}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="订单号">
            <template slot-scope="scope">
              {{ scope.row.orderNum}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="年龄">
            <template slot-scope="scope">
              {{ scope.row.age}}
            </template>
          </el-table-column>


          <el-table-column align="center" label="性别">
            <template slot-scope="scope">

              {{ scope.row.touSex===1?'男':'女'}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="证件号">
            <template slot-scope="scope">
              {{ scope.row.cerNum}}({{scope.row.cerType}})
            </template>
          </el-table-column>


          <el-table-column align="center" label="联系方式">
            <template slot-scope="scope">
              {{ scope.row.phone}}
            </template>
          </el-table-column>

          <el-table-column align="center" label="游客备注">
            <template slot-scope="scope">
              {{ scope.row.remark}}
            </template>
          </el-table-column>

          <el-table-column align="center" label="座位安排">
            <template slot-scope="scope">
              <el-tag type="info" v-if="scope.row.seatInfo===0">未排座</el-tag>
              <el-tag type="success" v-else>已排座</el-tag>
            </template>
          </el-table-column>


          <el-table-column align="center" label="短信往来">
            <template slot-scope="scope">
              <el-popover placement="left">
                <div>
                  <el-table :data="scope.row.baseSmsList" stripe>
                    <el-table-column label="时间" prop="sendTime" width="200"></el-table-column>
                    <el-table-column label="类型">
                      <template slot-scope="scope">
                        <el-tag type="primary" v-if="scope.row.smsType==='DOWNSMS'">发出</el-tag>
                        <el-tag type="warning" v-if="scope.row.smsType==='UPSMS'">回复</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column label="内容" prop="content" width="400"></el-table-column>
                    <el-table-column label="操作人" prop="adminName" width="150"></el-table-column>
                    <el-table-column label="手机号" prop="phone" width="200"></el-table-column>
                    <el-table-column label="结果">
                      <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.result===1">成功</el-tag>
                        <el-tag type="danger" v-else>失败</el-tag>
                      </template>
                    </el-table-column>

                  </el-table>
                </div>
                <el-button slot="reference">{{ scope.row.baseSmsList.length }}条</el-button>

              </el-popover>
              <div style="color: #5a5e66;font-size: 12px;">发送{{ scope.row.baseSmsList.filter(val=>val.smsType ==='DOWNSMS').length }}条 回复{{ scope.row.baseSmsList.filter(data=>data.smsType==='UPSMS').length }}条</div>
            </template>
          </el-table-column>


          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <mess-view :user-list="[scope.row.id]" :group-id="$route.query.id" @close="onClose">短信通知</mess-view>

            </template>
          </el-table-column>

        </el-table>


        <div>
          <el-pagination
            :current-page.sync="touListQuery.currentPage"
            :page-size="touListQuery.pageSize"
            :total="touListC.length"
            background
            layout="prev, pager, next"
            style="margin-top: 15px;display: inline-block !important;"/>

          <el-select style="margin-left:  5px;"
                     v-model="touListQuery.pageSize">
            <el-option :value="10" label="10条/页"></el-option>
            <el-option :value="20" label="20条/页"></el-option>
            <el-option :value="30" label="30条/页"></el-option>
            <el-option :value="40" label="40条/页"></el-option>
            <el-option :value="50" label="50条/页"></el-option>
            <el-option :value="100" label="100条/页"></el-option>
            <el-option :value="500" label="500条/页"></el-option>
          </el-select>
          <el-button @click="export2Excel('xlsx')" icon="el-icon-document" style="margin-left: 15px" type="primary">
            导出选中条目(Excel)
          </el-button>
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
                <!-- <el-button type="primary" @click="initSeatInfo">自动排座</el-button>-->
              </div>
              <div @dragover='allowDrop($event)' @drop="reseatInfo" style="min-height: 6vh">
                <div :id="dis.disName" :key="dis.disName"
                     :style="{'color':dis.color}"
                     style="margin: 10px;display: flex;align-items: center;justify-content: flex-start;flex-wrap: wrap;"
                     v-for="dis in disNameList">
                  <el-button type="text" style="margin-right: 15px;"  @click="$router.push({name:'orderList',params:{groupNum:groupInfo.groupNum,disName:dis.disName}})">{{dis.disName}} : </el-button>
                  <span
                    :draggable="true"
                    :id="'t'+item.id"
                    @dragstart='dragStart($event,item)'
                    class="tou-item"
                    v-for="item in groupInfo.touList.filter(item=>(item.disName===dis.disName))"
                  >
              <el-popover
                :content="item.remark"
                :title="item.touType"
                placement="top-start"
                trigger="click"
                width="200">
                <el-button :style="{'background-color':dis.color}" plain size="mini" slot="reference"
                           style="font-size: 14px;color: white">{{item.touName}}({{item.touSex===1?'男':'女'}})</el-button>
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
  import {addOrder, delOrder, getGroupDetail, sendMsg, setSeat} from "@/api/group"
  import {distinct} from "@/utils/tools"
  import MessView from "@/views/com/messView"

  export default {
    name: "grouppt",
    components: {MessView},
    data() {
      return {
        messTouList:[],

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
      touListC() {
        return this.groupInfo.touList.filter(item => (item.disName === this.touListQuery.disName || !this.touListQuery.disName))
      }
    },

    activated() {
      this.getData()
    },
    created() {
      this.getData()
    },

    methods: {

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
          document.getElementById(this.tourDrag.disName).appendChild(document.getElementById(id))
        }).catch(error => {
          this.$message({
            type: 'error',
            message: '操作失败，请重试'
          })
        })
      },
      drop(ev) {
        ev.preventDefault()
        let id = ev.dataTransfer.getData("Text")
        if (ev.target.className === 'seat-item') {
          //检查当前座位有没有人 遍历游客列表查看有无重复
          let seatId = ev.target.id
          let hasTour = false
          this.groupInfo.touList.forEach(item => {
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
      addOrder(id) {
        //拼入一个订单。
        //刷新整个页面
        addOrder(this.$route.query.id, id).then(res => {
          this.$message({
            type: 'success',
            message: '拼入订单成功！'
          })
          this.getData()
        }).catch(error => {
        })
      },
      delOrder(id) {
        this.$confirm('订单出团将清空该订单下游客的座位信息，是否继续', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          delOrder(id).then(res => {
            this.$message({
              type: 'success',
              message: '订单出团操作成功！'
            })
            this.getData()
          }).catch(error => {
            this.getData()
          })
        })

      },
      getData() {
        let id = this.$route.query.id
        getGroupDetail(id).then(res => {
          this.groupInfo = res
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
      }


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
