<template>
  <div class="app-container">
    <mi-image-view ref="imagePreView"></mi-image-view>


    <el-dialog :visible.sync="v_preshow" title="资源预览" v-dialog-drag>
      <div style="max-width: 60vw;max-height: 40vw;display: flex;justify-content: center;align-items: center">
        <img :src="url_preshow" alt="预览资源" style="width: 40vw;height: 30vw;"/>
      </div>

    </el-dialog>
    <el-dialog :visible.sync="v_dialog_addResourceType" title="增加资源分类" v-dialog-drag>
      <el-form
        :model="resourceTypeForm"
        label-position="left"
        label-width="100px"
        style="width: 80%; margin-left:50px;">
        <el-form-item label="类型名" prop="name">
          <el-input maxlength="20" style="width: 50%;" v-model="resourceTypeForm.typeName"/>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="v_dialog_addResourceType = false">取消</el-button>
        <el-button :loading="isOnAdd" @click="addResType" type="primary">增加</el-button>
      </div>
    </el-dialog>
    <div class="filter-container">
      <div class="filter-item">
        <label>资源分类</label>
        <el-select :value="queryForm.resType" clearable placeholder="请选择资源类型" ref="resType"
                   style="width: 300px;" v-model="queryForm.resType">
          <el-option :key="item.id" :label="item.typeName" :value="item.id"
                     v-for="item in resTypeList"></el-option>
        </el-select>
      </div>
      <div class="filter-item">
        <label>资源名称</label>
        <el-input maxlength="50" placeholder="请检索资源名称" style="margin-left: 15px; width: 300px"
                  v-model="queryForm.fileName"></el-input>
      </div>

      <div class="filter-item">
        <el-button @click="getList" icon="el-icon-search" type="primary">查询</el-button>
      </div>


      <div class="filter-item">
        <el-button @click="getToken" icon="el-icon-upload" type="primary">上传资源</el-button>
      </div>

      <el-dialog :visible.sync="v_dialog_upload" title="上传资源" v-dialog-drag>
        <div
          style="padding:15px;display: flex;flex-direction: column;align-items: flex-start;justify-content: flex-start;">
          <div>
            <label>资源分类</label>
            <el-select :value="uploadForm['x:resType']" @change="getList" clearable
                       placeholder="请选择资源类型"
                       ref="resType" style="width: 150px;margin-bottom: 25px;" v-model="uploadForm['x:resType']">
              <el-option :key="item.id" :label="item.typeName" :value="item.id"
                         v-for="item in resTypeList"></el-option>
            </el-select>
          </div>

          <el-upload
            :auto-upload="false"
            :before-upload="uploadRes"
            :data="uploadForm"
            :file-list="fileList"
            :on-success="uploadSuccess"
            action="https://upload.qiniup.com"
            list-type="picture"
            ref="upload"
          >
            <el-button size="small" slot="trigger" type="primary">选取文件</el-button>
            <el-button @click="submitUpload" size="small" style="margin-left: 10px;" type="success">上传到服务器</el-button>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>

      </el-dialog>


    </div>

    <div
      style="display: flex;flex-direction: row;margin-left: 90px;width: 200px;justify-content: center;align-items: center;">
      <el-button @click="delResType(queryForm.resType)" icon="el-icon-delete" size="mini" style="width: 100%;"
                 type="danger">删除该类型
      </el-button>
      <el-button @click="v_dialog_addResourceType=true;resourceTypeForm={};" icon="el-icon-circle-plus-outline"
                 size="mini" style="width: 100%;"
                 type="primary">增加新类型
      </el-button>
    </div>

    <div class="resource-content">
      <el-card :body-style="{ padding: '0px' }" v-for="item in list" class="resource-item" >
        <el-image :src="item.url" class="image" style="width: 100%;height: 15vh" @click="letPreView(item.rId)"/>
        <div style="padding: 15px 10px 0 10px;">
          <span style="font-size: 13px;">{{item.fname}}</span>
          <div style="display: flex;align-items: center;width: 100%;padding: 0 1px;justify-content: space-between">
            <span style="font-size: 11px;color: gray">{{parseInt(item.fSize/1000)}} KB</span>
            <el-button type="text" class="button">操作</el-button>
          </div>
        </div>
      </el-card>

    </div>


    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      stripe
      style="margin-top: 15px;"
      v-loading="onLoading"
    >

      <el-table-column align="center" label="资源编号" min-width="25">
        <template slot-scope="scope">
          {{ scope.row.rId }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="缩略图" min-width="45">
        <template slot-scope="scope">
          <img :alt="scope.row.fname" :src="scope.row.url" class="columnImg"/>
        </template>
      </el-table-column>


      <el-table-column align="center" label="原始文件名" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.fname }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="文件大小" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.fSize/1000 }} KB
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
          <el-button @click="v_preshow=true;url_preshow=scope.row.url" type="primary">预览</el-button>
          <el-button @click="downloadIamge(scope.row.url,scope.row.fname)" type="success">下载</el-button>
          <el-button @click="delResource(scope.row.rId)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page.sync="queryForm.pageNum"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="getList"
      background
      layout="prev, pager, next"
      style="margin-top: 15px;"/>

  </div>
