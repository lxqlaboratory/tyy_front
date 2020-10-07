<template>
  <div class="app-container">
    <el-form :model="sysForm" ref="mform" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="系统名称" prop="sysName">
        <el-input v-model="sysForm.sysName"  maxlength="20" style="width: 37.5rem;" placeholder="请输入系统名称"></el-input>
      </el-form-item>
      <el-form-item label="公司名称" prop="sysCompany">
        <el-input v-model="sysForm.sysCompany"  style="width: 37.5rem;" maxlength="20" placeholder="请输入公司名称"></el-input>
      </el-form-item>
      <el-form-item label="热线电话" prop="sysTel">
        <el-input v-model="sysForm.sysTel"  style="width: 37.5rem;"  maxlength="20" placeholder="请输入公司热线电话"></el-input>
      </el-form-item>
      <el-form-item label="公司传真" prop="sysFax">
        <el-input v-model="sysForm.sysFax" style="width: 37.5rem;"  maxlength="20" placeholder="请输入公司传真"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="sysContact">
        <el-input v-model="sysForm.sysContact"  style="width: 37.5rem;" maxlength="20" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机号" prop="sysContact">
        <el-input v-model="sysForm.sysPhone" style="width: 37.5rem;"  maxlength="20" placeholder="请输入联系人手机号"></el-input>
      </el-form-item>
      <el-form-item label="电子邮件" prop="sysEmail">
        <el-input v-model="sysForm.sysEmail" style="width: 37.5rem;"  maxlength="20" placeholder="请输入邮箱地址"></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="sysQq">
        <el-input v-model="sysForm.sysQq" style="width: 37.5rem;"  maxlength="20" placeholder="请输入QQ号"></el-input>
      </el-form-item>
      <el-form-item label="微信" prop="sysWechat">
        <el-input v-model="sysForm.sysWechat" style="width: 37.5rem;"  maxlength="20" placeholder="请输入微信号"></el-input>
      </el-form-item>
      <el-form-item label="公司网址" prop="sysWeb">
        <el-input v-model="sysForm.sysWeb"  style="width: 37.5rem;" maxlength="20" placeholder="请输入公司网址"></el-input>
      </el-form-item>
      <el-form-item label="公司地址" prop="sysAddress">
        <el-input v-model="sysForm.sysAddress" style="width: 37.5rem;"  maxlength="20" placeholder="请输入公司地址"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="sysIntro" style="width: 60vw;">
        <el-input v-model="sysForm.sysIntro"  style="width: 37.5rem;" type="textarea" maxlength="200" placeholder="请输入公司简介"></el-input>
      </el-form-item>
      <el-form-item style="width: 80%;display: flex;flex-direction: row;justify-content: flex-start;margin: 15px;">
        <el-button v-if="$_has('SYSUPDATE')" type="success" :loading="onSave" @click="submitForm('mform')" aria-label=title>保存</el-button>
      </el-form-item>
    </el-form>
<!--    <stamp-manager  :dis-id="0"></stamp-manager>-->
  </div>
</template>

<script>
    import stampManager from "@/views/com/stampManager"
    import {getSysInfo,editSysInfo} from "@/api/systemApi"

    export default {
        name: "sysInfo",
        components:{stampManager},
        data() {
            return {
                onSave:false,
                sysForm:{
                    id:1,
                    sysName:'',
                    sysCompany:'',
                    sysTel:'',
                    sysFax:'',
                    sysPhone:'',
                    sysEmail:'',
                    sysQq:'',
                    sysContact:'',
                    sysAddress:'',
                    sysWeb:'',
                    sysIntro:'',
                    sysWechat:'',
                } ,
                rules: {
                    // carNumber: [{required: true, message: '必须输入车牌号', trigger: 'blur'},
                    //     {min: 4, max: 8, message: '车牌号长度为4-8', trigger: 'blur'}
                    // ],
                    // supId: [
                    //     {required: true, message: '必须选择所属供应商', trigger: 'blur'}
                    // ],
                    // carType: [
                    //     {required: true, message: '必须选择车辆类型', trigger: 'blur'}
                    // ],
                    // carDriver: [
                    //     {required: true, message: '必须输入司机姓名', trigger: 'blur'}
                    // ],
                    sysPhone: [
                        {required: true, min: 8, max: 12,message: '必须输入手机号码', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            this.getSysInfo()

        },
        methods: {
            rollback:function(){
                this.$router.back()
            },
            getSysInfo:function(){
                  getSysInfo().then(res=>{
                      this.sysForm=res
                  })
            },
            submitForm(formName) {
                this.onSave=true;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        editSysInfo(this.sysForm).then(res => {
                            this.$message({type: 'success', message: "编辑系统基本信息成功！"})
                            this.onSave=false
                        }).catch(error => {
                            this.onSave=false
                        })
                    } else {
                        this.onSave=false
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

  /deep/.el-input.is- .el-input__inner,.el-textarea.is- .el-textarea__inner,.el-checkbox__input.is-+.el-checkbox__label{
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
