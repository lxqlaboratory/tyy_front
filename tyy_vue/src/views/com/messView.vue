<template>
  <div style="text-align: left;">
    <el-dialog append-to-body top="10" :close-on-click-modal="false" :visible.sync="v_sendMess" title="短信发送" v-dialog-drag @close="onClose">
      <label>发送短信名单</label>
      <el-table border :data="messForm.touList.slice((this.queryForm.currentPage - 1) * this.queryForm.pageSize, this.queryForm.currentPage * this.queryForm.pageSize)" stripe fit>
        <el-table-column label="姓名" prop="touName" width="100px"></el-table-column>
        <el-table-column label="手机号" prop="phone">
          <template slot-scope="scope">
            <span v-if="scope.row.phone">{{scope.row.phone}}</span>
            <span v-else style="color: orangered">没有填写该游客联系方式！！！无法给该游客发送短信！！！</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名" prop="proName">
          <template slot-scope="scope">
            <el-input v-model="scope.row.proName" placeholder="未获取"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="集合地点" prop="locationName">
          <template slot-scope="scope">
            <el-input v-model="scope.row.locationName" placeholder="未获取"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="集合时间" prop="collectTime">
          <template slot-scope="scope">
            <el-input v-model="scope.row.collectTime" placeholder="未获取"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="queryForm.currentPage"
        :page-size="queryForm.pageSize"
        :total="userList.length"
        background
        layout="prev, pager, next"
        style="margin-top: 15px;display: inline-block !important;"/>

      <el-form style="margin-top: 14px;" ref="mtable" label-width="140px" :model="messForm">
        <el-form-item label="车号" prop="carNum" required>
          <el-input v-model="messForm.carNum"></el-input>
        </el-form-item>
        <el-form-item label="导游名" prop="guiderName" required>
          <el-input v-model="messForm.guiderName"></el-input>
        </el-form-item>
        <el-form-item label="导游联系方式" prop="guiderPhone" required>
          <el-input v-model="messForm.guiderPhone"></el-input>
        </el-form-item>

        <el-form-item label="短信模板" >
          <el-select v-model="messTemplate" placeholder="请选择短信模板">
            <el-option v-for="item in messTemplateList" :label="item.name" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="短信预览">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="messContent" disabled></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即发送</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
    <el-button @click="openDialog" icon="el-icon-s-comment" type="primary">
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
  import {getTouSmsDetail}  from '@/api/group';
  import {sendSms} from '@/api/baseApi'
  export default {
    name: "messView",
    data() {
      return {
        queryForm:{
          currentPage:1,
          pageSize:5
        },
          initData:{
              touOrderList:this.userList,
              groupId:this.groupId,
          },

        signName:'【旅业科技】',
        messTemplateList:[
          {
            name:'游客出行通知',
            value:'SMS_182400429',
            content:'您好，欢迎参加{proName}，{startTime}在{locationName}上车，车号{carNum}，导游{guiderName}：{guiderPhone}，请带好身份证等相关出行用具，收到请回复。'
          },
          {
            name:'游客出行通知2不要用',
            value:'SMS_1824004292',
            content:'游客出行通知2游客出行通知2游客出行通知2游客出行通知2您好，欢迎参加{proName}，{startTime}在{locationName}上车，车号{carNum}，导游{guiderName}：{guiderPhone}，请带好身份证等相关出行用具'
          }
        ],

        v_sendMess: false,
          messForm:{
              carNum:'未获取',
              guiderName:'未获取',
              guiderPhone:'未获取',
              touList:[],
          },
        messTemplate:'SMS_182400429',
      }
    },
      created(){
        this.initData.groupId=this.groupId;
        this.initData.touOrderList=this.userList;
        this.getData();
      },
      watch: {
          userList: {
              deep: true,
              handler(val) {
                  this.initData.touOrderList=val;
                  this.getData();
              }
          },

      },
    computed:{
      messContent:function () {
        let template=this.messTemplateList.find(item=>(item.value===this.messTemplate)).content

        for(let item in this.messForm){
          let patt='{'+item+'}';
          if(this.messForm[item])
            template=template.replace(new RegExp(patt,'g'),this.messForm[item])
        }
        return this.signName+template
      }
    },
    props:{
      userList:{
        type:Array,
        default:[]
      },
        groupId:{
          type: String,
            default: '',
        },
    },
    methods:{
        getData(){
            console.log(this.initData.touOrderList)
            if (this.initData.touOrderList.length>0){
                getTouSmsDetail(this.initData).then(res=>{
                    this.messForm=res;
                })
            }
        },
      openDialog(){
        this.v_sendMess=true
      },
        onClose(){
            this.$emit('close');
        },
      onSubmit() {
            var phoneRex= /^[1]([3-9])[0-9]{9}$/;
            this.messForm.messTemplate=this.messTemplate;
            if (!phoneRex.test(this.messForm.guiderPhone)){
                this.$message({
                    type:'error',
                    message:'导游手机号格式错误！'
                });
            }else{
                sendSms(this.messForm).then(res=>{
                    this.$message({
                        type:'info',
                        message:res
                    });

                }).catch(err=>{

                })
            }
            console.log(this.messForm)
        // this.refs['mtable'].validate((valid) => {
        //   if (valid) {
        //     alert('submit!');
        //   } else {
        //     return false;
        //   }
        // });
      }
    }

  }
</script>

<style scoped>

</style>