</template>

<script>
  import {addResourceType, delResource, delResourceType, getResourceList, getResourceTypeList} from "@/api/resource"

  import {getToken} from "@/api/baseApi"

  import ImageCropper from '@/components/ImageCropper'
  import MiImageView from "@/views/com/MiImageView"

  export default {
    name: "imageResource",
    data() {
      return {

        v_dialog_upload: false,
        uploadForm: {token: '', 'x:resType': ''},
        fileList: [],

        url_preshow: null,
        v_preshow: false,
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
          superType: 'IMAGE',
          fileName: '',
          resType: '',
          pageNum: 1,
          pageSorted: 'desc',
          pageSize: 10
        }
      }
    },
    components: {MiImageView, ImageCropper},
    created() {
      this.getTypeList()
      this.getList()
    },
    methods: {
      letPreView(id){
        this.$refs.imagePreView.openImageView(id)
      },

      submitUpload() {
        this.$refs.upload.submit()
      },

      uploadSuccess(resData) {
        if (resData.code > 0) {
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
        this.getList()
      },
      uploadRes() {
        if (!this.uploadForm['x:resType']) {
          this.$message({
            type: 'error',
            message: '请选择要上传至的资源分类'
          })
          return false
        }
        return true
      },
      getToken() {
        this.uploadForm['x:resType'] = ''
        this.fileList = []
        getToken().then(res => {
          this.v_dialog_upload = true
          this.uploadForm.token = res
        }).catch(error => {
        })
      },


      downloadIamge(imgsrc, name) {//下载图片地址和图片名
        let image = new Image()
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous")
        image.onload = function () {
          let canvas = document.createElement("canvas")
          canvas.width = image.width
          canvas.height = image.height
          let context = canvas.getContext("2d")
          context.drawImage(image, 0, 0, image.width, image.height)
          let url = canvas.toDataURL("image/png") //得到图片的base64编码数据

          let a = document.createElement("a") // 生成一个a元素
          let event = new MouseEvent("click") // 创建一个单击事件
          a.download = name || "photo" // 设置图片名称
          a.href = url // 将生成的URL设置为a.href属性
          a.dispatchEvent(event) // 触发a的单击事件
        }
        image.src = imgsrc
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
          })
          this.v_dialog_addResourceType = false
          this.getTypeList()
          this.isOnAdd = false
        }).catch(error => {
          this.isOnAdd = false
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
            this.queryForm.resType = ''
            this.getTypeList()
          }).catch(error => {
            this.getTypeList()
          })
        })

      },


    }
  }
</script>

<style scoped>
  .resource-content{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .resource-item{
    width: 10%;
    margin: 10px;
  }

</style>
