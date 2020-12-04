<template>
  <div class="app-container">

    <el-dialog v-dialog-drag  :visible.sync="v_disInfo" title="供应商资料详情">
      <div class="form_info">
        <div class="form_item">
          <label>供应商名</label>
          <el-input :readonly="true" v-model="supInfoForm.supName"/>
        </div>
        <div class="form_item">
          <label>供应商类型</label>
          <el-select :disabled="!on_edit" clearable placeholder="请选择分销商类型" v-model="supInfoForm.roleId">
            <el-option
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
              v-for="item in supTypeList"
            />
          </el-select>
        </div>
        <div class="form_item">
          <label>联系人</label>
          <el-input :readonly="!on_edit" v-model="supInfoForm.supContactor"/>
        </div>
        <div class="form_item">
          <label>联系电话</label>
          <el-input :readonly="!on_edit" v-model="supInfoForm.supPhone"/>
        </div>
        <div class="form_item">
          <label>所在地区</label>
          <v-distpicker :city="supInfoForm.supCity" :disabled="!on_edit" :province="supInfoForm.supProvince" @selected="onSelected"
                        hide-area/>
        </div>
      </div>
      <div
        style="font-weight: bold;font-size: 19px;color: gray;width: 100%;border-top: 1px solid gray;padding: 15px 0 15px 0"
      >
        其他信息
      </div>
      <div class="form_info">

        <div class="form_item">
          <label>传真号码</label>
          <el-input :readonly="!on_edit" v-model="supInfoForm.supFax"/>
        </div>

        <div class="form_item">
          <label>手机号码</label>
          <el-input :readonly="!on_edit" v-model="supInfoForm.supPhone"/>
        </div>

        <div class="form_item">
          <label>QQ号码</label>
          <el-input :readonly="!on_edit" v-model="supInfoForm.supQq"/>
        </div>

        <div class="form_item">
          <label>微信号码</label>
          <el-input :readonly="!on_edit" v-model="supInfoForm.supWechat"/>
        </div>
        <div class="form_item">
          <label>电子邮箱</label>
          <el-input :readonly="!on_edit" v-model="supInfoForm.supEmail"/>
        </div>


        <div class="form_item">
          <label>联系地址</label>
          <el-input :readonly="!on_edit" v-model="supInfoForm.supAddress"/>
        </div>

      </div>

      <span class="dialog-footer" slot="footer">
        <el-button @click="on_edit=true" type="primary" v-if="!on_edit">修改供应商信息</el-button>
        <el-button @click="updateSupInfo" type="primary" v-if="on_edit">保存</el-button>
        <el-button @click="on_edit=false;v_disInfo=false" type="warning" v-if="on_edit">取消</el-button>
      </span>

      <el-dialog
        v-dialog-drag
        :visible.sync="v_changePassword"
        append-to-body
        title="修改密码"
        width="60%"
      >
        <el-input :maxlength="20" placeholder="请输入新密码 (至少6位)" v-model="supInfoForm.mpassword"/>
        <span class="dialog-footer" slot="footer">
          <el-button
            @click="savePassword(supInfoForm.id,dsupInfoForm.mpassword)"
            type="primary"
          >保存</el-button>
          <el-button
            @click="supInfoForm.password='';v_changePassword=false"
            type="warning"
          >取消</el-button>
        </span>
      </el-dialog>
    </el-dialog>
    <div class="filter-container">
      <div class="filter-item">
        <label>供应商名称</label>
        <el-input v-model="preQuery.supName"/>
      </div>
      <div class="filter-item">
        <label>供应商类型</label>
        <el-select clearable placeholder="请选择供应商类型" v-model="allQuery.roleId">
          <el-option
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
            v-for="item in supTypeList"

          ></el-option>
        </el-select>
      </div>
      <div class="filter-item">
        <label>联系人</label>
        <el-input v-model="preQuery.supContactor"/>
      </div>
      <div class="filter-item">
        <label>省份</label>
        <el-select clearable placeholder="请选择省份" v-model="allQuery.supProvince">
          <el-option :key="item" :label="item" :value="item" v-for="item of provinceList"/>
        </el-select>
      </div>
      <div class="filter-item">
        <label>市区</label>
        <el-select clearable placeholder="请选择城市" v-model="allQuery.supCity">
          <el-option :key="item" :label="item" :value="item" v-for="item of cityList"/>
        </el-select>
      </div>
      <div class="filter-item">
        <label>地址</label>
        <el-input v-model="preQuery.supAddress"/>
      </div>
      <el-button @click="preQuery={};allQuery={}" icon="el-icon-circle-close" type="warning">重置</el-button>
    </div>

    <div class="component-item" style="margin-bottom: 5px;">
      <el-button @click="addNewSup" icon="el-icon-circle-plus-outline" type="primary">
        新增供应商
      </el-button>
    </div>
    <el-table
      :data="tableList"
      border
      fit
      highlight-current-row
      stripe
    >
      <el-table-column
        min-width="25"
        type="selection"
      />
      <el-table-column align="center" label="供应商名称" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.supName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="供应商类型" min-width="60">
        <template slot-scope="scope">
          <el-tag>
            {{ supTypeList.find(item=>(item.id===scope.row.roleId)).roleName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系人" min-width="45">
        <template slot-scope="scope">
          {{scope.row.supContactor}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系电话" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.supPhone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="95">
        <template slot-scope="scope">
          <el-button type="text">短信</el-button>
          <el-button @click="v_disInfo=true;supInfoForm=list.find(item=>(item.id===scope.row.id))" type="text">详情
          </el-button>
          <el-button type="text">账目</el-button>
          <el-button @click="deleteDis(scope.row.id)" style="color: red" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="list.length"
      background
      layout="prev, pager, next"
      style="margin-top: 15px;"
    />
  </div>
</template>

<script>
    import {delSupInfo, editSupInfo, getSupInfo, getSupType} from '@/api/support';

    export default {
        name: 'SupList',
        data() {
            return {
                v_changePassword: false,
                on_edit: false,
                supInfoForm: {
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
                v_disInfo: false,
                supTypeList: [],
                list: [],
                currentPage: 1,
                pageSize: 10,
                preQuery: {
                    supName: '',
                    supNumber: '',
                    supContactor: '',
                    supAddress: ''
                },
                allQuery: {
                    roleId: '',
                    supProvince: '',
                    supCity: '',
                    supState: ''
                }
            }
        },
        created() {
            this.getList();
            this.getTypeList();
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
                return tlist.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize).reverse();
            },
            provinceList() {
                return Array.from(new Set(this.list.map(item => item.supProvince)));
            },
            cityList() {
                return Array.from(new Set(this.list.map(item => item.supCity)));
            }
        },
        methods: {
            onSelected: function (data) {
                this.supInfoForm.supCity = data.city.value
                this.supInfoForm.supProvince = data.province.value
            },
            addNewSup: function () {
                this.$router.push('addNewSup')
            },
            getList: function () {
                getSupInfo().then(res => {
                    this.list = res.data
                }).catch(error => {
                })
            },
            getTypeList: function () {
                getSupType().then(res => {
                    this.supTypeList = res.data
                }).catch(error => {
                })
            },
            updateSupInfo: function () {
                editSupInfo(this.supInfoForm).then(res => {
                  if(res.re===1){
                    this.$message({
                      type: 'success',
                      message: '保存成功'
                    })
                  }else{
                    this.$message({type: 'error', message: res.data})
                  }
                    this.getList();
                    this.v_disInfo = false
                }).catch(error => {
                })
            },
            deleteDis: function (id) {
                this.$confirm('删除操作不可撤销，是否继续', '警告', {confirmButtonText: '确定', cancelButtonText: '取消'}).then(() => {
                    delSupInfo(id).then(res => {
                      if(res.re===1){
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                          }
                        )
                      }else{
                        this.$message({type: 'error', message: res.data})
                      }

                      this.getList();
                    }).catch(error => {
                        this.getList();
                    })
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
