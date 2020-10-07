<template>
  <div class="app-container">
    <el-dialog v-dialog-drag  title="增加资源分类" :visible.sync="v_dialog_addResourceType">
      <el-form
        :model="resourceTypeForm"
        label-position="left"
        label-width="100px"
        style="width: 80%; margin-left:50px;">
        <el-form-item label="类型名" prop="name">
          <el-input v-model="resourceTypeForm.typeName" style="width: 50%;" maxlength="20"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="v_dialog_addResourceType = false">取消</el-button>
        <el-button type="primary" @click="addResType" :loading="isOnAdd">增加</el-button>
      </div>
    </el-dialog>
    <div class="filter-container">
      <div class="filter-item">
        <label>资源分类</label>
        <el-select ref="resType" v-model="queryForm.resType" :value="queryForm.resType" style="width: 300px;"
                   placeholder="请选择资源类型" clearable>
          <el-option v-for="item in resTypeList" :key="item.id" :value="item.id"
                     :label="item.typeName"></el-option>
        </el-select>
      </div>
      <div class="filter-item">
        <label>资源名称</label>
        <el-input style="margin-left: 15px; width: 300px" v-model="queryForm.fileName" maxlength="50"
                  placeholder="请检索资源名称"></el-input>
      </div>

      <div class="filter-item">
        <el-button icon="el-icon-search" type="primary" @click="getList">查询</el-button>
      </div>


    </div>
    <div
      style="display: flex;flex-direction: row;margin-left: 90px;width: 200px;justify-content: center;align-items: center;">
      <el-button size="mini" type="danger" style="width: 100%;" icon="el-icon-delete"
                 @click="delResType(queryForm.resType)">删除该类型
      </el-button>
      <el-button size="mini" type="primary" style="width: 100%;" icon="el-icon-circle-plus-outline"
                 @click="v_dialog_addResourceType=true;resourceTypeForm={};">增加新类型
      </el-button>
    </div>
    <el-table
      style="margin-top: 15px;"
      :data="list"
      border
      fit
      highlight-current-row
      stripe
      v-loading="onLoading"
    >

      <el-table-column align="center" label="资源编号" min-width="25">
        <template slot-scope="scope">
          {{ scope.row.rId }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="原始文件名" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.fname }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="文件大小" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.fSize }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="资源类别" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.serType}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="保存时间" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" min-width="80">
        <template slot-scope="scope">
          <el-button type="success" @click="download(scope.row.url,scope.row.fname)">下载</el-button>
          <el-button type="danger" @click="delResource(scope.row.rId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page.sync="queryForm.pageNum"
      :total="total"
      :page-size="queryForm.pageSize"
      @current-change="getList"
      style="margin-top: 15px;"
      background
      layout="prev, pager, next"/>

  </div>
</template>

<script>
    import {getResourceTypeList, addResourceType, delResourceType, getResourceList, delResource} from "@/api/resource";

    export default {
        name: "videoResource",
        data() {
            return {
                onLoading: true,
                list: [],
                total: 0,
                resTypeList: [],

                isOnAdd: false,
                v_dialog_addResourceType: false,
                resourceTypeForm: {
                    typeName: ''
                },
                queryForm: {
                    superType: 'DOC',
                    fileName: '',
                    resType: '',
                    pageNum: 1,
                    pageSorted: 'desc',
                    pageSize: 10
                }
            }
        },
        created() {
            this.getTypeList()
            this.getList()
        },
        methods: {
            download(href,name){
                let a = document.createElement('a')
                a.href =href
                a.download=name
                a.click()
            },
            delResource(id) {
                this.$confirm('此操作不可撤销,是否继续', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    delResource(id).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.getList()
                    }).catch(error => {
                        this.getList()
                    })
                })
            },
            getList() {
                getResourceList(this.queryForm).then(res => {
                    this.list = res.list
                    this.total = res.pagination.total
                    this.onLoading = false
                }).catch(error => {
                    this.onLoading = false
                })
            },
            getTypeList() {
                getResourceTypeList(this.queryForm.superType).then(res => {
                    this.resTypeList = res
                }).catch(error => {
                })
            },
            addResType() {
                this.isOnAdd = true
                addResourceType(this.queryForm.superType, this.resourceTypeForm.typeName).then(res => {
                    this.$message({
                        type: 'success',
                        message: '保存成功'
                    });
                    this.v_dialog_addResourceType = false
                    this.getTypeList();
                    this.isOnAdd = false;
                }).catch(error => {

                    this.isOnAdd = false;
                })
            },
            delResType(id) {
                this.$confirm('请保证该类型下已没有资源,此操作不可撤销', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    delResourceType(id).then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.queryForm.resType = '';
                        this.getTypeList();
                    }).catch(error => {
                        this.getTypeList();
                    })
                })

            },


        }
    }
</script>

<style scoped>

</style>
