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
        <label>账户</label>
        <el-input v-model="preQuery.disNumber"></el-input>
      </div>
      <div class="filter-item">
        <label>分销商名</label>


        <el-input v-model="preQuery.disName"></el-input>
      </div>
      <div class="filter-item">
        <label>联系人</label>
        <el-input v-model="preQuery.disContactor"></el-input>
      </div>
      <div class="filter-item">
        <label>联系电话</label>
        <el-input v-model="preQuery.disTel"></el-input>
      </div>
      <div class="filter-item">
        <label>状态</label>
        <el-select clearable placeholder="请选择分销商状态" v-model="allQuery.disState">
          <el-option
            key="1"
            label="已审核"
            value="1"
          ></el-option>
          <el-option
            key="0"
            label="未审核"
            value="0"
          ></el-option>
        </el-select>
      </div>
      <div class="filter-item">
        <label>类型</label>
        <el-select clearable placeholder="请选择分销商类型" v-model="allQuery.roleId">
          <el-option
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
            v-for="item in disTypeList"

          ></el-option>
        </el-select>
      </div>
      <div class="filter-item">
        <label>省份</label>
        <el-select :value="allQuery.disProvince" clearable placeholder="请选择省份" v-model="allQuery.disProvince">
          <el-option :key="item" :label="item" :value="item" v-for="item of provinceList"></el-option>
        </el-select>
      </div>
      <div class="filter-item">
        <label>市区</label>
        <el-select :value="allQuery.disCity" clearable placeholder="请选择城市" v-model="allQuery.disCity">
          <el-option :key="item" :label="item" :value="item" v-for="item of cityList"></el-option>
        </el-select>
      </div>
      <el-button @click="preQuery={};allQuery={}" icon="el-icon-circle-close" type="warning">重置</el-button>
    </div>

    <div class="component-item" style="margin-bottom: 5px;">
      <el-button v-if="$_has('PAYUPDATE')" @click="addNewDis" icon="el-icon-circle-plus-outline" type="primary">
        新增分销商
      </el-button>
    </div>
    <el-table :data="tableList"
              border
              fit
              highlight-current-row
              stripe>
      <el-table-column align="center" label="分销商图集">
        <template slot-scope="scope">
          <el-popover placement="right" v-if="scope.row.imageList&&scope.row.imageList.length>0">
            <div slot="reference">
              <el-image :src="scope.row.imageList[0]" style="width: 100px;height: 50px;"
                        v-if="scope.row.imageList.length===1"></el-image>
              <el-button type="text" v-else>共{{scope.row.imageList.length}}张</el-button>
            </div>

            <div style="max-width: 85vw;max-height: 75vh">
              <el-image :src="item" style="width: 350px;height: 240px;margin: 25px;" :key="item"
                        v-for="item in scope.row.imageList"></el-image>
            </div>


          </el-popover>
          <span style="color:gray" v-else>未上传</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="分销商账号" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.disNumber }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="分销商名(联系人)" min-width="60">
        <template slot-scope="scope">
          {{ scope.row.disName+" " }} ({{scope.row.disContactor}})
        </template>
      </el-table-column>
      <el-table-column align="center" label="分销商类型" min-width="45">
        <template slot-scope="scope">
          <el-tag>
            {{ disTypeList.find(item=>(item.id===scope.row.roleId)).roleName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单数量" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.orderSum }}个
        </template>
      </el-table-column>
      <el-table-column align="center" label="累计收客" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.touNum }}人
        </template>
      </el-table-column>
      <el-table-column align="center" label="累计销售" min-width="45">
        <template slot-scope="scope">
          ¥&nbsp<price-show :price="scope.row.payNum"></price-show>
        </template>
      </el-table-column>

      <el-table-column align="center" label="联系电话" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.disTel }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="分销商状态" min-width="45">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.isBlack===1">赖账</el-tag>
          <el-tag type="success" v-if="scope.row.isBlack===0&&scope.row.disState===1">已审核</el-tag>
          <el-tag type="warning" v-if="scope.row.isBlack===0&&scope.row.disState===0">未审核</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="130">
        <template slot-scope="scope">

          <el-button @click="openInfo(scope.row.id)" type="text">详情</el-button>
          <el-button v-if="$_has('PAYINFO')" @click="toDisMoney(scope.row)" type="text">账目</el-button>
          <el-button v-if="$_has('DISUPDATE')" @click="deleteDis(scope.row.id)" style="color: red" type="text">删除</el-button>
          <el-button  @click="blackDis(scope.row.id,1)" style="color: black" type="text" v-if="scope.row.isBlack===0&&$_has('DISUPDATE')">
            设为赖账分销商
          </el-button>
          <el-button v-if="scope.row.isBlack===1&&$_has('DISUPDATE')"@click="blackDis(scope.row.id,0)" style="color: #66CDAA" type="text" >赖账状态恢复</el-button>
          <el-button v-if="$_has('DISUPDATE')" @click="openStamp(scope.row.id)" type="text" style="color: orangered">印章管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="list.length"
      background
      layout="prev, pager, next"
      style="margin-top: 15px;"/>
  </div>
</template>
<script>
  import {blackDis, changePassword, delDisInfo, getDisList, getDisType, updateDisInfo} from '@/api/distribute'
  import selectMap from "@/views/com/selectMap"
  import UploadImages from "@/views/com/uploadImages"
  import priceShow from '@/views/com/priceShow'
  import StampManager from "@/views/com/stampManager"

  export default {
    name: 'DisList',
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
      if (this.$route.params.disName) {
        this.preQuery.disName = this.$route.params.disName
      }
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
        getDisList().then(res => {
          this.list = res
        }).catch(error => {
        })
      },
      getTypeList: function () {
        getDisType().then(res => {
          this.disTypeList = res
        }).catch(error => {
        })
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
