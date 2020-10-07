<template>
  <div class="app-container">
    <!--<div class="g-title">未拼团订单</div>-->
    <!--<el-table ref="multipleTable" :data="orderList" tooltip-effect="dark" style="width: 100%">-->
        <!--<el-table-column label="订单编号" ><template slot-scope="scope">{{scope.row.orderName}}</template></el-table-column>-->
        <!--<el-table-column label="产品名称" ><template slot-scope="scope">{{scope.row.productName}}</template></el-table-column>-->
        <!--<el-table-column label="集合地点"><template slot-scope="scope">{{scope.row.location}}</template></el-table-column>-->
        <!--<el-table-column label="游客人数" ><template slot-scope="scope">{{scope.row.tourNum}}</template></el-table-column>-->
        <!--<el-table-column label="出团日期" ><template slot-scope="scope">{{scope.row.groupDate.substring(0,10)}}</template></el-table-column>-->
        <!--<el-table-column label="下单用户"><template slot-scope="scope">{{scope.row.tourName}}</template></el-table-column>-->
        <!--<el-table-column label="操作" ><template slot-scope="scope"><el-button type="primary"@click="addOrder(scope.row)">订单入团</el-button></template></el-table-column>-->
    <!--</el-table>-->
    <div class="g-title">已选订单</div>
    <el-table ref="multipleTable" :data="inGroupList" tooltip-effect="dark" style="width: 100%">
      <el-table-column label="订单编号" ><template slot-scope="scope">{{scope.row.orderName}}</template></el-table-column>
      <el-table-column label="产品名称" ><template slot-scope="scope">{{scope.row.productName}}</template></el-table-column>
      <el-table-column label="集合地点"><template slot-scope="scope">{{scope.row.location}}</template></el-table-column>
      <el-table-column label="游客人数" ><template slot-scope="scope">{{scope.row.tourNum}}</template></el-table-column>
      <el-table-column label="出团日期" ><template slot-scope="scope">{{scope.row.groupDate.substring(0,10)}}</template></el-table-column>
      <el-table-column label="下单用户"><template slot-scope="scope">{{scope.row.tourName}}</template></el-table-column>
     <el-table-column label="操作" ><template slot-scope="scope"><el-button type="danger"@click="delOrder(scope.row)">订单出团</el-button></template></el-table-column>
    </el-table>
  </div>

</template>

<script>
    import {getOrdersByDate} from "@/api/order";
    import {addGroup,getGroupFOrder,getGroupSOrder,orderInGroup,orderOutGroup} from "@/api/group"

    import {distinct} from "@/utils/tools";
    export default {
        name: "groupOrder",
        data() {
            return {
                onSave:false,
                //正在拖动的游客
               groupForm: {
                   guiderTypeId: '',
                   guiderId: '',
                   carTypeId: '',
                   carId: '',
                   groupDes: '',
                   groupName: '',
                   groupDate: '',
                   orderList:[],
                   serType: this.$route.query.serType,
               },
                    //团内所有游客列表 把之前的接口一并放在这里
                    //当天可选的 审核状态正确的  未拼团的订单+已入该团的订单  用订单列表那个form 不分页。
               orderList: [],
               inGroupList:[],
            }
        },
        computed: {
            disNameList() {
                return distinct(this.groupInfo.touList, 'disName')
            }
        },
        created() {
          this.init()
        },
        // watch: {
        //     'groupInfo.touList': function (newVal, oldVal) {
        //         this.$nextTick(this.initSeatInfo)
        //     }
        // },
        methods: {
          getOrderByDate(){
            if(this.groupForm.groupDate){
              getOrdersByDate(this.groupForm.groupDate,this.groupForm.serType).then(res=>{
                this.orderList=res;
                this.inGroupList=[];
              });
            }
          },
          addOrder(item){
            let orderId = item.orderId
            let groupId = this.$route.query.groupId
            orderInGroup(orderId,groupId).then(res=>{
              this.$message({type: 'success', message: "订单入团成功！"})
              this.onSave=false
              // this.$router.back()
              this.init()
            }).catch(error => {

              this.onSave=false
            })
          },

          delOrder(item){
            let orderId = item.orderId
            orderOutGroup(orderId).then(res=>{
              this.$message({type: 'success', message: "订单出团成功！"})
              this.onSave=false
              // this.$router.back()
              this.init()
            }).catch(error => {

              this.onSave=false
            })

          },
          init(){
            // let id = this.$route.query.planId
            let groupId = this.$route.query.groupId
            console.log("groupId"+groupId)
            // getGroupFOrder(id).then(res => {
            //   this.orderList = res
            //
            // }).catch(error => {
            //   console.log(error)
            // })

            getGroupSOrder(groupId).then(res => {
              this.inGroupList = res
            }).catch(error => {
              console.log(error)
            })

          },
          onSubmit(){
            this.inGroupList.forEach(item=>{
              this.groupForm.orderList.push(item.id);
            });
            addGroup(this.groupForm).then(res=>{
              this.$message({type: 'success', message: "拼团成功！"})
              this.onSave=false
              this.$router.back()
            }).catch(error => {
                            this.onSave=false
                            })

          },
          backTolist(){
            this.$router.back();
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
