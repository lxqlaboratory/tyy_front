<template>
  <div class="app-container">
    <el-dialog v-dialog-drag  :visible.sync="v_addLocation" title="自定义集合地点">
      <add-new-location @newLocation="addLocationNew"></add-new-location>
    </el-dialog>

    <el-tabs style="position: relative" type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"/> 产品信息</span>
        <el-form :model="productForm" class="demo-ruleForm" label-position="left"
                 label-width="100px"
                 ref="productForm" status-icon style="margin-top: 15px;">
          <div class="m-title">基本信息</div>
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


          <el-form-item label="出发日期" prop="travelDate">
            <el-date-picker
              align="right"
              format="yyyy-MM-dd"
              placeholder="选择出团日期"
              style="width: 60%;"
              type="date"
              v-model="productForm.travelDate"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="团队人数" prop="touNum">
            <el-input placeholder="请输入预估团队人数" v-model.number="productForm.touNum">
              <template slot="append">人</template>
            </el-input>
          </el-form-item>

          <el-form-item label="选择分销商" prop="disId">
            <pro-select-dis v-model="productForm.disId"></pro-select-dis>
          </el-form-item>


          <div class="m-title">结算项目</div>

          <div style="margin-top: 15px;">

            <el-button @click="planCharge.push({
                        name: '未命名',
                        retPrice: 0,
                        setPrice: 0
                    })" icon="el-icon-circle-plus-outline" style="margin:0 0 15px 15px;" type="primary">增加结算类型
            </el-button>

            <div style="display: flex;align-items: center;justify-content: flex-start"
                 v-for="(item,index) in planCharge">
              <el-form-item label="结算类型" label-width="75px" style="margin-right: 5px;">
                <el-input style="min-width: 75px;" v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="结算价" label-width="75px" style="margin-right: 5px;">
<!--                <el-input style="min-width: 150px;" v-model.number="item.retPrice">-->
<!--                  <template slot="append">元</template>-->
<!--                </el-input>-->
                <price-input style="min-width: 150px;" v-model="item.retPrice"></price-input>
              </el-form-item>
              <el-form-item label="参考价" label-width="75px" style="margin-right: 5px;">
<!--                <el-input style="min-width: 150px;" v-model.number="item.setPrice">-->
<!--                  <template slot="append">元</template>-->
<!--                </el-input>-->
                <price-input style="min-width: 150px;" v-model="item.setPrice"></price-input>

              </el-form-item>
              <el-form-item label="年龄范围" label-width="75px" style="margin-right: 5px;">
                <el-input style="min-width: 120px;" v-model.number="item.minAge">
                  <template slot="append">岁</template>
                </el-input>
                -
                <el-input style="min-width: 120px;" v-model.number="item.maxAge">
                  <template slot="append">岁</template>
                </el-input>
              </el-form-item>

              <el-form-item label="" label-width="0px">
                <el-button :disabled="index===0" @click="planCharge.splice(index,1)" type="danger">删除
                </el-button>
              </el-form-item>

            </div>

            <el-form-item label="项目备注" label-width="75px">
              <el-input placeholder="此处可填写航班信息或价格说明等，不填请留空，最多20字" v-model="productForm.planChargeDes"></el-input>
            </el-form-item>



          </div>


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
          <div>
            <el-input
              :autosize="{ minRows: 4}"
              placeholder="请介绍产品特色"
              type="textarea"
              v-model="productForm.proDes"/>
          </div>


          <div class="m-title">行程详情</div>
          <el-form-item label="行程天数" prop="proDateNum">
            <el-input-number :max="30" :min="0"
                             @change="initTravel" placeholder="请输入线路行程天数(单位：天)"
                             v-model="productForm.proDateNum"></el-input-number>
          </el-form-item>

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

                <el-checkbox-group  style="width: 30%;margin-left: 100px" v-model="productForm.proTraDetail[index].meal">
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
                           style="width: 19vw;height: 28vh;margin:15px 15px 15px 0"
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

          <div class="m-title">团队报价</div>
          <div>
            <label style="margin-right: 10px;">报价模板</label>
            <el-select :value="id_tems" @change="changeTems" placeholder="可选择团队报价模板" v-model="id_tems">
              <el-option :label="item.name" :value="item.id" v-for="item in temsList"></el-option>
            </el-select>
            <div style="display: flex;align-items: flex-start;margin-top: 15px;">
              <label style="margin-right: 10px">报价信息</label>
              <el-input
                :autosize="{ minRows: 4}"
                placeholder="请输入团队报价信息"
                style="width: 60vw;"
                type="textarea"
                v-model="productForm.proPriStan"/>
            </div>

            <div style="display: flex;align-items: flex-start;margin-top: 15px;">
              <label style="margin-right: 10px">对外报价</label>
              <el-input :autosize="{minRows:4}" placeholder="请输入对外报价信息" style="width: 60vw;" type="textarea"
                        v-model="productForm.proOutPrice"></el-input>
            </div>

            <div style="display: flex;align-items: flex-start;margin-top: 15px;">
              <label style="margin-right: 10px"> 预估毛利</label>
              <el-input placeholder="请输入预估的毛利" v-model.number="productForm.proFit">
                <template slot="append">元</template>
              </el-input>
            </div>

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
    </el-tabs>


    <div style="display: flex;justify-content: flex-end;width: 95%;">
      <el-button :loading="onSave" @click="saveProduct" style="margin-top: 15px;width: 200px;" type="primary">保存产品
      </el-button>
    </div>

    <div class="box-timer">
      <span style="color: black;font-size: 15px;font-weight: bold;line-height: 300%;">核团计时</span>
      <span style="font-size: 14px;">{{numTimeComputed}}</span>
    </div>
  </div>
