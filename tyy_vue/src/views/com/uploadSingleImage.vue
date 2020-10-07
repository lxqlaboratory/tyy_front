<template>
  <div>
    <el-upload
      :auto-upload="true"
      :before-upload="beforeAvatarUpload"
      :data="uploadForm"
      :on-success="uploadSuccess"
      :show-file-list="false"
      accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP"
      action="https://upload.qiniup.com"
      class="avatar-uploader"
      list-type="picture"
      ref="upload"
    >

      <el-image :src="rImage.url" style="max-width: 400px;max-height: 400px" v-if="rImage.url"></el-image>
      <i class="el-icon-plus avatar-uploader-icon" v-else></i>

      <div class="el-upload__tip" slot="tip">只能上传小于5M的图片文件</div>
    </el-upload>
  </div>
</template>

<script>
  import {getImageById, getToken} from "@/api/baseApi"

  export default {
    name: "uploadSingleImage",

    props: ['resType', 'value'],
    data() {
      return {
        uploadForm: {token: '', 'x:resType': ''},
        rImage: {
          url: ''
        }
      }
    },

    created() {
      getToken().then(res => {
        this.uploadForm.token = res
        this.uploadForm["x:resType"] = this.resType
        this.isShow = true
      }).catch(error => {
      })
      this.refreshImage()
    },
    watch: {
      'value': function (val) {
        this.refreshImage()
      }
    },

    methods: {
      refreshImage(){
        if (!this.value)
          this.rImage = {
            url: ''
          }
        else {
          getImageById(this.value).then(res => {
            this.rImage = res
          }).catch()
        }
      },

      uploadSuccess(res) {
        this.$emit('input', res.data.rId)
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 5

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!')
        }
        return isLt2M
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    border-color: #409EFF;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
