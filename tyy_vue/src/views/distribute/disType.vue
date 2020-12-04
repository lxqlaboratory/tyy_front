<template>
  <div class="app-container">
    <div class="component-item" style="margin-bottom: 5px;">

      <el-button @click="v_addDisType=true;disTypeAddForm={}" icon="el-icon-circle-plus-outline" type="primary">
        新增分销商类型
      </el-button>


      <label style="margin-left:15px; ">选择地域类型</label>
      <el-select :value="typeName" clearable v-model="typeName">
        <el-option :key="item" :label="item" :value="item" v-for="item in typeList"></el-option>
      </el-select>
    </div>


    <el-dialog :visible.sync="v_addDisType" style="width: 100%;" title="新增分销商类型" v-dialog-drag>
      <el-form
        :model="disTypeAddForm"
        label-position="left"
        label-width="100px"
        style="width: 80%; margin-left:50px;">
        <el-form-item label="类型名(区)" prop="name">
          <el-input maxlength="20" style="width: 50%;" v-model="disTypeAddForm.roleName"/>
        </el-form-item>


        <el-form-item label="地域名" prop="name">
          <div>
            <el-switch
              active-text="新增地域"
              inactive-text="选择地域"
              v-model="isAddNewType">
            </el-switch>
          </div>
          <el-input placeholder="请输入新的地域类型" style="width: 50%;" v-if="isAddNewType"
                    v-model="disTypeAddForm.type"></el-input>
          <el-select :value="disTypeAddForm.type" clearable placeholder="请选择地域类型" style="width: 50%;"
                     v-else v-model="disTypeAddForm.type">
            <el-option :key="item" :label="item" :value="item" v-for="item in typeList"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="类型备注" prop="name">
          <el-input maxlength="50" style="width: 50%;" v-model="disTypeAddForm.roleDes"/>
        </el-form-item>
        <el-form-item label="序号" prop="name">
          <el-input style="width: 50%;" type="number" v-model="disTypeAddForm.roleOrder"/>
        </el-form-item>
      </el-form>

      <div class="dialog-footer" slot="footer">
        <el-button @click="v_addDisType = false">取消</el-button>
        <el-button :loading="isOnAdd" @click="addNewDisType" type="primary">增加</el-button>
      </div>

    </el-dialog>

    <el-dialog :visible.sync="v_editDisType" style="width: 100%;" title="编辑分销商类型" v-dialog-drag>
      <el-form
        :model="disTypeEditForm"
        label-position="left"
        label-width="100px"
        style="width: 80%; margin-left:50px;">
        <el-form-item label="类型名（区）" prop="name">
          <el-input maxlength="20" style="width: 50%;" v-model="disTypeEditForm.roleName"/>
        </el-form-item>


        <el-form-item label="地域名" prop="type" required>
          <div>
            <el-switch
              active-text="新增地域"
              inactive-text="选择地域"
              v-model="isEditNewType">
            </el-switch>
          </div>
          <el-input placeholder="请输入新的地域类型" style="width: 50%;" v-if="isEditNewType"
                    v-model="disTypeEditForm.type"></el-input>
          <el-select :value="disTypeEditForm.type" clearable placeholder="请选择地域类型" style="width: 50%;"
                     v-else v-model="disTypeEditForm.type">
            <el-option :key="item" :label="item" :value="item" v-for="item in typeList"></el-option>
          </el-select>


        </el-form-item>


        <el-form-item label="类型备注" prop="name">
          <el-input maxlength="50" style="width: 50%;" v-model="disTypeEditForm.roleDes"/>
        </el-form-item>
        <el-form-item label="序号" prop="name">
          <el-input style="width: 50%;" type="number" v-model="disTypeEditForm.roleOrder"/>
        </el-form-item>
      </el-form>

      <div class="dialog-footer" slot="footer">
        <el-button @click="v_editDisType = false;getList()">取消</el-button>
        <el-button @click="ediDisType" type="primary">保存</el-button>
      </div>
    </el-dialog>


    <el-table
      :data="tableList"
      border
      fit
      highlight-current-row
      stripe
    >

      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table
            :data="getAddTypeList(scope.row)"
            highlight-current-row
          >
            <el-table-column align="center" label="排序序号" min-width="45">
              <template slot-scope="scope">
                {{ scope.row.roleOrder }}
              </template>
            </el-table-column>


            <el-table-column align="center" label="分销商类型名" min-width="95">
              <template slot-scope="scope">
                {{ scope.row.roleName }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="类型描述" min-width="95">
              <template slot-scope="scope">
                {{ scope.row.roleDes }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" min-width="95">
              <template slot-scope="scope">
                {{ scope.row.roleCreateTime }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="150">
              <template slot-scope="scope">
                <el-button @click="v_editDisType=true;disTypeEditForm=list.find(item=>(item.id===scope.row.id))" icon="el-icon-edit" size="small"
                           type="primary">编辑
                </el-button>
                <el-button  @click="deleteDisType(scope.row.id)" icon="el-icon-delete" size="small" type="danger">删除
                </el-button>
              </template>
            </el-table-column>

          </el-table>
        </template>
      </el-table-column>

      <el-table-column align="center" label="地域名" min-width="95">
        <template slot-scope="scope">
          {{scope.row}}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="tableList.length"
      background
      layout="prev, pager, next"
      style="margin-top: 15px;"/>
  </div>
</template>

<script>
  import {addDisType, deleteType, editDisType, getDisType} from '@/api/distribute'
  import {distinct} from "@/utils/tools"

  export default {
    name: 'DisType',
    data() {
      return {
        //一级类型，指地域

        //很蠢，增加分销商类型的时候，是否是直接增加呢？
        isAddNewType: false,

        //同上，修改时，直接增加不？
        isEditNewType: false,

        typeList: [],

        typeName: '',

        disTypeAddForm: {},
        disTypeEditForm: {},
        v_addDisType: false,
        v_editDisType: false,
        list: [],
        currentPage: 1,
        pageSize: 10,
        isOnAdd: false
      }
    },
    created() {
      this.getList()
    },
    watch: {
      tableList(val) {
        this.currentPage = 0
      }
    },
    computed: {
      tableList: function () {

        let array = distinct(this.list, 'type')
        if (this.typeName) {
          array = array.filter(item => (item === this.typeName))
        }
        return array
      }
    },
    methods: {
      getAddTypeList(typeName) {
        return this.list.filter(item => (item.type === typeName))
      },


      getList: function () {
        getDisType().then(res => {
          this.list = res.data
          this.typeList = distinct(this.list, 'type')
        }).catch(error => {
        })
      },
      addNewDisType: function () {
        this.isOnAdd = true
        addDisType(this.disTypeAddForm).then(res => {
          if(res.re===1){
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          }else{
            this.$message({type: 'error', message: res.data})
          }

          this.isOnAdd = false
          this.v_addDisType = false
          this.getList()
        }).catch(error => {
          this.isOnAdd = false
        })
      },
      ediDisType: function () {
        editDisType(this.disTypeEditForm).then(res => {
          if(res.re===1){
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          }else{
            this.$message({type: 'error', message: res.data})
          }

          this.v_editDisType = false
          this.getList()
        }).catch(error => {

          this.v_editDisType = false
        })
      },
      deleteDisType: function (id) {
        this.$confirm('此操作不可撤销，是否继续？', '提示', {confirmButtonText: '确定', cancelButtonText: '取消'}).then(() => {
          deleteType(id).then(res => {
            if(res.re===1){
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            }else{
              this.$message({type: 'error', message: res.data})
            }

            this.getList()

          }).catch(error => {
            this.getList()
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
