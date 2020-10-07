<template>
  <div class="app-container">
    <el-dialog
      v-dialog-drag
      width="35vw"
      title="修改密码"
      :visible.sync="changePassword"
      >
      <el-input placeholder="请输入新密码 (至少6位)" :maxlength="20" v-model="mpassword"></el-input>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary"
                     @click="savePassword(guiderform.id,mpassword)">保存</el-button>
          <el-button type="warning"
                     @click="mpassword='';changePassword=false">取消</el-button>
        </span>
    </el-dialog>

    <el-button @click="rollback" type="text">返回导游列表</el-button>
    <el-form :model="guiderform" ref="mform" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="导游账号" prop="guiderAccount">
        <el-input v-model="guiderform.guiderAccount" disabled maxlength="20" placeholder="请输入导游账户登录名"></el-input>
      </el-form-item>

      <el-form-item label="导游类型" prop="typeId">
        <el-select v-model="guiderform.typeId" :disabled="!on_edit" placeholder="请选择导游类型">
          <el-option v-for="item in guiderTypeList"  :label="item.guiderTypeName" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="导游姓名" prop="guiderName">
        <el-input v-model="guiderform.guiderName" :disabled="!on_edit"  maxlength="20" placeholder="请输入导游姓名"></el-input>
      </el-form-item>

      <el-form-item label="导游电话" prop="guiderPhone">
        <el-input v-model="guiderform.guiderPhone" :disabled="!on_edit"  maxlength="20" placeholder="请输入导游电话"></el-input>
      </el-form-item>

      <el-form-item label="导游QQ" prop="guiderQq">
        <el-input v-model="guiderform.guiderQq" :disabled="!on_edit"  maxlength="20" placeholder="请输入导游QQ号码"></el-input>
      </el-form-item>

      <el-form-item label="导游微信" prop="guiderWechat">
        <el-input v-model="guiderform.guiderWechat" :disabled="!on_edit"  maxlength="20" placeholder="请输入导游微信号码"></el-input>
      </el-form-item>

      <el-form-item label="审核状态" prop="guiderState">
        <el-select v-model="guiderform.guiderState" :disabled="!on_edit">
          <el-option :value="1" label="已审核"></el-option>
          <el-option :value="0" label="未审核"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="创建时间" prop="guiderCreateTime">
        <el-input v-model="guiderform.guiderCreateTime" disabled  placeholder="导游账户创建时间"></el-input>
      </el-form-item>

      <el-form-item label="导游备注" prop="guiderRemark" style="width: 60vw;">
        <el-input v-model="guiderform.guiderRemark"  :disabled="!on_edit" type="textarea" maxlength="200" placeholder="可输入导游备注"></el-input>
      </el-form-item>
      <el-form-item label="个人照片" prop="images" style="width: 80%;">
        <upload-images v-model="guiderform.images" :value="guiderform.images" :res-type="5"></upload-images>
      </el-form-item>
      <el-form-item style="width: 80%;display: flex;flex-direction: row;justify-content: flex-start;margin: 15px;">
        <el-button v-if="!on_edit&&$_has('GUIDERUPDATE')" type="warning" @click="on_edit=true">修改导游信息</el-button>
        <el-button v-if="!on_edit&&$_has('GUIDERUPDATE')" type="danger" @click="changePassword=true">修改密码</el-button>
        <el-button v-if="on_edit" type="primary" @click="cancelSubmit">取消修改</el-button>
        <el-button v-if="on_edit&&$_has('GUIDERUPDATE')" type="success" @click="submitForm('mform')">保存修改</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
    import {getGuiderType,getGuiderInfo,editGuider,changeGuidePassword} from "@/api/guide";
    import UploadImages from "@/views/com/uploadImages"
    export default {
        name: "addNewDis",
        data() {
            return {
                changePassword:false,
                on_edit:false,
                mpassword:'',
                guiderform:{
                    id:'',
                    typeId:'',
                    guiderAccount:'',
                    guiderPwd:'',
                    guiderName:'',
                    guiderTel:'',
                    guiderPhone:'',
                    guiderQq:'',
                    guiderWechat:'',
                    guiderState:'',
                    guiderCreateTime:'',
                    guiderRemark:'',
                    images:'',
                } ,
                guiderTypeList:[],
                rules: {
                    guiderAccount: [{required: true, message: '必须输入账户名', trigger: 'blur'},
                        {min: 2, max: 12, message: '账户名长度在2-12个字符', trigger: 'blur'}
                    ],
                    guiderName: [
                        {required: true, message: '必须输入导游名称', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            this.getGuiderInfo()
            this.getGuiderTypeList()
        },
        components:{UploadImages},
        methods: {
            savePassword:function(id,password){
                changeGuidePassword(id,password).then(res=>{
                    this.$message({
                        type:'success',
                        message:'修改密码成功'
                    })
                    this.changePassword=false
                }).catch(error=>{
                    this.changePassword=false
                })
            },
            rollback:function(){
                this.$router.back();
            },
            cancelSubmit:function(){
              this.getGuiderInfo();
              this.on_edit=false;
            },
            getGuiderInfo: function () {
                getGuiderInfo(this.$route.query.id).then(res => {
                    this.guiderform=res
                }).catch(error => {

                })
            },
            getGuiderTypeList() {
                getGuiderType().then(res => {
                    this.guiderTypeList = res
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        editGuider(this.guiderform).then(res => {
                            this.$message({type: 'success', message: '修改成功'})
                            this.on_edit=false;
                        }).catch(error => {
                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped  >
  .el-input {
    width: 22vw;
    margin-right: 4vw;
  }
  /deep/.el-input.is-disabled .el-input__inner,.el-textarea.is-disabled .el-textarea__inner,.el-checkbox__input.is-disabled+.el-checkbox__label{
    color: #1f2d3d;
  }
  .el-select {
    width: 22vw;
    margin-right: 4vw;
  }
  .demo-ruleForm {
    padding: 0 5vw 0 5vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }

</style>
