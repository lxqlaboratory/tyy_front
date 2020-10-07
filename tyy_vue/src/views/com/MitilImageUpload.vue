<template>
  <div>
    <el-button @click="letBegin" type="success">添加图片</el-button>

    <el-dialog v-dialog-drag  :close-on-click-modal="false" :visible.sync="isShow" title="添加图片" width="80%">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 上传图片</span>
          <div style="display: flex;flex-direction: row;align-items: flex-start">
            <el-upload
              :auto-upload="false"
              :before-upload="uploadRes"
              :data="uploadForm"
              :file-list="fileList"
              :multiple="true"
              :on-success="uploadSuccess"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP"
              action="https://upload.qiniup.com"
              list-type="picture"
              ref="upload"
            >
              <el-button size="small" slot="trigger" type="primary">选取文件</el-button>
              <el-button @click="submitUpload" size="small" style="margin-left: 10px;" type="success">上传到服务器</el-button>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
            </el-upload>

            <div style="display: flex;flex-direction: row;align-items: center;">
              <label style="margin-left: 45px;margin-right: 15px;">上传至分类</label>
              <el-select :value="uploadForm['x:resType']" clearable placeholder="请选择资源类型"
                         ref="resType"
                         style="width: 150px;" v-model="uploadForm['x:resType']">
                <el-option :key="item.id" :label="item.typeName" :value="item.id"
                           v-for="item in resTypeList"></el-option>
              </el-select>
              <span  v-if="!uploadForm['x:resType']" style="size: 13px;color: gray;margin-left: 15px;color: orangered;">必须选择资源分类!</span>
            </div>
          </div>


        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 图库选择</span>

          <div>
            <label>图片类型</label>
            <el-select :value="queryForm.resType" @change="getList" placeholder="检索图片类型" style="width: 250px;"
                       v-model="queryForm.resType">
              <el-option :key="item.id" :label="item.typeName" :value="item.id" v-for="item in resTypeList">
              </el-option>
            </el-select>

            <label style="margin-left: 15px;">图片名称</label>
            <el-input placeholder="检索图片名称" style="width: 250px;" v-model="queryForm.fileName"></el-input>
            <el-button @click="getList" icon="el-icon-search" style="float: right" type="primary">搜索</el-button>
          </div>

          <div
            style="display: flex;flex-direction: row;justify-content: space-around;align-items: center;margin-top: 15px;">
            <div :key="item.rId" @click="chooseImage(item)" style="width: 23%;height: 29vh;" v-for="item in list">
              <el-card :body-style="{ padding: '0px' }">
                <el-image :src="item.url" fit="contain" style="width: 100%;height: 21vh;"/>
                <div style="padding: 8px;">
                  <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;max-width: 6vw">{{item.fname}}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ item.fSize/1000 }} KB</time>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
          <div style="display: flex;align-items: center;justify-content:space-between;margin-top:15px;">
            <el-pagination
              :current-page.sync="queryForm.pageNum"
              :page-size="queryForm.pageSize"
              :total="total"
              @current-change="getList"
              background
              layout="prev, pager, next"
              style="margin-top: 15px;"/>
          </div>


        </el-tab-pane>


      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
    import {getResourceList, getResourceTypeList} from "@/api/resource";
    import {getToken} from "@/api/baseApi";

    export default {
        name: "imageUpload",
        props:{
            index:Number
        },
        data() {
            return {
                queryForm: {
                    superType: 'IMAGE',
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
                this.uploadForm['x:resType'] = 9
                this.fileList = []
                getToken().then(res => {
                    this.uploadForm.token = res
                    this.isShow = true
                }).catch(error => {
                })
            },

            chooseImage(item) {
                if (this.index!=null){
                    this.$emit('addImage',item,this.index);
                }else{
                    this.$emit('addImage', item);
                }
                this.isShow = false
            },
            uploadSuccess(resData) {
                if (resData.code === 1 || resData.code === 2) {
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
                this.$emit('addImage', resData.data)
                this.isShow = false
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            getResourceTypeList() {
                getResourceTypeList('IMAGE').then(res => {
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
