<template>
  <div class="app-container">
    <el-dialog :visible.sync="v_stamp" title="印章管理" v-dialog-drag :close-on-click-modal="false">
      <stamp-manager :dis-id="id_stamp" ></stamp-manager>
    </el-dialog>



    <el-dialog :visible.sync="v_disInfo" title="分销商资料详情" v-dialog-drag>
      <div class="form_info">
        <div class="form_item">
          <label>分销商账号</label>
          <el-input :readonly="true" v-model="disInfoForm.disNumber"></el-input>
        </div>
        <div class="form_item">
          <label>分销商名</label>
          <el-input :readonly="!on_edit" v-model="disInfoForm.disName"></el-input>
        </div>
        <div class="form_item">
          <label>分销商类型</label>
          <el-select :disabled="!on_edit" :value="disInfoForm.roleId" clearable placeholder="请选择分销商类型"
                     v-model="disInfoForm.roleId">
            <el-option
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
              v-for="item in disTypeList"
            ></el-option>
          </el-select>
        </div>
        <div class="form_item">
          <label>审核状态</label>
          <el-select :disabled="!on_edit" :value="disInfoForm.disState" clearable placeholder="请选择分销商状态"
                     v-model="disInfoForm.disState">
            <el-option
              :key="1"
              :value="1"
              label="已审核"
            ></el-option>
            <el-option
              :key="0"
              :value="0"
              label="未审核"
            ></el-option>
          </el-select>
        </div>


        <div class="form_item">
          <label>所在地区</label>
          <v-distpicker :city="disInfoForm.disCity" :disabled="!on_edit" :province="disInfoForm.disProvince"
                        @selected="onSelected"
                        hide-area/>
        </div>

        <div class="form_item">
          <label>联系电话</label>
          <el-input :readonly="!on_edit" v-model="disInfoForm.disTel"></el-input>
        </div>

        <div class="form_item">
          <label>分销商经营许可证</label>
          <el-input :readonly="!on_edit" v-model="disInfoForm.disLicense"></el-input>
        </div>


      </div>
      <div
        style="font-weight: bold;font-size: 19px;color: gray;width: 100%;border-top: 1px solid gray;padding: 15px 0 15px 0">
        其他信息
      </div>
      <div class="form_info">

        <div class="form_item">
          <label>传真号码</label>
          <el-input :readonly="!on_edit" v-model="disInfoForm.disFax"></el-input>
        </div>

        <div class="form_item">
          <label>手机号码</label>
          <el-input :readonly="!on_edit" v-model="disInfoForm.disPhone"></el-input>
        </div>

        <div class="form_item">
          <label>QQ号码</label>
          <el-input :readonly="!on_edit" v-model="disInfoForm.disQq"></el-input>
        </div>

        <div class="form_item">
          <label>微信号码</label>
          <el-input :readonly="!on_edit" v-model="disInfoForm.disWechat"></el-input>
        </div>
        <div class="form_item">
          <label>电子邮箱</label>
          <el-input :readonly="!on_edit" v-model="disInfoForm.disEmail"></el-input>
        </div>

        <div class="form_item">
          <label>联系人</label>
          <el-input :readonly="!on_edit" v-model="disInfoForm.disContactor"></el-input>
        </div>

        <div class="form_item">
          <label>联系地址</label>
          <el-input :readonly="!on_edit" v-model="disInfoForm.disAddress"></el-input>
        </div>
        <div class="form_item">
          <label>分销商地址</label>
          <select-map :latitude.sync="disInfoForm.latitude" :longitude.sync="disInfoForm.longitude"
                      style="margin-left: 15px;"></select-map>
          <span style="margin-left: 15px;">当前经纬度：{{disInfoForm.longitude+" "}},{{" "+disInfoForm.latitude}}</span>
        </div>

        <div class="form_item">
          <label>分销商图片</label>
          <upload-images :res-type="10" v-model="disInfoForm.images"></upload-images>
        </div>


      </div>

      <span class="dialog-footer" slot="footer">
        <el-button @click="v_changePassword=true" type="danger">修改密码</el-button>
        <el-button @click="updateDisInfo" type="primary">保存</el-button>

      </span>

      <el-dialog
        :visible.sync="v_changePassword"
        append-to-body
        title="修改密码"
        v-dialog-drag
        width="35vw">
        <el-input :maxlength="20" placeholder="请输入新密码 (至少6位)" v-model="supPassword"></el-input>
        <span class="dialog-footer" slot="footer">
          <el-button @click="savePassword(disInfoForm.id,supPassword)"
                     type="primary">保存</el-button>
          <el-button @click="supPassword='';v_changePassword=false"
                     type="warning">取消</el-button>
        </span>
      </el-dialog>
    </el-dialog>
    <div class="filter-container">
      <div class="filter-item">
        <label>分销商省份</label>
        <el-input style="margin-left: 15px; width: 300px" v-model="disInfoForm.province" maxlength="50"
                  placeholder="检索省份"></el-input>
      </div>
      <div class="filter-item">
        <label>分销商城市</label>
        <el-input style="margin-left: 15px; width: 300px" v-model="disInfoForm.city" maxlength="50"
                  placeholder="检索城市"></el-input>
      </div>
      <div class="filter-item">
        <label>分销商区(县)</label>
        <el-input style="margin-left: 15px; width: 300px" v-model="disInfoForm.region" maxlength="50"
                  placeholder="检索区域"></el-input>
      </div>
      <div class="filter-item">
        <label>分销商名称</label>
        <el-input style="margin-left: 15px; width: 300px" v-model="disInfoForm.unitName" maxlength="50"
                  placeholder="检索名称"></el-input>
      </div>
      <div class="filter-item">
        <el-button icon="el-icon-search" type="primary" style="width: 180px" @click="getList">查询</el-button>
      </div>
    </div>

    <!--<div class="component-item" style="margin-bottom: 5px;">-->
      <!--<el-button @click="addNewDis" icon="el-icon-circle-plus-outline" type="primary">-->
        <!--新增分销商-->
      <!--</el-button>-->
    <!--</div>-->


    <el-divider></el-divider>
    <el-table
      :data="list.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      stripe
      @row-click="clickRow"
      highlight-current-row>

      <el-table-column align="center" label="分销商" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.unitName }}
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="所属省" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.province }}
        </template>
      </el-table-column>
      <el-table-column width="200px"  align="center" label="所属市" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.city }}
        </template>
      </el-table-column>
      <el-table-column width="200px"  align="center" label="所属区" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.region }}
        </template>
      </el-table-column>



      <!--<el-table-column align="center" label="操作" min-width="45" prop="disTel">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button @click="selectDisBu(scope.row)" size="mini" type="primary">选择</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <div style="display: flex;align-items: center;justify-content: flex-start">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="list.length"
        background
        v-loading="onLoading"
        layout="prev, pager, next"
        style="margin-top: 15px;"/>

      <el-select style="margin-left:  5px;" v-model="pageSize">
        <el-option :value="10" label="10条/页"></el-option>
        <el-option :value="30" label="30条/页"></el-option>
        <el-option :value="50" label="50条/页"></el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
  import {blackDis, changePassword, delDisInfo, getDisList, getDisType, updateDisInfo,showDisList} from '@/api/distribute'
  import selectMap from "@/views/com/selectMap"
  import UploadImages from "@/views/com/uploadImages"
  import priceShow from '@/views/com/priceShow'
  import StampManager from "@/views/com/stampManager"


  export default {
    name: 'DisNewList',
    data() {
      return {
        id_stamp:0,
        v_stamp:false,
        supPassword: '',
        v_changePassword: false,
        on_edit: true,
        disInfoForm: {},
        v_disInfo: false,
        disTypeList: [],
        list: [],
        currentPage: 1,
        pageSize: 10,
        preQuery: {
          disName: '',
          disNumber: '',
          disContactor: '',
          disTel: ''
        },
        allQuery: {
          roleId: '',
          disProvince: '',
          disCity: '',
          disState: ''
        }
      }
    },
    created() {
      // if (this.$route.params.disName) {
      //   this.preQuery.disName = this.$route.params.disName
      // }
      this.getList()
      this.getTypeList()
    },
    components: {
      StampManager,
      selectMap,
      UploadImages,
        priceShow,
    },
    computed: {
      tableList() {
        let tlist = this.list.filter(item => {
          let itemResult = true
          for (let query in this.preQuery) {
            if (this.preQuery[query]) {
              itemResult &= (item[query].indexOf(this.preQuery[query]) >= 0)
            }

          }
          for (let query in this.allQuery) {
            if (this.allQuery[query]) {
              itemResult &= (item[query] == this.allQuery[query])
            }
          }
          return itemResult
        })
        return tlist.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize).reverse()
      },
      provinceList() {
        return Array.from(new Set(this.list.map(item => item.disProvince)))
      },
      cityList() {
        return Array.from(new Set(this.list.map(item => item.disCity)))
      }
    },
    methods: {
      openStamp:function(id){
        this.v_stamp=true
        this.id_stamp=id
      },
      toDisMoney: function (disItem) {
        this.$router.push({name: 'disMoney', query: {disName: disItem.disName}})
      },

      onSelected: function (data) {
        console.log(data)
        this.Disform.disCity = data.city.value
        this.Disform.disProvince = data.province.value
      },
      addNewDis: function () {
        this.$router.push('addNewDis')
      },
      updateDisInfo: function () {
        updateDisInfo(this.disInfoForm).then(res => {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.getList()
          this.v_disInfo = false
        }).catch(error => {
        })
      },
      savePassword: function (id, password) {
        if (!password || password.length < 6 || password.length > 20) {
          this.$message({
            type: 'error',
            message: '密码格式错误，请检查'
          })
          return
        }
        changePassword(id, password).then(res => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.getList()
          this.v_changePassword = false
        }).catch((error => {
          this.getList()
          this.v_changePassword = false
        }))
      },
      deleteDis: function (id) {
        this.$confirm('删除操作不可撤销，是否继续', '警告', {confirmButtonText: '确定', cancelButtonText: '取消'}).then(() => {
          delDisInfo(id).then(res => {
            this.$message({
                type: 'success',
                message: '删除成功'
              }
            )
            this.getList()
          }).catch(error => {
            this.getList()
          })
        })


      },
      getList: function () {
        // getDisList().then(res => {
        //   this.list = res
        // }).catch(error => {
        // })

        showDisList(this.disInfoForm).then(res => {
          this.list = res.data.WechatUnitList
          // this.orderForm.positionCodeA = res.data.positionCodeA
          // this.orderForm.workerId = res.data.workerId
          this.onLoading = false
        }).catch(error => {
          this.onLoading = false
        })
      },
      getTypeList: function () {
        // getDisType().then(res => {
        //   this.disTypeList = res
        // }).catch(error => {
        // })
      },
      openInfo(id) {
        this.v_disInfo = true
        let disInfoForm = this.list.find(item => (item.id === id))
        this.supPassword = ''
        this.disInfoForm = disInfoForm

      },
      blackDis(id, state) {
        blackDis(id, state).then(res => {
          this.getList()
          if (state === 1)
            this.$message({type: "warning", message: "设置赖账成功"})
          else
            this.$message({type: "success", message: "恢复赖账状态成功"})

        }).catch(error => {

        })

      }
    }
  }
</script>

<style scoped>
  el-input {
    color: black;
    background-color: #fff;
  }

</style>
