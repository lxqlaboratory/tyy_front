<template>
  <div class="app-container">
    <div class="component-item" style="margin-bottom: 5px;">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="v_addType=true;TypeAddForm={};">
        新增产品服务类别
      </el-button>
    </div>
    <el-dialog v-dialog-drag  :visible.sync="v_addType" title="产品服务类别编辑">
      <el-form :model="TypeAddForm" ref="mform" label-width="100px">
        <el-form-item label="服务类型名" required>
          <el-input v-model="TypeAddForm.serviceName" placeholder="请输入服务类型名"/>
        </el-form-item>

        <el-form-item label="类型排序号" required>
          <el-input type="number" v-model.number="TypeAddForm.serviceOrder" placeholder="请输入顺序号码"/>
        </el-form-item>
        <el-form-item style="width: 80%;display: flex;flex-direction: row;justify-content: flex-start;margin: 15px;">
          <el-button type="primary" @click="submitForm('mform')">保存服务类型</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

    <el-table
      :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border
      fit
      highlight-current-row
      stripe
    >
      <el-table-column align="center" label="服务类别名称" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.serviceName }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="添加时间" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.serviceCreatetime }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="排序号" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.serviceOrder }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="45">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit"
                     @click="v_addType=true;TypeAddForm=list.find(item=>(item.id===scope.row.id))">编辑
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deletetype(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>


    <el-pagination
      :current-page.sync="currentPage"
      :total="list.length"
      :page-size="pageSize"
      style="margin-top: 15px;"
      background
      layout="prev, pager, next"/>
  </div>
</template>

<script>
    import {delproService, addSerType, editSerType, getSerTypes} from '@/api/production'

    export default {
        name: "proServiceList",
        data() {
            return {
                v_addType: false,
                TypeAddForm: {},
                list: [],
                currentPage: 1,
                pageSize: 10,
                isOnAdd: false
            }
        },
        created() {
            this.getSerTypes()
        },
        methods: {
            getSerTypes() {
                getSerTypes().then(res => {
                    this.list = res
                }).catch(error => {
                })
            },
            submitForm: function (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.TypeAddForm.id) {
                            editSerType(this.TypeAddForm).then(res => {
                                this.$message({type: 'success', message: '保存成功'})
                                this.v_addType=false
                                this.getSerTypes()
                            }).catch(error => {
                            })
                        } else {
                            addSerType(this.TypeAddForm).then(res => {
                                this.$message({type: 'success', message: '保存成功'})
                                this.v_addType=false
                                this.getSerTypes()
                            }).catch(error => {
                            })
                        }
                    } else {

                        return false
                    }
                })
            },
            deletetype: function (id) {
                console.log("why")
                this.$confirm('此操作不可撤销，是否继续？', '提示', {confirmButtonText: '确定', cancelButtonText: '取消'}).then(() => {
                    delproService(id).then(res => {
                        this.getSerTypes();
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                    }).catch(error => {
                        this.getSerTypes();
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>
