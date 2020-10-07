<template>
<!--  <view><map style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="mapList" :polyline="polylines" :scale="15" />
      <button class="confirm-btn" @click="record" >提交</button>
  </view> -->
  
  	<view style="height:100%;width:100%;overflow: hidden;">
  	<view class="example-body"><text style="font-size: 20px;">天一同业游</text></view>
  	<map style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="mapList" :polyline="polylines" :scale="10" />
  	<view class="bottom-s">
  		<uni-section style="height: 7vh;" title="test" type="line" />
  		<scroll-view scroll-y="true" style="width: 100%;height: 33vh;padding: 5px 0 5px 0;">
					<button class="confirm-btn" @click="record" >提交</button>
		</scroll-view>

  	</view>
  </view>
</template>

<script>
  import {
    guiderPunchMap,recordLocation
  } from '../../api/guider/guider.js';
  export default {
    data() {
		return {
			polylines: [
				{
					points: [],
					arrowLine: true,
					dottedLine: true,
					width: 2,
					color: '#8A2BE2'
				}
			],
			mapList: [],

			longitude: '',
			latitude: '',
			list: []
		};
	},
	// onLoad(options) {
	// 	var that = this;
	// 	that.longitude = 117.071189;
	// 	that.latitude = 36.705738;
	// 	var markers = {
	// 		id: '',
	// 		title: '',
	// 		latitude: '',
	// 		longitude: '',
	// 		label: {
	// 			content: '',
	// 			color: 'black',
	// 			fontSize: 15,
	// 			borderWidth: 2,
	// 			bgColor: '#FFFFFF',
	// 			borderColor: '#7acfa6',
	// 			textAlign: 'center'
	// 		},
	// 		width: 50,
	// 		height: 70,
	// 		iconPath: '../../static/icon_position.png'
	// 	};
	// 	// markers.id = res.data[i].id
	// 	markers.longitude = 117.071189;
	// 	markers.latitude = 36.705738;
	// 	markers.title = '全福立交桥';
	// 	markers.label.content = '集合地点:全福立交桥';
	// 	that.mapList.push(markers);
	// 	var points1 = {
	// 		latitude: '',
	// 		longitude: ''
	// 	};
	// 	// points1.longitude = 117.071189
	// 	// points1.latitude = 36.705738
	// 	//   that.polylines[0].points.push(points1)
	// 	console.log(that.mapList);
	// },
	onLoad(){
		var that = this;
		this.longitude=117.000923,
		this.latitude = 36.675807,
		uni.getLocation({
		  type: 'wgs84',
				geocode:true,
		  success: function (res) {
				console.log('当前位置：' + res);
		  console.log('当前位置的经度：' + res.longitude);
		  console.log('当前位置的纬度：' + res.latitude);
				console.log('当前位置：' + res.address);
		
		       var markers = {
		      id: '',
		      title: '',
		      latitude: '',
		      longitude: '',
		      label: {
		        content: '',
		        color: 'black',
		        fontSize: 15,
		        borderWidth: 2,
		        bgColor: '#FFFFFF',
		        borderColor: '#7acfa6',
		        textAlign: 'center'
		      },
		      width: 50,
		      height: 70,
		      iconPath: '../../static/icon_position.png'
		    }
		    // markers.id = res.data[i].id
		    markers.longitude = res.longitude 
		    markers.latitude = res.latitude
		    // markers.title = res.address
		    markers.label.content = '位置:' + res.address + '\n'
		    that.mapList.push(markers)
		    var points1 ={
		      latitude: '',
		      longitude: ''
		    }
		    markers.longitude = res.longitude 
		    markers.latitude = res.latitude
		     that.polylines[0].points.push(points1)
		  console.log(that.mapList)
		  }
		});
	
		},
    methods:{
      record(){
		  var that = this;
      uni.getLocation({
        type: 'wgs84',
		geocode:true,
        success: function (res) {
		console.log('当前位置：' + res);
        console.log('当前位置的经度：' + res.longitude);
        console.log('当前位置的纬度：' + res.latitude);
		console.log('当前位置：' + res.address);

             var markers = {
            id: '',
            title: '',
            latitude: '',
            longitude: '',
            label: {
              content: '',
              color: 'black',
              fontSize: 15,
              borderWidth: 2,
              bgColor: '#FFFFFF',
              borderColor: '#7acfa6',
              textAlign: 'center'
            },
            width: 50,
            height: 70,
            iconPath: '../../static/icon_position.png'
          }
          // markers.id = res.data[i].id
          markers.longitude = res.longitude 
          markers.latitude = res.latitude
          // markers.title = res.address
          markers.label.content = '位置:' + res.address + '\n'
          that.mapList.push(markers)
          var points1 ={
            latitude: '',
            longitude: ''
          }
          markers.longitude = res.longitude 
          markers.latitude = res.latitude
           that.polylines[0].points.push(points1)
        console.log(that.mapList)
        }
      });
      
      }
    }
  }
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