</template>

<script>
  import {
    addPro,
    getAtts,
    getCarTypeList,
    getLocations,
    getProductInfo,
    getProTye,
    getSerTypes,
    getTems
  } from "@/api/production"
  import imageUpload from "@/components/uploadComponents/imageUpload"
  import {getResByNames} from '@/api/resource'
  import Tinymce from '@/components/Tinymce'
  import {getmmssTime} from "@/utils/tools"
  import addNewLocation from "@/views/production/addNewLocation"
  import proSelectDis from "@/views/production/proSelectDis"
  import priceInput from '@/views/com/priceInput'


  export default {
    name: "addTeamProduction",
    data() {
      return {

        id_timer: -1,

        id_tems: '',
        content: '',

        //增加集合地点
        v_addLocation: false,

        //四个下拉框
        planCharge: [
          {
            name: '成人',
            retPrice: 0,
            setPrice: 0,
            minAge: 18,
            maxAge: 50
          },
          {
            name: '儿童',
            retPrice: 0,
            setPrice: 0,
            minAge: 1,
            maxAge: 18
          },
          {
            name: '老人',
            retPrice: 0,
            setPrice: 0,
            minAge: 50,
            maxAge: 120
          }
        ],

        carTypeList: [],
        proTypeList: [],
        serTypeList: [],
        attsTypeList: [],
        locationList: [],

        temsList: [],

        imageIndexList: [],

        onSave: false,


        productForm: {
          //分销商
          disId:'',

          //出发日期
          travelDate: '',
          touNum: '',


          //项目备注
          planChargeDes: '',

          //对外报价
          proOutPrice: '',
          proFit: '',

          //结算项目转换成jsonArray形式
          disListStr: '',

          //计时器
          num_time: 0,


          id: -1,

          proType_1: '',
          proType_2: '',
          serType: 2,

          proLocation: [],
          name: '',
          saleState: true,
          proAtts: [],
          proScene: '',
          proDateNum: 0,
          proImage: [],
          proDes: '',
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

          agencyStr: '',

          agency: {
            name: '济南天一国际旅行社有限公司',
            phone: '0531-55572929',
            fax: '0531-86973943',
            QQ: '794581754',
            contactor: '济南天一国际旅行社段庆凯',
            address: '济南市历下区明湖天地E座'
          }

        }
      }
    },
    components: {Tinymce, imageUpload, addNewLocation,proSelectDis,priceInput},

    computed: {
      numTimeComputed() {
        //展示核团时间，用秒计时
        return getmmssTime(this.productForm.num_time)
      },

      proType_2_List() {
        if (this.productForm.proType_1)
          return this.proTypeList.find(item => (item.id === this.productForm.proType_1)).children
        return []
      },

    },

    created() {
      this.initProTypeList()
      let that = this
      const itime = () => {
        that.productForm.num_time++
      }
      this.id_timer = setInterval(itime, 1000)
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
                        this.productForm.proTraDetail[index].images=res;
                    }
                    console.log(res);
                })
            }
        },
      changeTems() {
        this.productForm.proPriStan = this.temsList.find(item => (item.id === this.id_tems)).content
      },

      delIndexImage(index) {
        this.imageIndexList.splice(index, 1)
      },
      delTraImage(index, index2) {
        this.productForm.proTraDetail[index].images.splice(index2, 1)
      },

      addTraImage(res, index) {
        if (this.productForm.proTraDetail[index].images.length < 3) {
          this.productForm.proTraDetail[index].images.push(res)
        } else {
          this.$message({type: "error", message: "行程最多只能增加三张图片!!"})
        }
      },

      addImage(imageForm) {
        this.imageIndexList.push(imageForm)
      },

      clearType2() {
        this.productForm.proType_2 = ''
      },


      initProTypeList() {
        Promise.all([getCarTypeList(), getProTye(), getSerTypes(), getAtts(), getLocations(), getTems()]).then(res => {
          this.carTypeList = res[0]
          this.proTypeList = res[1]
          this.serTypeList = res[2]
          this.attsTypeList = res[3]
          this.locationList = res[4]
          this.temsList = res[5]
          if (this.$route.query.id) {
            //初始化详情页面
            getProductInfo(this.$route.query.id).then(res => {

              this.productForm=res

              this.productForm.proAtts = JSON.parse(res.proAtts)
              this.productForm.proCarTypes = JSON.parse(res.proCarTypes)
              this.productForm.proLocation = JSON.parse(res.proLocation)
               this.productForm.proTraDetail =JSON.parse(res.proTraDetail)



              if (res.agency !== "" && res.agency != "{}" && res.agency != null && res.agency != "undefined") {
                this.productForm.agency = JSON.parse(res.agency)
              }

              this.imageIndexList = res.imageIndexList


              if(this.$route.query.copyType==='td'){
                if(this.productForm.serType===2)
                  this.planCharge=JSON.parse(res.disList)

                this.productForm.id=-1
                this.productForm.serType=2
                this.productForm.num_time=0
              }
              else{
                this.planCharge=JSON.parse(res.disList)
              }









            }).catch()
          }
        })
      },

      addLocationNew(location) {
        getLocations().then(res => {
          this.locationList = res
          this.v_addLocation = false
        }).catch(error => {
        })
      },


      saveProduct() {
        this.onSave = true
        //封面图片 遍历加入
        this.productForm.proImage = []
        for (let item of this.imageIndexList) {
          this.productForm.proImage.push(item.rId)
        }

        this.productForm.proTraDetail.forEach((item) => {
          if (item.images == null || item.images.length != 0) {
            item.images.forEach((img, index2, images) => {
              images[index2] = img.rId
            })
          }
        })

        this.productForm.agencyStr = JSON.stringify(this.productForm.agency)


        this.productForm.disListStr=JSON.stringify(this.planCharge)

        this.productForm.proTravelStr=JSON.stringify(this.productForm.proTraDetail)


        addPro(this.productForm).then(res => {
          this.$message({type: 'success', message: '保存产品成功'})
          this.onSave = false
          this.$router.push({query:{id:res.id},name:'ProInfo'})
        }).catch(error => {
          this.onSave = false
        })
      },

      initTravel() {
        this.productForm.proTraDetail = []
        for (let i = 0; i < this.productForm.proDateNum; i++) {
          let obj = {"trip": "", "meal": [], "hotel": "", "content": "", "day": i + 1, "images": []}
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
