<template>
  <div class="app-container">
    <el-form :model="Disform" ref="mform" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="供应商名称" prop="supName">
        <el-input v-model="Disform.supName" placeholder="请输入供应商公司名" />
      </el-form-item>
      <el-form-item label="供应商类型" prop="roleId">
        <el-select v-model="Disform.roleId" placeholder="请选择供应商角色类型">
          <el-option v-for="item in disType" :key="item.id" :label="item.roleName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="公司名称" prop="supTel">
        <el-input v-model="Disform.supCompany" placeholder="建议输入公司名称" />
      </el-form-item>
      <el-form-item label="公司电话" prop="supTel">
        <el-input v-model="Disform.supTel" placeholder="建议输入公司座机" />
      </el-form-item>
      <el-form-item label="联系地址" prop="supAddress">
        <el-input v-model="Disform.supAddress" placeholder="请输入联系地址" />
      </el-form-item>

      <el-form-item label="供应商省份" prop="supProvince" style="width: 70%;">
        <v-distpicker :province="Disform.supProvince" :city="Disform.supCity" hide-area @selected="onSelected"/>
      </el-form-item>

      <el-form-item label="联系人" prop="supContactor">
        <el-input v-model="Disform.supContactor" placeholder="请输入供应商联系人" />
      </el-form-item>
      <el-form-item label="联系人手机号" prop="supPhone">
        <el-input v-model="Disform.supPhone" placeholder="请输入联系人手机号" />
      </el-form-item>
      <el-form-item label="传真号码" prop="supFax">
        <el-input v-model="Disform.supFax" placeholder="请输入传真号" />
      </el-form-item>
      <el-form-item label="QQ号码" prop="supQq">
        <el-input v-model="Disform.supQq" placeholder="请输入供应商QQ号码" />
      </el-form-item>
      <el-form-item label="电子邮箱" prop="supEmail">
        <el-input v-model="Disform.supEmail" placeholder="请输入供应商电子邮箱" />
      </el-form-item>
      <el-form-item label="微信号码" prop="supWechat">
        <el-input v-model="Disform.supWechat" placeholder="请输入供应商微信号" />
      </el-form-item>

      <div style="width:100vw;display: flex;flex-direction: row;justify-content: flex-start;align-items: center" />
      <el-form-item style="width: 80%;display: flex;flex-direction: row;justify-content: flex-start;margin: 15px;">
        <el-button type="primary" @click="submitForm('mform')">创建供应商</el-button>
        <el-button @click="resetForm('mform')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { getSupType, addSupInfo } from '@/api/support'
export default {
  name: 'AddNewSup',
  data() {
    return {
      Disform: {
        roleId: '',
        supNumber: '',
        supName: '',
        supProvince: '',
        supCity: '',
        supContactor: '',
        supTel: '',
        supCompany: '',
        supFax: '',
        supPhone: '',
        supQq: '',
        supWechat: '',
        supAddress: '',
        supRemark: '',
        supEmail: ''
      },
      rules: {
        supAddress: [{ required: true, message: '必须输入联系地址', trigger: 'blur' }],
        supName: [{ required: true, message: '必须输入公司名', trigger: 'blur' }],
        roleId: [{ required: true, message: '必须输入选择供应商类型', trigger: 'blur' }],
        supContactor: [{ required: true, message: '必须输入供应商联系人', trigger: 'blur' }],
        supEmail: [{ type: 'email', message: '必须为邮箱格式', trigger: 'blur' }]
      },
      disType: []
    }
  },
  created() {
    this.getDisTypeList()
  },
  methods: {
    onSelected: function (data) {
      this.Disform.supCity =  data.city.value
      this.Disform.supProvince = data.province.value
    },
    getDisTypeList() {
      getSupType().then(res => {
        this.disType = res.data
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addSupInfo(this.Disform).then(res => {
            if(res.re===1){
              this.$message({ type: 'success', message: '保存成功' })
              this.$router.back()
            }else{
              this.$message({type: 'error', message: res.data})
            }

          }).catch(error => {})
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  .el-input {
    width: 22vw;
    margin-right: 4vw;
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
