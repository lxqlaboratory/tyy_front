<template>
  <div>
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="v_addStamp" title="增加印章" v-dialog-drag>
      <el-form :model="addStampForm" label-width="150px" ref="addStampForm">
        <el-form-item label="印章名" prop="name" required>
          <el-input v-model="addStampForm.name"></el-input>
        </el-form-item>

        <el-form-item label="印章类型" prop="typeStamp" required>
          <el-select placeholder="请选择印章类型" v-if="!addStampForm.isNewType" v-model="addStampForm.typeStamp">
            <el-option :key="item" :label="item" :value="item" v-for="item in stampTypeList"></el-option>
          </el-select>
          <el-input placeholder="请输入印章新类型" v-else v-model="addStampForm.typeStamp"></el-input>
          <el-button :type="addStampForm.isNewType?'primary':'warning'"
                     @click="addStampForm.isNewType=!addStampForm.isNewType">{{addStampForm.isNewType?'选择印章类型':'输入新类型'}}
          </el-button>

        </el-form-item>

        <el-form-item label="印章图" prop="rId" required>
          <upload-single-image :res-type="11" v-model="addStampForm.rId"></upload-single-image>
        </el-form-item>

      </el-form>
      <el-button @click="addStamp" slot="footer" type="primary">保存</el-button>
    </el-dialog>
    <el-dialog append-to-body :visible="v_exportNum" title="请输入印章个数" @close="v_exportNum=false;urlData.exportNum=0;" >
      <el-input-number v-model="urlData.exportNum"></el-input-number>
      <el-button @click="addUrlList" style="margin-left: 15px;" type="primary">
        加入页面
      </el-button>
    </el-dialog>
    <div style="padding-left: 15px;">{{label}}</div>
    <div style="padding:15px;">
      <el-select clearable placeholder="请选择印章类型" v-model="stampType">
        <el-option :label="item" :value="item" :key="item" v-for="item in stampTypeList"></el-option>
      </el-select>
      <el-button @click="v_addStamp=true" icon="el-icon-circle-plus-outline" style="margin-left: 15px;" type="info">
        增加印章
      </el-button>
    </div>
    <div class="stampContent">
      <el-card :body-style="{ padding: '0px' }" :key="item.rd" style="margin:0 15px;" v-for="item in stampFilterList">
        <div @click="handleChange(item.url)">
          <el-image :src="item.url"
                    class="image"/>
          <div style="padding: 14px;">
            <div style="display: flex;align-items: center;justify-content: space-between">
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>

</template>

<script>
    import {distinct} from "@/utils/tools"
    import {addStamp, delStamp, getStampListByDisId} from "@/api/stamp"
    import UploadSingleImage from "@/views/com/uploadSingleImage"

    export default {
        name: "stampSelect",
        components: {UploadSingleImage},
        data() {
            return {
                urlData:{
                    exportNum: '',
                    exportData:'',
                },
                v_exportNum: false,
                checkList: [],
                v_addStamp: false,
                addStampForm: {
                    name: '',
                    typeStamp: '',
                    rId: '',
                    isNewType: false
                },

                stampType: '',
                stampList: []
            }
        },
        methods: {
            addUrlList() {
                if (this.urlData.exportNum>0){
                    this.v_exportNum=false;
                    this.$emit('handleEvent', this.urlData);
                }else{
                    this.$message({
                        type:'error',
                        message:'调用印章数量必须大于0'
                    })
                }
            },
            handleChange(url) {
                this.urlData.exportData=url;
                this.v_exportNum=true;
                // if (event){
                //     this.checkList.push(url);
                // }else{
                //     let index=this.checkList.indexOf(url);
                //     this.checkList.splice(index,1);
                // }
                // console.log(this.checkList)
            },
            addStamp() {
                this.addStampForm.disId = this.disId
                this.$refs['addStampForm'].validate(valid => {
                    if (valid)
                        addStamp(this.addStampForm).then(res => {
                            this.$message({
                                type: 'success',
                                message: '增加印章成功'
                            })
                            this.$refs['addStampForm'].resetFields()
                            this.v_addStamp = false
                            this.getList(this.disId)
                        }).catch(error => {
                        })
                    else
                        this.$message({
                            type: 'error',
                            message: '请检查信息完整性'
                        })
                })


            },
            delStamp(id) {
                delStamp(id).then(res => {
                    this.$message({
                        type: "success",
                        message: "删除成功"
                    })
                    this.getList(this.disId)
                }).catch(error => {
                })
            },
            getList(val) {
                getStampListByDisId(val).then(res => {
                    this.stampList = res
                }).catch(error => {
                })
            }
        },

        watch: {
            'disId': {
                handler(val) {


                    if (val !== undefined && val !== null) {
                        this.stampList = []
                        this.getList(val)
                    }
                },
                immediate: true
            }
        },
        computed: {
            'stampTypeList': function () {
                return distinct(this.stampList, 'typeStamp')
            },
            stampFilterList: function () {
                if (this.stampType)
                    return this.stampList.filter(item => (item.typeStamp === this.stampType))
                return this.stampList
            }
        },
        props: {
            'disId': {
                type: Number,
                default: 0
            }, 'label': {
                type: String,
                default: '印章管理'
            }
        }
    }
</script>

<style scoped>
  .stampContent {
    display: flex;
    width: 100%;
    padding: 15px;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 10vw;
    height: 10vw;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
