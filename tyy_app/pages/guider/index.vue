<template>
  <view style="height:100%;width:100%;overflow: hidden;">
    <view class="example-body">

        <view style="position: absolute;left: 5px;top: 0px;"><uni-icons type="contact" size="30" @click="showDrawer('showLeft')" class="icon"></uni-icons></view>
        <text style="font-size: 20px;">天一同业游</text>
    </view> 
    
      <uni-drawer ref="showLeft" mode="left" :width="320" @change="change($event, 'showLeft')">
        <uni-list>
          <uni-list-item title="线路查询" @click="history" />
          <uni-list-item title="个人信息" @click="info" />
          <uni-list-item title="修改密码" @click="modifyPass" />
        </uni-list>
        <view class="close">
          <view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70" @click="closeDrawer('showLeft')">
            <text class="word-btn-white">关闭</text>
          </view>
        </view>
      </uni-drawer>
    
    <map style="width: 100%; height: 95vh;" :latitude="latitude" :longitude="longitude" :scale="15" />
    <view class="bottom-s">
      <uni-section style="height: 7vh;" title="线路选择" type="line" />
      <scroll-view scroll-y="true" style="width: 100%;height: 33vh;padding: 5px 0 5px 0;">
      
        <view v-for="(item, i) in list" vx:key="*this" class="item-t" v-if="item.groupState===0">
        
          <view style="display: flex;flex-direction: column;justify-content: center;align-items: flex-start;" >
            <view style="margin-bottom: 3px;">{{ item.groupName }}</view>
            <view>{{ '日期：' + item.groupDate + '  ' + '带团人数：' + item.touNum }}</view>
          </view>
          <view class="f-button" @click="chakan(item.groupId)">查看详情</view>
          <!--  <button size="mini" type="info">查看详情</button> -->
        </view>

        <!--    <uni-section title="线路选择" type="line" />
      <uni-list v-for="(item,i)  in list">
        <uni-list-item :title="getTitle(item)" >{{item.groupName}}</uni-list-item>

      </uni-list> -->
      </scroll-view>
    </view>
  </view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
import { getGuiderXianlu } from '../../api/guider/guider.js';
export default {
  data() {
    return {
      longitude: '',
      latitude: '',
      list: []
    };
  },
  components: { uniDrawer, uniIcons },
  onShow() {
    var that = this;
    uni.getLocation({
      type: 'wgs84',
      success: function(res) {
        that.longitude = res.longitude;
        that.latitude = res.latitude;
        console.log('当前位置的经度：' + res.longitude);
        console.log('当前位置的纬度：' + res.latitude);
      }
    });
    getGuiderXianlu().then(res => {
      this.list = res.data;
    });
  },
  methods: {
    confirm() {},
    // 打开窗口
    showDrawer(e) {
      this.$refs[e].open();
    },
    // 关闭窗口
    closeDrawer(e) {
      this.$refs[e].close();
    },
    // 抽屉状态发生变化触发
    change(e, type) {
      console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
      this[type] = e;
    },
    xianlu(e) {
      this.$refs[e].close();
    },
    getTitle(e) {
      return '日期：' + e.groupDate + '  ' + '带团人数：' + e.touNum;
    },
    info() {
      uni.navigateTo({
        url: '../userinfo/userinfo'
      });
    },
    history(){
      uni.navigateTo({
        url: './historyPunch'
      });
    },
    erweima(){
      uni.navigateTo({
        url: '../tourist/tourSelectSeat'
      });
    },
    chakan(groupId){
      uni.navigateTo({
        url: './punchMap?groupId='+groupId+''
          
      });
    },
    modifyPass() {
      uni.navigateTo({
        url: './modifyGuiderPass'
      });
    }
  }
};
</script>

<style scoped>
page {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #efeff4;
  min-height: 100%;
  height: auto;
}

.item-t {
  
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid DarkGray;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.example {
  padding: 0 15px 15px;
}
.bottom-s {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  position: fixed;
  bottom: 0;
  opacity: 0.9;
  height: 40vh;
}
.example-info {
  padding: 15px;
  color: #3b4144;
  background: #ffffff;
}

.example-body {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  line-height: 5vh;
  background-color: #ffffff;

  height: 5vh;
}
.example {
  padding: 0 15px;
}

.example-info {
  display: block;
  padding: 15px;
  color: #3b4144;
  background-color: #ffffff;
  font-size: 14px;
  line-height: 20px;
}

.example-info-text {
  font-size: 14px;
  line-height: 20px;
  color: #3b4144;
}

.f-button {
  font-size: 13px;
  padding: 5px 15px;
  background-color: WhiteSmoke;
  color: Black;
  border-radius: 5px;
  border: 1px solid Gray;
}
.example-body {
  flex-direction: column;
  padding: 15px;
  background-color: #ffffff;
}

.word-btn-white {
  font-size: 18px;
  color: #ffffff;
}

.word-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  height: 30px;
  margin: 10px;
  background-color: #007aff;
}

.word-btn--hover {
  background-color: #4ca2ff;
}

.header {
  display: flex;

  flex-direction: row;
  padding: 10px 15px;
  align-items: center;
  border-top-width: 1px;
  border-top-color: #f5f5f5;
  border-top-style: solid;
  background-color: #ffffff;
}

.input-view {
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: #e7e7e7;
  height: 30px;
  border-radius: 15px;
  padding: 0 10px;
  flex: 1;
  background-color: #f5f5f5;
}

.uni-drawer-info {
  background-color: #ffffff;
  padding: 15px;
  padding-top: 5px;
  color: #3b4144;
}

.uni-padding-wrap {
  padding: 0 15px;
  line-height: 1.8;
}

.input {
  flex: 1;
  padding: 0 5px;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  background-color: transparent;
}

.close {
  padding: 15px;
}

.example-body {
  display: flex;

  flex-direction: row;
  padding: 0;
}

.draw-cotrol-btn {
  flex: 1;
}

.info {
  padding: 15px;
  color: #666;
}

.info-text {
  font-size: 14px;
  color: #666;
}

.scroll-view {
  flex: 1;
}

/* 处理抽屉内容滚动 */
.scroll-view-box {
  flex: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.info-content {
  padding: 5px 15px;
}
</style>
