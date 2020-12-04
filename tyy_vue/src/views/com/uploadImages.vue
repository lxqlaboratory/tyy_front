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

      <div style="display: flex;align-items: center;justify-content: flex-start;flex-wrap: wrap">
        <div style="position: relative;margin: 15px;" v-for="(item,index) in fileList">
          <el-image :src="item.url" class="avatar-uploader-icon" style="border: 1px solid gray;"></el-image>
          <el-button type="danger" icon="el-icon-delete" circle style="position:absolute; z-index:10; right:5px; top:5px" @click.stop="delImge(index)"></el-button>
        </div>
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </div>


      <div class="el-upload__tip" slot="tip">只能上传小于5M的图片文件</div>
    </el-upload>
  </div>
</template>

<script>
  import {getToken} from "@/api/baseApi";
  import {getResList} from "@/api/resource"

  export default {
    name: "uploadImages",

    props: ['resType', 'value'],
    data() {
      return {
        uploadForm: {token: '', 'x:resType': ''},
        fileList: []
      }
    },
      watch:{
          value:{
              immediate:true,
              handler:function (val) {
                  if (val) {

                      getResList(JSON.parse(this.value)).then(res => {
                          this.fileList = res.data;
                          console.log(res)
                      }).catch(error => {

                      });


                  }else{
                      this.fileList=[];
                  }
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
    },

    methods: {
      uploadSuccess(res) {
          console.log(res);
        this.fileList.push(res.data)
        let temp = this.fileList.map(item => (item.rId))
        this.$emit('input', JSON.stringify(temp))
      },
        delImge(index){
            this.fileList.splice(index,1);
            let temp = this.fileList.map(item => (item.rId))
            this.$emit('input', JSON.stringify(temp))
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
