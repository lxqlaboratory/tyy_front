<template>
  <el-dialog :visible.sync="visImage" append-to-body title="图片预览" v-dialog-drag>
    <div class="image-view-content">
      <el-image :src="imageForm.url" style="width: 40%"></el-image>
      <div>
        <div class="tItme">
          <label>图片分类</label>
          <el-tag type="primary">{{imageForm.fName}}</el-tag>
        </div>
        <div class="tItme">
          <label>原始文件名</label>
          <span>{{imageForm.fName}}</span>
        </div>
        <div class="tItme">
          <label>文件大小</label>
          <span>{{imageForm.fName}}</span>
        </div>
        <div class="tItme">
          <label>上传时间</label>
          <span>{{imageForm.fName}}</span>
        </div>
      </div>
      <el-button type="success">下载</el-button>
      <el-button type="danger">删除</el-button>

    </div>
  </el-dialog>
</template>

<script>
  import {getImageById} from "@/api/baseApi"

  export default {
    name: "MiImageView",
    data() {
      return {
        visImage: false,
        imageForm: {
          url: '',
          fName: ''
        }
      }
    },
    methods: {
      openImageView(rId) {

        getImageById(rId).then(res => {
          this.imageForm=res
        }).catch(error => {

        })

      }
    }
  }
</script>

<style scoped>
  .tItme {
    line-height: 150%;
    padding: 5px 10px;
  }

  .tItme label {
    min-width: 150px;
  }

  .image-view-content {
    min-width: 400px;
    width: 50vw;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
  }

</style>
