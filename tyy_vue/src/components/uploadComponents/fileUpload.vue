<template>
  <div>
    <el-button @click="letBegin" type="success">添加附件</el-button>

    <el-dialog v-dialog-drag  :visible.sync="isShow" title="添加附件" width="80%" :close-on-click-modal="false">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 资源选择</span>

          <div>
            <label>文档类型</label>
            <el-select @change="getList" v-model="queryForm.resType" style="width: 250px;" :value="queryForm.resType"
                       placeholder="检索文档类型">
              <el-option v-for="item in resTypeList" :key="item.id" :label="item.typeName" :value="item.id">
              </el-option>
            </el-select>

            <label style="margin-left: 15px;">文档名称</label>
            <el-input v-model="queryForm.fileName" style="width: 250px;" placeholder="检索文档名称"></el-input>
            <el-button style="float: right" icon="el-icon-search" type="primary" @click="getList">搜索</el-button>
          </div>

          <div
            style="display: flex;flex-direction: row;justify-content: space-around;align-items: center;margin-top: 15px;">
            <div style="width: 23%;" v-for="item in list" :key="item.rId" @click="chooseFile(item)">
              <el-card :body-style="{ padding: '0px' }">
                <div style="padding: 8px;">

                  <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;max-width: 6vw">{{item.fname}}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ item.fSize/1000 }} KB</time>
                  </div>
                  <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;max-width: 6vw">{{item.createTime}}</span>
                </div>
              </el-card>
            </div>
          </div>
          <div style="display: flex;align-items: center;justify-content:space-between;margin-top:15px;">
            <el-pagination
              :current-page.sync="queryForm.pageNum"
              :total="total"
              :page-size="queryForm.pageSize"
              @current-change="getList"
              style="margin-top: 15px;"
              background
              layout="prev, pager, next"/>
          </div>


        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 上传附件</span>
          <div style="display: flex;flex-direction: row;align-items: flex-start">
            <el-upload
              :before-upload="uploadRes"
              ref="upload"
              action="https://upload.qiniup.com"
              :data="uploadForm"
              :on-success="uploadSuccess"
              :file-list="fileList"
              :auto-upload="false"
              :limit="1"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">可上传任意文件</div>
            </el-upload>

            <div style="display: flex;flex-direction: row;align-items: center;">
              <label style="margin-left: 45px;margin-right: 15px;">上传至分类</label>
              <el-select ref="resType" v-model="uploadForm['x:resType']" :value="uploadForm['x:resType']"
                         style="width: 150px;"
                         placeholder="请选择资源类型" clearable>
                <el-option v-for="item in resTypeList" :key="item.id" :value="item.id"
                           :label="item.typeName"></el-option>
              </el-select>
              <span v-if="!uploadForm['x:resType']" style="size: 13px;color: gray;margin-left: 15px;color: orangered;">必须选择资源分类!</span>
            </div>
          </div>
        </el-tab-pane>

      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
    import {getResourceTypeList, getResourceList} from "@/api/resource";
    import {getToken} from "@/api/baseApi";

    export default {
        name: "fileUpload",
        data() {
            return {
                queryForm: {
                    superType: 'DOC',
                    fileName: '',
                    resType: '',
                    pageNum: 1,
                    pageSorted: 'desc',
                    pageSize: 4
                },
                list: [],
                total: 0,

                selectId: '',


                isShow: false,
                uploadForm: {token: '', 'x:resType': ''},
                resTypeList: [],
                fileList: []
            }
        },
        mounted() {
            this.getResourceTypeList()
            this.getList()
        },
        methods: {
            getList() {
                getResourceList(this.queryForm).then(res => {
                    this.list = res.list
                    this.total = res.pagination.total
                }).catch(error => {
                })
            },
            uploadRes() {
                if (!this.uploadForm['x:resType']) {
                    this.$message({
                        type: 'error',
                        message: '请选择要上传至的资源分类'
                    })
                    return false;
                }
                return true
            },
            letBegin() {
                this.uploadForm['x:resType'] = ''
                this.fileList = []
                getToken().then(res => {
                    this.uploadForm.token = res
                    this.isShow = true
                }).catch(error => {
                })
            },

            chooseFile(item) {
                this.$emit('addFile', item);
                this.isShow = false
            },
            uploadSuccess(resData) {
                if (resData.code === 1) {
                    this.$message({
                        type: 'success',
                        message: '上传资源成功'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '上传资源失败,请检查网络'
                    })
                }
                this.$emit('addFile', resData.data)
                this.isShow = false
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            getResourceTypeList() {
                getResourceTypeList('DOC').then(res => {
                    this.resTypeList = res
                    this.uploadForm['x:resType'] = this.resTypeList[0].id
                }).catch(error => {
                })
            }
        }
    }
</script>

<style scoped>

</style>
