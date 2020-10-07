<template>
  <div class="app-container">
    <div class="g-title">选择出团时间</div>

    <div style="display: flex;align-items: center;justify-content: flex-start;flex-wrap: wrap;margin-left: 35px;">
      <el-date-picker @change="getOrderByDate()" placeholder="请选择出团日期" v-model="groupForm.groupDate"
                      value="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"></el-date-picker>
    </div>
    <div class="g-title">未拼团订单</div>
    <el-table ref="multipleTable" :data="orderList" tooltip-effect="dark" style="width: 100%">
        </el-table-column>
        <el-table-column label="订单编号" ><template slot-scope="scope">{{scope.row.orderNum}}</template></el-table-column>
        <el-table-column label="产品名称" ><template slot-scope="scope">{{scope.row.proName}}</template></el-table-column>
        <el-table-column label="所属供应商" ><template slot-scope="scope">{{scope.row.disName}}</template></el-table-column>
        <el-table-column label="游客人数" ><template slot-scope="scope">{{scope.row.touNum}}</template></el-table-column>
        <el-table-column label="操作" ><template slot-scope="scope"><el-button type="primary"@click="addOrder(scope.row.id)">订单入团</el-button></template></el-table-column>

      </el-table>
      </el-tab-pane>
    </el-tabs>
    <div class="g-title">已选订单</div>
    <el-table ref="multipleTable" :data="inGroupList" tooltip-effect="dark" style="width: 100%">
        </el-table-column>
        <el-table-column label="订单编号"><template slot-scope="scope">{{scope.row.orderNum}}</template></el-table-column>
        <el-table-column label="产品名称" ><template slot-scope="scope">{{scope.row.proName}}</template></el-table-column>
        <el-table-column label="所属供应商" ><template slot-scope="scope">{{scope.row.disName}}</template></el-table-column>
        <el-table-column label="游客人数" ><template slot-scope="scope">{{scope.row.touNum}}</template></el-table-column>
        <el-table-column label="操作" ><template slot-scope="scope"><el-button type="danger"@click="delOrder(scope.row.id)">订单出团</el-button></template></el-table-column>
      </el-table>
      </el-tab-pane>
    </el-tabs>
    <div class="g-title">拼团信息</div>

    <div style="display: flex;align-items: center;justify-content: flex-start;flex-wrap: wrap;margin-left: 35px;">
      <el-form :model="groupForm" label-width="80px" ref="addGroup">
        <el-form-item
          :rules=" [{ required: true, message: '请输入活动名称', trigger: 'blur' },  { min: 3, max:25, message: '长度在 3 到 25 个字符', trigger: 'blur' }]"
          label="团队名"
          prop="groupName">
          <el-input placeholder="请输入团队名" v-model="groupForm.groupName"></el-input>
        </el-form-item>

        <el-form-item label="选择导游" required>
          <el-select :value="groupForm.guiderTypeId" @change="groupForm.guiderId=''" placeholder="筛选导游类型"
                     v-model="groupForm.guiderTypeId">
            <el-option :key="item.id" :label="item.guiderTypeName" :value="item.id"
                       v-for="item in initData.guiderTypeList"></el-option>
          </el-select>
          <el-select :value="groupForm.guiderId" placeholder="选择导游" v-model="groupForm.guiderId">
            <el-option :key="item.id"
                       :label="item.guiderName" :value="item.id"
                       v-for="item in initData.guiderList.filter(item=>(item.typeId===groupForm.guiderTypeId))"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择车辆" required>
          <el-select :value="groupForm.carTypeId" @change="groupForm.carId=''" placeholder="筛选车型"
                     v-model="groupForm.carTypeId">
            <el-option :key="item.id" :label="item.typeName" :value="item.id"
                       v-for="item in initData.carTypeList"></el-option>
          </el-select>
          <el-select :value="groupForm.carId" placeholder="选择车辆" v-model="groupForm.carId">
            <el-option :key="item.id"
                       :label="item.carName" :value="item.id"
                       v-for="item in initData.carList.filter(item=>(item.carType===groupForm.carTypeId))"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="团队备注">
          <el-input :rules=" [ { min: 0, max:500, message: '长度小于500字符', trigger: 'blur' }]" placeholder="简单记录团队情况"
                    type="textarea"
                    v-model="groupForm.groupDes"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :loading="onSave" @click="onSubmit">立即创建</el-button>
            <el-button @click="backTolist">取消</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
    import {getOrdersByDate} from "@/api/order";
    import {addGroup} from "@/api/group"

    import {distinct} from "@/utils/tools";
    import {getCarList, getCarTypeList} from "@/api/tourist";
    import {getGuiderList, getGuiderType} from '@/api/guide'
    export default {
        name: "groupPt",
        data() {
            return {
                initData: {
                    guiderTypeList: [],
                    guiderList: [],
                    carTypeList: [],
                    carList: []
                },
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
          addOrder(orderId){
            var index=this.orderList.findIndex(item=>{
              if(item.id==orderId){
                return true;
              }
            })
            this.inGroupList.push(this.orderList[index]);
            this.orderList.splice(index,1);
          },
          delOrder(id){
            var index=this.inGroupList.findIndex(item=>{
              if(item.id==id){
                return true;
              }
            })
            this.orderList.push(this.inGroupList[index]);
            this.inGroupList.splice(index,1);
          },
          init(){
            getGuiderType().then(res => {
                this.initData.guiderTypeList = res
            }).catch(error => {
            })
            getGuiderList().then(res => {
                this.initData.guiderList = res
            }).catch(error => {
            })
            getCarList().then(res => {
                this.initData.carList = res
            }).catch((error => {
            }))
            getCarTypeList().then(res => {
                this.initData.carTypeList = res
            }).catch(error => {
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
