<template>
  <div>

  <el-timeline v-for="(traDetail,index) in travelData">
    <el-timeline-item :timestamp="'第'+traDetail.day+'天'" placement="top">
      <el-card>
        <label >区间：</label>{{traDetail.trip}}
        <label style="margin-left: 20px;">餐饮：</label><span v-for="meal in traDetail.meal">{{meal}}&nbsp;</span>
        <label style="margin-left: 20px;">住宿：</label>{{traDetail.hotel}}
        <!--              <h4>{{traDetail.meal}}&nbsp;&nbsp;&nbsp;&nbsp;{{traDetail.hotel}}&nbsp;&nbsp;&nbsp;&nbsp;{{traDetail.trip}}</h4>-->
        <p>{{traDetail.content}}</p>
      </el-card>
      <el-row>
        <div
          style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;flex-wrap: wrap">
          <el-card :body-style="{ padding: '0px' }" :key="item.rId"
                   style="width: 26vw;height: 28vh;" v-for="(item,index2) in traDetail.images">
            <el-image :src="item.url" fit="contain" style="width: 28vw;height: 26vh;margin-top: 5px"/>
            <!--                <div style="padding: 8px;">-->
            <!--                  <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;max-width: 6vw">{{item.fname}}</span>-->
            <!--                  <div class="bottom clearfix">-->
            <!--                    <time class="time">{{ item.fSize/1000 }} KB</time>-->
            <!--                    <el-button @click="delTraImage(index,index2)" class="button" style="color: orangered" type="text">删除-->
            <!--                    </el-button>-->
            <!--                  </div>-->
            <!--                </div>-->
          </el-card>
        </div>
      </el-row>
    </el-timeline-item>
  </el-timeline>
  </div>
</template>
<script>
    export default {
        name: "proTravel",
        props:{
          jsonData:String,
        },
        data() {
            return {
                travelData:[],
            }
        },
        computed: {
        },
        watch:{
            jsonData:{
                immediate:true,
                handler:function (val) {
                    this.initData(val)
                }
            }
        },
        // watch:{
        //   jsonData:function (val) {
        //     this.initData(val);
        //   }
        // },
        methods: {
            initData(val){
                this.travelData=JSON.parse(val);
            }
    }
    }
</script>
