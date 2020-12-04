<template>
  <div class="app-container">
    <el-dialog v-dialog-drag  :visible.sync="v_addLocation" title="自定义集合地点">
      <add-new-location @newLocation="addLocationNew"></add-new-location>
    </el-dialog>
    <el-tabs style="position: relative" type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"/> 产品信息</span>
        <el-form :model="productForm" :rules="productFormRules" class="demo-ruleForm" label-position="left"
                 label-width="100px"
                 ref="productForm" status-icon style="margin-top: 15px;">
          <div class="m-title">基本信息</div>

          <el-form-item label="产品编号" prop="proNum" v-if="productForm.proNum">
            <el-input disabled v-model.trim="productForm.proNum"/>
          </el-form-item>

          <el-form-item label="服务类型" required>
            <el-select :value="productForm.serType" disabled placeholder="请选择产品的服务分类" v-model="productForm.serType">
              <el-option :key="item.id" :label="item.serviceName" :value="item.id"
                         v-for="item in serTypeList"/>
            </el-select>
          </el-form-item>
          <el-form-item label="产品类型" required>
            <div
              style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;width: 40%;">
              <el-select @change="clearType2" placeholder="请选择产品一级类型" style="width: 48%;"
                         v-model="productForm.proType_1" value="productForm.proType_1">
                <el-option :key="item.id" :label="item.proTypeName"
                           :value="item.id"
                           v-for="item in proTypeList.filter(item=>(item.proTypeParent===0))"></el-option>
              </el-select>

              <el-select placeholder="请选择产品二级类型" style="width: 48%;" v-if="proType_2_List.length!==0"
                         v-model="productForm.proType_2" value="productForm.proType_2">
                <el-option
                  :key="item.id" :label="item.proTypeName" :value="item.id" v-for="item in proType_2_List"></el-option>
              </el-select>
            </div>
          </el-form-item>

          <el-form-item label="产品名称" prop="name">
            <el-input maxlength="20" placeholder="请输入产品名称" v-model="productForm.name"></el-input>
          </el-form-item>

          <el-form-item label="销售状态" prop="saleState">
            <el-switch
              active-color="#13ce66"
              inactive-color="#ff4949"
              v-model="productForm.saleState">
            </el-switch>
          </el-form-item>

          <el-form-item label="产品属性" prop="proAtts">
            <div style="display: flex;width: 80%; justify-content: flex-start;flex-wrap: wrap;align-items: center;">
              <el-checkbox-group v-model="productForm.proAtts">
                <el-checkbox :key="item.id" :label="item.id" border size="medium"
                             v-for="item in attsTypeList">{{item.attributeName}}
                </el-checkbox>

              </el-checkbox-group>
            </div>
          </el-form-item>

          <el-form-item label="主要景点" prop="proScene">
            <el-input maxlength="100" placeholder="请简短描述主要景点" v-model="productForm.proScene"/>
          </el-form-item>


          <el-form-item label="行程天数" prop="proDateNum">
            <el-input-number :max="30" :min="0"
                             placeholder="请输入线路行程天数(单位：天)" v-model="productForm.proDateNum"></el-input-number>
          </el-form-item>

          <el-form-item label="集合地点" prop="proLocation">
            <div style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center">
              <el-tag
                :key="item.id"
                @close="productForm.proLocation.splice(index,1)"
                closable
                disable-transitions
                style="margin-right: 5px;"
                v-for="(item,index) in productForm.proLocation"
                v-if="locationList.find(lItem=>(lItem.id===item))!=null"
              >
                <span>{{locationList.find(lItem=>(lItem.id===item)).locationName}}</span>

              </el-tag>

              <el-popover
                placement="right"
                trigger="click"
                width="400">
                <div
                  style="display: flex;width: 100%; justify-content: flex-start;flex-wrap: wrap;align-items: center;">
                  <el-checkbox-group v-model="productForm.proLocation">
                    <el-checkbox :key="item.id"
                                 :label="item.id" border size="medium" style="margin: 5px;min-width: 150px;"
                                 v-for="item in locationList"
                    >{{item.locationName}}
                    </el-checkbox>
                  </el-checkbox-group>
                  <el-button @click="v_addLocation=true" type="primary">增加集合地点</el-button>
                </div>
                <el-button slot="reference" style="margin-left: 15px;" type="primary">添加集合地点</el-button>
              </el-popover>
            </div>

          </el-form-item>

          <el-form-item label="结算类型" prop="ticketType">
            <div style="display: flex;width: 80%; justify-content: flex-start;flex-wrap: wrap;align-items: center;">
              <el-checkbox-group v-model="productForm.ticketType">
                <el-checkbox :key="item.value" :label="item.value" border size="medium"
                             v-for="item in ticketTypeList">{{item.label}}
                </el-checkbox>


              </el-checkbox-group>
            </div>
          </el-form-item>

          <el-form-item label="创建时间" prop="createTime" v-if="productForm.createTime">
            <el-input disabled v-model.trim="productForm.createTime"></el-input>
          </el-form-item>

          <div class="m-title">封面图片</div>
          <div style="margin-top: 15px;">
            <image-upload @addImage="addImage"></image-upload>
            <div
              style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;flex-wrap: wrap">
              <el-card :body-style="{ padding: '0px' }" :key="item.rId"
                       style="width: 10vw;height: 23vh;margin:15px 15px 15px 0" v-for="(item,index) in imageIndexList">
                <el-image :src="item.url" fit="contain" style="width: 10vw;height: 15vh"/>
                <div style="padding: 8px;">
                  <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;max-width: 6vw">{{item.fname}}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ item.fSize/1000 }} KB</time>
                    <el-button @click="delIndexImage(index)" class="button" style="color: orangered" type="text">删除
                    </el-button>
                  </div>
                </div>
              </el-card>
            </div>
          </div>

          <div class="m-title">产品特色</div>

          <div style="margin-top: 15px;">
            <image-upload @addImage="addImageTes"></image-upload>
            <div
              style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;flex-wrap: wrap">
              <el-card :body-style="{ padding: '0px' }" :key="item.rId"
                       style="width: 10vw;height: 23vh;margin:15px 15px 15px 0" v-for="(item,index) in imageTesIndexList">
                <el-image :src="item.url" fit="contain" style="width: 10vw;height: 15vh"/>
                <div style="padding: 8px;">
                  <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;max-width: 6vw">{{item.fname}}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ item.fSize/1000 }} KB</time>
                    <el-button @click="delTesIndexImage(index)" class="button" style="color: orangered" type="text">删除
                    </el-button>
                  </div>
                </div>
              </el-card>
            </div>
          </div>

          <div>
            <el-input
              :autosize="{ minRows: 4}"
              placeholder="请介绍产品特色"
              type="textarea"
              v-model="productForm.proDes"/>
          </div>
          <!--          <div class="m-title">行程安排(秀米导出展示页)</div>-->
          <!--          <vue-ueditor-wrap :config="myConfig" v-model="productForm.proTravel"></vue-ueditor-wrap>-->
          <div class="m-title">行程详情</div>
          <div v-for="(travel,index) in productForm.proTraDetail">
            <span style="font-size: 18px;margin-top: 20px; ">第{{productForm.proTraDetail[index].day}}天</span>
            <div style="border: solid 1px #DCDFE6;overflow:hidden;">
              <div
                style="margin-top:20px;display: flex;width: 100%; justify-content: flex-start;flex-wrap: wrap;align-items: center;">
                <label style="width: 25%;margin-left: 50px">区间</label>
                <label style="width: 30%;margin-left: 100px">餐饮</label>
                <label style="width: 25%">住宿</label>
              </div>
              <div
                style="display: flex;width: 100%; justify-content: flex-start;flex-wrap: wrap;align-items: center;margin-top: 5px">
                <el-input style="width: 25%;margin-left: 50px"
                          v-model="productForm.proTraDetail[index].trip"></el-input>
                <el-checkbox-group style="width: 30%;margin-left: 100px" v-model="productForm.proTraDetail[index].meal">
                  <el-checkbox-button key="早" label="早">早餐</el-checkbox-button>
                  <el-checkbox-button key="中" label="中">午餐</el-checkbox-button>
                  <el-checkbox-button key="晚" label="晚">晚餐</el-checkbox-button>
                </el-checkbox-group>
                <el-input style="width: 25%" v-model="productForm.proTraDetail[index].hotel"></el-input>
              </div>
              <div style="margin-top:15px;margin-left: 50px;margin-bottom: 20px">

                <image-upload :index="index" @addImage="addTraImage"></image-upload>
                <div
                  style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;flex-wrap: wrap">
                  <el-card :body-style="{ padding: '0px' }" :key="item.rId"
                           style="width: 19vw;height: 30vh;margin:15px 15px 15px 0"
                           v-for="(item,index2) in travel.images">
                    <el-image :src="item.url" fit="contain" style="width: 18vw;height: 20vh"/>
                    <div style="padding: 8px;">
                      <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;max-width: 6vw">{{item.fname}}</span>
                      <div class="bottom clearfix">
                        <time class="time">{{ item.fSize/1000 }} KB</time>
                        <el-button @click="delTraImage(index,index2)" class="button" style="color: orangered"
                                   type="text">删除
                        </el-button>
                      </div>
                    </div>
                  </el-card>
                </div>
              </div>
            </div>
            <div>
              <el-input :rows="8" placeholder="请输入内容" type="textarea"
                        @input="handleContent(index)"
                        v-model="productForm.proTraDetail[index].content"></el-input>
            </div>
            <br/>
          </div>


          <div class="m-title">服务项目</div>
          <el-input
            :autosize="{ minRows: 4}"
            placeholder="请介绍服务项目"
            type="textarea"
            v-model="productForm.proServer"/>

          <div class="m-title">自费与购物</div>
          <el-input
            :autosize="{ minRows: 4}"
            placeholder="请介绍自费与购物"
            type="textarea"
            v-model="productForm.proBuy"/>

          <div class="m-title">注意事项</div>
          <el-input
            :autosize="{ minRows: 4}"
            placeholder="请输入注意事项"
            type="textarea"
            v-model="productForm.proAution"/>

          <div class="m-title">友情提示</div>

          <el-input
            :autosize="{ minRows: 4}"
            placeholder="请添加友情提示"
            type="textarea"
            v-model="productForm.proNotice"/>
          <div class="m-title">价格标准</div>
          <div style="margin: 15px;">
            <el-form>
              <el-form-item label="最低收客人数: ">
                <el-input style="width: 100%;" type="number" v-model="productForm.minTouNum"></el-input>
              </el-form-item>
              <el-form-item label="散客成本:">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-input rows="10" style="width: 70%;" type="textarea" v-model="productForm.saCost"></el-input>
              </el-form-item>
            </el-form>
          </div>


        </el-form>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 参考菜单</span>


        <tinymce :height="300" v-model="productForm.proMenu"/>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 参考宾馆</span>
        <tinymce :height="300" v-model="productForm.proHotel"/>
      </el-tab-pane>

      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 参考车型</span>
        <span style="font-size: 13px;color: gray;">Tips:请选择可能使用的车型，成团时再确定具体车辆</span>
        <div
          style="display: flex;flex-direction: row;align-items: center;justify-content: flex-start;flex-wrap: wrap;width: 100%;box-sizing: border-box;padding: 15px;">

          <el-checkbox-group v-model="productForm.proCarTypes">
            <el-checkbox :key="item.id" :label="item.id" border style="margin: 5px;"
                         v-for="item in carTypeList">{{item.typeName}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </el-tab-pane>

      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 参考地接</span>
        <div style="margin: 15px;">
          <el-form>
            <el-form-item label="地接社名称:">
              &nbsp;&nbsp;
              <el-input v-model="productForm.agency.name"></el-input>
            </el-form-item>
            <el-form-item label="地接社电话: ">
              &nbsp;&nbsp;
              <el-input v-model="productForm.agency.phone"></el-input>
            </el-form-item>
            <el-form-item label="地接社传真: ">
              &nbsp;&nbsp;
              <el-input v-model="productForm.agency.fax"></el-input>
            </el-form-item>
            <el-form-item label="地接社联系人:">
              <el-input v-model="productForm.agency.contactor"></el-input>
            </el-form-item>
            <el-form-item label="地接社地址: ">
              &nbsp;&nbsp;
              <el-input v-model="productForm.agency.address"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

      <!--      <el-tab-pane>-->
      <!--        <span slot="label"><i class="el-icon-date"></i> </span>-->
      <!--        <file-upload @addFile="addFile"></file-upload>-->
      <!--        <div-->
      <!--          style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;flex-wrap: wrap">-->
      <!--          <el-card :body-style="{ padding: '0px' }" :key="item.rId"-->
      <!--                   style="width: 10vw;margin:15px 15px 15px 0" v-for="(item,index) in fileList">-->
      <!--            <div style="padding: 8px;">-->
      <!--              <span-->
      <!--                style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;max-width: 6vw">{{item.fname}}</span>-->
      <!--              <div class="bottom clearfix">-->
      <!--                <time class="time">{{ item.fSize/1000 }} KB</time>-->
      <!--                <el-button @click="delFile(index)" class="button" style="color: orangered" type="text">删除-->
      <!--                </el-button>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </el-card>-->
      <!--        </div>-->
      <!--      </el-tab-pane>-->

      <!--      <el-tab-pane v-if="productForm.serType===2">-->
      <!--        <span slot="label"><i class="el-icon-date"></i> 团队报价</span>-->
      <!--        <label style="margin-right: 10px;">团队报价模板</label>-->
      <!--        <el-select @change="changeTems" v-model="id_tems" :value="id_tems" placeholder="可选择团队报价模板">-->
      <!--          <el-option v-for="item in temsList" :label="item.name" :value="item.id"></el-option>-->

      <!--        </el-select>-->

      <!--        <el-input-->
      <!--          style="margin-top: 15px;"-->
      <!--          :autosize="{ minRows: 4}"-->
      <!--          placeholder="请输入团队报价信息"-->
      <!--          type="textarea"-->
      <!--          v-model="productForm.proPriStan"/>-->
      <!--      </el-tab-pane>-->
    </el-tabs>


    <div style="display: flex;justify-content: flex-end;width: 95%;">
      <el-button :loading="onSave" @click="saveProduct" style="margin-top: 15px;width: 200px;" type="primary">保存产品
      </el-button>
    </div>

    <div class="box-timer" v-if="productForm.serType===2">
      <span style="color: black;font-size: 15px;font-weight: bold;line-height: 300%;">核团计时</span>

      <span style="font-size: 14px;">{{numTimeComputed}}</span>


    </div>


  </div>
</template>

<script>
  import {
    addPro,
    getAtts,
    getTicketTypeList,
    getCarTypeList,
    getLocations,
    getProductInfo,
    getProTye,
    getSerTypes,
    getTems
  } from "@/api/production"
  import imageUpload from "@/components/uploadComponents/imageUpload"
  import fileUpload from "@/components/uploadComponents/fileUpload"
  import Tinymce from '@/components/Tinymce'
  import {getSupInfo, getSupType} from "@/api/support"

  import {getResByNames} from '@/api/resource'
  import VueUeditorWrap from 'vue-ueditor-wrap'

  import {addDisType, getDisType} from "@/api/distribute"

  import {distinct, getmmssTime} from "@/utils/tools"
  import addNewLocation from "@/views/production/addNewLocation"
  import priceInput from '@/views/com/priceInput'
  export default {
    name: "addProduction",
    data() {
      return {
        num_time: 0,
        id_timer: -1,
        travelDateNum: 0,

        id_tems: '',

        myConfig: {
          // 如果需要上传功能,找后端小伙伴要服务器接口地址
          // serverUrl: this.$config.baseUrl + 'ueditor/ueditorConfig',
          // serverUrl: 'http://localhost:8090/ueditor/ueditorConfig',
          // 你的UEditor资源存放的路径,相对于打包后的index.html
          UEDITOR_HOME_URL: process.env.NODE_ENV === 'development' ? '/ueditor/' : '/tianyi/ueditor/',
          // 编辑器不自动被内容撑高
          autoHeightEnabled: false,
          // 工具栏是否可以浮动
          autoFloatEnabled: false,
          // 初始容器高度
          initialFrameHeight: 736,
          // // 初始容器宽度
          // initialFrameWidth: 414,
          // 关闭自动保存
          enableAutoSave: true
        },
        content: '',

        isOnAdd: false,
        v_addLocation: false,
        disTypeAddForm: {},
        v_addDisType: false,
        isAddNewType: false,

        carTypeList: [],
        proTypeList: [],
        serTypeList: [],
        attsTypeList: [],
        ticketTypeList:[],
        locationList: [],
        disTypeList: [],
        supTypeList: [],

        temsList: [],

        supList: [],
        //地接社默认类型值
        supTypeSelect: 1,

        //resourceFormList
        imageIndexList: [],
        imageTesIndexList:[],
        fileList: [],

        onSave: false,
        planChageList: [],

        productForm: {

          //四个下拉框
          defalutPlanCharge: [
            {
              name: '成人',
              retPrice: 0,
              setPrice: 0,
              minAge: 0,
              maxAge: 0
            }
          ],
          num_time: 0,
          //分销商端口
          proTravelStr: '',
          createTime: '',
          disList: [],
          id: -1,
          proType_1: '',
          proType_2: '',
          serType: 1,
          proLocation: [],
          name: '',
          saleState: true,
          proAtts: [],
          ticketType:[],
          proScene: '',
          proDateNum: 0,
          proImage: [],
          proTesImage: [],
          proDes: '',
          proTravel: '',
          proTraDetail: [],
          proServer: '',
          proBuy: '',
          proNotice: '',
          proAution: '',
          proMenu: '',
          proHotel: '',
          proCarTypes: [],
          proPriStan: '',
          proNum: '',
          proFiles: [],
          agencyStr: '',
          agency: {
            name: '济南天一国际旅行社有限公司',
            phone: '0531-55572929',
            fax: '0531-86973943',
            QQ: '794581754',
            contactor: '济南天一国际旅行社段庆凯',
            address: '济南市历下区明湖天地E座'

          },
          //对外报价
          proOutPrice: '',
          proFit: 0,
          saCost: '大交通：\n车：\n房：\n餐：\n门票：\n导游：\n其他：\n',
          minTouNum: 0,


        },
        productFormRules: {}
      }
    },
    components: {Tinymce, imageUpload, fileUpload, addNewLocation, VueUeditorWrap,priceInput},

    computed: {
      numTimeComputed() {
        //展示核团时间，用秒计时
        if (this.num_time >= 3600)
          this.num_time = 0
        return getmmssTime(this.num_time)
      },
      proType_2_List() {
        if (this.productForm.proType_1)
          return this.proTypeList.find(item => (item.id === this.productForm.proType_1)).children
        return []
      },
      //分销商地域列表,去重拿到
      disTypeDyList() {
        return distinct(this.disTypeList, 'type')
      },
        travelContent(){
          this.productForm.proTraDetail= [...this.productForm.proTraDetail]

        }
    },

    created() {
      this.initProTypeList()
    },


    watch: {
      'productForm.serType': function (val, oldVal) {
        //判断val ！==oldVal 启动计时器

        const that = this
        if (val !== 2) {
          clearInterval(this.id_timer)
        }


        if (val !== oldVal && val === 2) {
          const itime = function () {
            that.num_time++
          }
          this.id_timer = setInterval(itime, 1000)
        }
      },
      'productForm.proDateNum': function (val, oldVal) {
        if (val > oldVal && this.productForm.proTraDetail.length < val) {
          for (let i = oldVal + 1; i <= val; i++) {
            let obj = {"trip": "", "meal": [], "hotel": "", "content": "", "day": i, "images": []}
            // obj["day"]=i+1;
            this.productForm.proTraDetail.push(obj)
          }

        } else if (val < oldVal) {
          this.productForm.proTraDetail.splice(val, this.productForm.proTraDetail.length + 1)
        }

      },
        // 'productForm.proTraDetail': {
        //     handler(val, oldVal) {
        //         if (val.length !== 0){
        //             console.log(val)
        //             console.log("mess")
        //             console.log(oldVal)
        //             for (let i = 0; i < val.length; i++) {
        //                 if (oldVal[i].content !== val[i].content){
        //                     console.log("test.....")
        //                 }
        //             }
        //         }
        //     },
        //     deep : true,
        //     immediate: false
        // }
    },

    methods: {
        handleContent(index){
            var regex2 = /\【(.+?)\】/g;
            let arr=this.productForm.proTraDetail[index].content.match(regex2);
            if (arr && arr.length!==0){
                let data=[];
                for (let i = 0; i < Math.min(3,arr.length); i++) {
                    let option = arr[i]
                    if (option) {
                       data.push(option.substring(1, option.length - 1));
                    }
                }



                getResByNames(data).then(res=>{
                    if (res&&res.length>0){
                        this.productForm.proTraDetail[index].images=res.data;
                    }
                    console.log(res);
                })


            }
        },
      changeTems() {
        this.productForm.proPriStan = this.temsList.find(item => (item.id === this.id_tems)).content
      },
      getDisArrName() {
        return distinct(this.disTypeList, 'type')
      },
      addFile(fileForm) {
        this.fileList.push(fileForm)
      },
      addNewDisType: function () {
        this.isOnAdd = true
        addDisType(this.disTypeAddForm).then(res => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.disTypeAddForm = {}
          this.isOnAdd = false
          this.v_addDisType = false
          getDisType().then(res => {
            this.disTypeList = res
            this.disTypeList.forEach(item => {
              this.$set(item, 'planCharge', [
                {
                  name: '成人',
                  retPrice: 0,
                  setPrice: 0
                }
              ])
              this.$set(item, 'isSpecial', false)
            })
          })

        }).catch(error => {
          this.isOnAdd = false
        })
      },
      delIndexImage(index) {
        this.imageIndexList.splice(index, 1)
      },
      delTesIndexImage(index) {
        this.imageTesIndexList.splice(index, 1)
      },
      delTraImage(index, index2) {
        this.productForm.proTraDetail[index].images.splice(index2, 1)
      },
      delFile(index) {
        this.fileList.splice(index, 1)
      },
      addTraImage(res, index) {
        if (this.productForm.proTraDetail[index].images.length < 3) {
          this.productForm.proTraDetail[index].images.push(res)
        } else {
          this.$message({type: "error", message: "行程最多只能增加三张图片!!"})
        }
      },
      addImage(imageForm) {
        if (this.imageIndexList.length  <1) {
          this.imageIndexList.push(imageForm)
        }else{
          this.$message({type: "error", message: "只能添加一张封面图片!!"})
        }
      },
      addImageTes(imageForm) {
        this.imageTesIndexList.push(imageForm)
      },
      clearType2() {
        this.productForm.proType_2 = ''
      },
      initProTypeList() {
        getSupInfo().then(res => {
          this.supList = res.data
        }).catch(error => {
        })
        getSupType().then(res => {
          this.supTypeList = res.data
        }).catch(error => {
        })
        getCarTypeList().then(res => {
          this.carTypeList = res.data
        }).catch(error => {
        })
        getProTye().then(res => {
          this.proTypeList = res.data
        }).catch(error => {
        })
        getSerTypes().then(res => {
          this.serTypeList = res.data
        }).catch(error => {
        })
        getAtts().then(res => {
          this.attsTypeList = res.data
        }).catch(error => {
        })
        getLocations().then(res => {
          this.locationList = res.data
        }).catch(error => {
        })
        getDisType().then(res => {
          this.disTypeList = res.data
        }).catch(error => {
        })
        getTicketTypeList().then(res => {
          this.ticketTypeList = res.data
        }).catch(error => {
        })
        // getTems().then(res => {
        //   this.temsList = res.data
        // }).catch(error => {
        // })
          this.disTypeList.forEach(item => {
              this.$set(item, 'planCharge', [
                {
                  name: '成人',
                  retPrice: 0,
                  setPrice: 0
                }
              ])
              this.$set(item, 'isSpecial', false)
            }
          )


          if (this.$route.query.id) {
            //初始化详情页面
            getProductInfo(this.$route.query.id).then(res => {
              console.log(res.data)
              this.productForm.createTime = res.data.product.createTime
              // if (res.disList)
              //   this.productForm.disList = JSON.parse(res.data.disList)
              // else
              //   this.productForm.disList = []

              this.productForm.id = res.data.product.id

              //
              // if (this.$route.query.copyType === 'sk') {
              //   this.productForm.id = -1
              //   this.productForm.serType = 1
              // }


              this.productForm.name = res.data.product.name
              this.productForm.proAtts = JSON.parse(res.data.product.proAtts)
              this.productForm.ticketType = JSON.parse(res.data.product.ticketType)

              this.productForm.proAution = res.data.product.proAution
              this.productForm.proBuy = res.data.product.proBuy

              this.productForm.serType = res.data.product.serType

              this.productForm.proCarTypes = res.data.product.proCarTypes

              this.productForm.proDateNum = res.data.product.proDateNum
              this.productForm.proDes = res.data.product.proDes
              this.productForm.proHotel = res.data.product.proHotel

              this.productForm.proLocation = JSON.parse(res.data.product.proLocation)

              this.productForm.proMenu = res.data.product.proMenu

              this.productForm.proNotice = res.data.product.proNotice

              this.productForm.proNum = res.data.product.proNum

              this.productForm.proPriStan = res.data.product.proPriStan

              this.productForm.proScene = res.data.product.proScene

              this.productForm.proServer = res.data.product.proServer

              this.productForm.proTravel = res.data.product.proTravel

              this.productForm.proTraDetail = JSON.parse(res.data.product.proTraDetail)

              this.productForm.proType_1 = res.data.proType_1

              console.log("proType_1"+this.productForm.proType_1)
              this.productForm.proType_2 = res.data.proType_2

              this.productForm.saleState = res.data.product.saleState

              this.productForm.proFit = res.data.product.proFit

              this.productForm.proOutPrice = res.data.product.proOutPrice
              this.productForm.saCost = res.data.product.saCost
              this.productForm.minTouNum = res.data.product.minTouNum


              if (res.num_time > 0) {
                this.num_time = res.data.num_time
              }

              if (res.data.product.agency !== "" && res.data.product.agency !== "{}" && res.agency != null && res.data.product.agency !== "undefined") {
                this.productForm.agency = JSON.parse(res.data.product.agency)
              }

              // this.fileList = res.data.fileList

              this.imageIndexList = res.data.imageIndexList
              this.imageTesIndexList = res.data.imageTesIndexList
              //
              // this.productForm.disList.forEach(item => {
              //
              //   if (item.isSpecial === false) {
              //     //如果他是默认值，则把他付为默认值
              //     this.productForm.defalutPlanCharge = item.planCharge
              //   }
              // })

              //this.defalutPlanCharge=[]

              //  console.log(this.productForm)
            }).catch()
          }

      },

      addLocationNew(location) {
        getLocations().then(res => {
          this.locationList = res.data
          this.v_addLocation = false
        }).catch(error => {
        })
      },
      handleChargeChange(array) {
          this.productForm.disList=[];
        array.forEach(item => {
          if (this.productForm.disList.find(function (element) {
            return element.id === item.id
          }) == null) {
            this.productForm.disList.push(item)
          }
        })
      },
      selectedAll(disTypeItem) {
        this.disTypeList.filter(item => (item.type === disTypeItem)).forEach((info) => {
          if (this.productForm.disList.find(function (element) {
            return element.id === info.id
          }) == null) {
            this.productForm.disList.push(info)
            this.planChageList.push(info)
          }
        })
      },
      saveProduct() {

        //封面图片 遍历加入
        this.productForm.proImage = []
        for (let item of this.imageIndexList) {
          this.productForm.proImage.push(item.rId)
        }
        //产品特色图片 遍历加入
        this.productForm.proTesImage = []
        for (let item of this.imageTesIndexList) {
          this.productForm.proTesImage.push(item.rId)
        }

        this.productForm.proTraDetail.forEach((item, index, array) => {
          if (item.images == null || item.images.length != 0) {
            item.images.forEach((img, index2, images) => {
              images[index2] = img.rId
            })
          }
        })
        //上传附件 遍历加入
        this.productForm.proFiles = []
        if (this.fileList)
          for (let item of this.fileList) {
            this.productForm.proFiles.push(item.rId)
          }
        //使用缺省策略覆盖
        for (let item of this.productForm.disList) {
          if (!item.isSpecial) {
            item.planCharge = this.productForm.defalutPlanCharge;
          }
        }


        this.productForm.disListStr = JSON.stringify(this.productForm.disList)
        this.productForm.proTravelStr = JSON.stringify(this.productForm.proTraDetail)
        this.productForm.proTravel = this.productForm.proTraDetail
        this.productForm.agencyStr = JSON.stringify(this.productForm.agency)
        this.productForm.defalutPlanChargeStr = JSON.stringify(this.productForm.defalutPlanCharge)
        this.productForm.ticketType=JSON.stringify(this.productForm.ticketType)


        this.productForm.num_time = this.num_time
        this.onSave = true
        addPro(this.productForm).then(res => {
          if(res.re===1){
            this.$message({type: 'success', message: '保存产品成功'})
          }else{
            this.$message({type: 'error', message: res.data})
          }
          this.onSave = false


          if(this.productForm.id!=-1)
          {
            this.$router.back()
          }
          else{
            this.$router.push({query: {proNum: res.data.proNum,action:'open'}, name: 'ProList'})
          }




        }).catch(error => {
          this.onSave = false
        })

      },


      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      initTravel() {
        console.log("jinglaile")
        // let obj={"trip":"","meal":"","hotel":"","content":"",day:0};
        this.productForm.proTraDetail = []
        for (let i = 0; i < this.productForm.proDateNum; i++) {
          let obj = {"trip": "", "meal": [], "hotel": "", "content": "", "day": i + 1, "images": []}
          // obj["day"]=i+1;
          this.productForm.proTraDetail.push(obj)
        }
      },
    }
  }
</script>

<style scoped>
  .el-input {
    width: 40%;
  }

  .el-select {
    width: 40%;
  }

  .demo-ruleForm {
    padding: 0 5vw 0 5vw;
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
    width: 100%;
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

  .box-timer {
    position: fixed;
    top: 55vh;
    right: 15px;
    height: 80px;
    width: 80px;
    background-color: lightblue;
    color: black;
    font-size: 14px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 5px;
    border: 1px solid gray;
  }
</style>
