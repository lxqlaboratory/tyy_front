<template>
  <div class="app-container">
    <el-form :model="Disform" :rules="rules" class="demo-ruleForm" label-width="100px" ref="mform">
      <el-form-item label="分销商账号" prop="disNumber">
        <el-input maxlength="20" placeholder="请输入分销商账户登录名" v-model="Disform.disNumber"></el-input>
      </el-form-item>
      <el-form-item label="分销商密码" prop="disPwd">
        <el-input placeholder="请输入分销商初始密码(默认6个1)" v-model="Disform.disPwd"></el-input>
      </el-form-item>
      <el-form-item label="分销商名" prop="disName">
        <el-input placeholder="请输入分销商公司名" v-model="Disform.disName"></el-input>
      </el-form-item>
      <el-form-item label="审核状态" prop="disState">
        <el-select placeholder="请选择分销商审核状态" v-model="Disform.disState">
          <el-option :value="1" label="已审核"></el-option>
          <el-option :value="0" label="未审核"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分销商类型" prop="roleId">
        <el-select :value="typeName" clearable v-model="typeName"@change="setTow">
          <el-option :key="item" :label="item" :value="item" v-for="item in typeList"></el-option>
        </el-select>
        <el-select placeholder="请选择分销商角色类型" v-model="Disform.roleId" style="margin-left: 5px">
          <el-option :key="item.id" :label="item.roleName" :value="item.id" v-for="item in disTypes">
          </el-option>
        </el-select>
      </el-form-item>



      <!--<el-form-item label="公司电话" prop="disTel">-->
        <!--<el-input placeholder="建议输入公司座机" v-model="Disform.disTel"></el-input>-->
      <!--</el-form-item>-->


      <el-form-item label="联系人" prop="disContactor">
        <el-input placeholder="请输入分销商联系人" v-model="Disform.disContactor"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机号" prop="disPhone">
        <el-input placeholder="请输入联系人手机号" v-model="Disform.disPhone"></el-input>
      </el-form-item>
      <!--<el-form-item label="传真号码" prop="disFax">-->
        <!--<el-input placeholder="请输入传真号" v-model="Disform.disFax"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="QQ号码" prop="disQq">
        <el-input placeholder="请输入分销商QQ号码" v-model="Disform.disQq"></el-input>
      </el-form-item>
      <!--<el-form-item label="电子邮箱" prop="disEmail">-->
        <!--<el-input placeholder="请输入分销商电子邮箱" v-model="Disform.disEmail"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="微信号码" prop="disWechat">-->
        <!--<el-input placeholder="请输入分销商微信号" v-model="Disform.disWechat"></el-input>-->
      <!--</el-form-item>-->


      <div style="width:100vw;display: flex;flex-direction: row;justify-content: flex-start;align-items: center">

        <el-form-item label="启用信用额度">
          <el-checkbox v-model="Disform.disAmountFlag"></el-checkbox>
        </el-form-item>
        <el-form-item label="信用额度">
<!--          <el-input placeholder="请输入分销商最大欠款额度(单位：元)" v-model="Disform.disAmount"></el-input>-->
          <price-input v-model="Disform.disAmount"placeholder="请输入分销商账户额度(单位：元)"></price-input>
        </el-form-item>
      </div>
      <el-form-item label="备注" prop="disRemark" style="width: 65vw;">
        <el-input autosize maxlength="500" placeholder="可以为分销商加入备注" show-word-limit type="textarea"
                  v-model="Disform.disRemark"></el-input>
      </el-form-item>
      <div style="width: 80%">
        <el-form-item label="分销商图片">
          <upload-images :res-type="10"  v-model="Disform.images"></upload-images>
        </el-form-item>
      </div>


      <div style="width: 80%">
        <el-form-item label="分销商经纬度选取" >
          <select-map style="margin-left: 15px;" :latitude.sync="Disform.latitude" :longitude.sync="Disform.longitude"
                      :address.sync="Disform.disAddress" :province.sync="Disform.disProvince" :city.sync="Disform.disCity"></select-map>
          <span style="margin-left: 15px;">当前经纬度：{{Disform.longitude+" "}},{{" "+Disform.latitude}}</span>
        </el-form-item>

      </div>
      <el-form-item label="分销商省份" prop="disProvince" style="width: 70%;">
        <v-distpicker :city="Disform.disCity" :province="Disform.disProvince" @selected="onSelected"
                      hide-area></v-distpicker>
      </el-form-item>
      <el-form-item label="联系地址" prop="disAddress">
        <el-input placeholder="请输入联系地址" v-model="Disform.disAddress"></el-input>
      </el-form-item>


      <el-form-item style="width: 80%;display: flex;flex-direction: row;justify-content: flex-start;margin: 15px;">
        <el-button @click="submitForm('mform')" type="primary">创建分销商</el-button>
        <el-button @click="resetForm('mform')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import {addDisInfo, getDisType} from "@/api/distribute"
  import selectMap from "@/views/com/selectMap"
  import UploadImages from "@/views/com/uploadImages"
  import priceInput from '@/views/com/priceInput'
  import {distinct} from "@/utils/tools"


  export default {
    name: "addNewDis",
    data() {
      return {
        Disform: {
          roleId: '',
          disNumber: '',
          disPwd: '',
          disName: '',
          disProvince: '',
          disCity: '',
          disContactor: '',
          disTel: '',
          disFax: '',
          disPhone: '',
          disQq: '',
          disWechat: '',
          disAddress: '',
          disState: 1,
          disRemark: '',
          disEmail: '',
          disAmountFlag: false,
          disAmount: 5000,
          latitude:'',
          longitude:'',
          images:'[]'
        },
        rules: {
          disNumber: [{required: true, message: '必须输入账户名', trigger: 'blur'},
            {min: 4, max: 12, message: '账户名长度在4-12个字符', trigger: 'blur'}
          ],
          disPwd: [
            {required: true, message: '必须输入密码', trigger: 'blur'},
            {min: 6, max: 12, message: '密码长度在6-12个字符', trigger: 'blur'}
          ],
          disAddress: [{required: true, message: '必须输入联系地址', trigger: 'blur'}],
          disName: [{required: true, message: '必须输入公司名', trigger: 'blur'}],
          roleId: [{required: true, message: '必须输入选择分销商类型', trigger: 'blur'}],
          disContactor: [{required: true, message: '必须输入分销商联系人', trigger: 'blur'}],
          disEmail: [{type: 'email', message: '必须为邮箱格式', trigger: 'blur'}]
        },
        disType: [],
          typeList:[],
          typeName:'',
      }
    },
    computed: {
        disTypes: function () {
            if (this.typeName) {
                return this.disType.filter(item => (item.type === this.typeName))
            }
        }
    },
    components: {UploadImages, selectMap,priceInput},
    created() {
      this.getDisTypeList()
    },
    methods: {
        setTow(){
            this.Disform.roleId='';
        },
      onSelected: function (data) {
        console.log(data)
        this.Disform.disCity = data.city.value
        this.Disform.disProvince = data.province.value
      },
      getDisTypeList() {
        getDisType().then(res => {
          this.disType = res;
            this.typeList = distinct(this.disType, 'type')
        })
      },
      submitForm(formName) {
        console.log(this.Disform)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addDisInfo(this.Disform).then(res => {
              this.$message({type: 'success', message: '保存成功'})
              this.$router.back()
            }).catch(error => {
            })
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
