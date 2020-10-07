<template>
	<view class="container">
	<uni-section style="height: 7vh;" title="集合详情" type="line" />
		<view class="c-list">
			<view class="c-row b-b">
				<text class="tit" >集合地点</text>
				<view class="con-list">
					<text style="color: blue;" @click="viewLocation()">{{locationContent}}</text>
				</view>
			</view>
			<view class="c-row b-b">
				<text class="tit">集合人数</text>
				<view class="bz-list con">
					<text>{{ tourNum }}</text>
				</view>
			</view>
<!-- 			<view class="c-row b-b">
				<text class="tit">分销商</text>
				<view class="bz-list con">
					<text>{{disName}}</text>
				</view>
				<view class="bz-list con">
					<text style="color: blue;"  @click="call(disPhone)">{{disPhone}}</text>
				</view>
			</view> -->
			<uni-section style="height: 7vh;" title="集合情况" type="line" />
			<view class="item-t" v-for="(item, index) in tourList" :key="index"
			>
				<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
					<view style="margin-bottom: 3px;">
						<text>{{  item.tourName }}</text>
					</view>
					<view style="margin-bottom: 3px;color: blue;"  @click="call(item.phone)">{{  item.phone }}</view>
				</view>
				<view style="display: flex;flex-direction: column;justify-content: left;">
<!-- 					<view style="color: red;" v-if="item.isGather === '0'"  @click="queren(item)" > 未确认</view>
					<view style="color: #39B54A;" v-if="item.isGather === '1' "  @click="queren(item)"> 已确认</view> -->
					<view style="color: red;" v-if="item.isNotice===0" @click="querenlianxi(item)" > 未联系</view>
					<view style="color: #39B54A;" v-if="item.isNotice === 1 " @click="quxiaolianxi(item)"> 已联系</view>
						<view style="color: red;" v-if="item.isGather===0" @click="querendaoda(item)" > 未到达</view>
						<view style="color: #39B54A;" v-if="item.isGather === 1 " @click="quxiaodaoda(item)"> 已到达</view>
<!-- 					<view class="f-button" v-if="item.confirm === '0'"  @click="queren(item)" >
				
					确认订单</view> -->
					</view>
			</view>			
		</view>
	</view>
</template>

<script>
import { viewOrderDetile } from '../../api/guider/guider.js';
import { isGather,isNotice } from '../../api/guider/guider.js';

export default {
	data() {
		return {
			id: '',
			locationName: '',
			locationContent: '',
			tourNum:0,
			disName:'',
			disPhone:'',
			tourList:[],
			locationList:[]
		};
	},
	onLoad(options) {
		this.locationId = options.locationId;
		this.groupId = options.groupId;

		viewOrderDetile({ locationId: this.locationId,groupId: this.groupId }).then(res => {
			this.locationList = res.data.locationList
			this.locationContent = res.data.locationList.locationContent
			this.LocationName = res.data.locationList.LocationName
			this.locationLatitude = res.data.locationList.locationLatitude									
			this.locationLongitude = res.data.locationList.locationLongitude
			this.tourList =res.data.tourList
			this.tourNum = res.data.tourNum
			console.log("this.tourNum==="+this.tourNum)
		})
			.catch(err => {
				
			});
	},
	methods: {
		call(phoneNum){
 	uni.makePhoneCall({
 	
 	// 手机号
    phoneNumber: phoneNum

		});
		},
			querendaoda(item) {
					isGather({ touristId: item.touristId ,groupId:this.groupId}).then(res => {
						if(res.status===1){				
							item.isGather = 1;
						}else{
								uni.showModal({
							    title: '提示',
								showCancel: false,
								confirmColor: "#000000",
							    content: "操作失败",
							    fail: function (res) {
							        if (res.confirm) {
								     uni.navigateBack()
							        } 
							    }
							});
						}
			})
				.catch(err => {
					
				});		
		},
		
					querenlianxi(item) {
					isNotice({ touristId: item.touristId ,groupId:this.groupId}).then(res => {
						if(res.status===1){				
							item.isNotice = 1;
						}else{
								uni.showModal({
							    title: '提示',
								showCancel: false,
								confirmColor: "#000000",
							    content: "操作失败",
							    fail: function (res) {
							        if (res.confirm) {
								     uni.navigateBack()
							        } 
							    }
							});
						}
			})
				.catch(err => {
					
				});		
		},
			quxiaodaoda(item) {
					isGather({ touristId: item.touristId ,groupId:this.groupId }).then(res => {
						if(res.status===1){
							item.isGather = 0;
						}else{
								uni.showModal({
							    title: '提示',
								showCancel: false,
								confirmColor: "#000000",
							    content: "操作失败",
							    fail: function (res) {
							        if (res.confirm) {
								     uni.navigateBack()
							        } 
							    }
							});
						}
			})
				.catch(err => {
					
				});		
		},
			quxiaolianxi(item) {
					isNotice({ touristId: item.touristId ,groupId:this.groupId }).then(res => {
						if(res.status===1){
							item.isNotice = 0;
						}else{
								uni.showModal({
							    title: '提示',
								showCancel: false,
								confirmColor: "#000000",
							    content: "操作失败",
							    fail: function (res) {
							        if (res.confirm) {
								     uni.navigateBack()
							        } 
							    }
							});
						}
			})
				.catch(err => {
					
				});		
		},		
		viewLocation(){
			uni.navigateTo({
				url: '/pages/guider/viewLocation?locationName='+this.locationName+'&locationContent='+this.locationContent+'&locationLongitude='+this.locationLongitude+'&locationLatitude='+this.locationLatitude+' '
			})
		}
	}
};
</script>

<style lang="scss">
		page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}
    .c-list{
    font-size: $font-sm + 2upx;
    color: $font-color-base;
    background: #fff;
    .c-row{
      display:flex;
      align-items:center;
      padding: 20upx 30upx;
      position:relative;
    }
    .tit{
      width: 140upx;
    }
    .con{
      flex: 1;
      color: $font-color-dark;
      .selected-text{
        margin-right: 10upx;
      }
    }
    .bz-list{
      height: 40upx;
      font-size: $font-sm+2upx;
      color: $font-color-dark;
      text{
        display: inline-block;
        margin-right: 30upx;
      }
    }
    .con-list{
      flex: 1;
      display:flex;
      flex-direction: column;
      color: $font-color-dark;
      line-height: 40upx;
    }
    .red{
      color: $uni-color-primary;
    }
  }

      .tit{
      font-size: $font-base;
      margin-left:10upx;
    }
	
	  .item-t {
	
	  width: 100%;
	  padding: 15px;
	  border-bottom: 1px solid DarkGray;
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  align-items: center;
	  background-color: white;
	}
</style>
