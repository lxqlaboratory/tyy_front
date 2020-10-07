<template>
	
			<view>
			<uni-section style="height: 7vh;" title="订单列表" type="line" />
			<view class="item-t" v-for="(item, index) in orderList" :key="index"
			>
				<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;width: 200px;" >
					<view style="margin-bottom: 3px;">
						<text style="color: blue;" @click="viewProduct(item)">{{  item.productName }}</text>
					</view>
					<view style="margin-bottom: 3px;">
						<text>创建订单时间:{{  item.creatTime }}</text>
					</view>
					<view style="margin-bottom: 3px;">
						<text>出行时间:{{  item.date }}</text>
					</view>
					<view style="margin-bottom: 3px;">
					集合地点:<text style="color: blue;" @click="viewLocation(item)">{{  item.LocationName }}</text>
					</view>	
					<view style="margin-bottom: 3px;">
					<text >集合时间:{{  item.locationTime }}</text>
					</view>								
					<view style="margin-bottom: 3px;">
							<text style="color: blue;" @click="viewTour(item)">游客详情</text>
					</view>													
												
				</view>
				<view style="margin-bottom: 3px;" v-show="item.flag">
						<text>已出行</text>
				</view>
				<view style="margin-bottom: 3px;" v-show="!item.flag">
					<view style="margin-bottom: 3px;">
						<text>支付完成</text>
					</view>	
				</view>		
			</view>
		</view>
</template>

<script>
import {viewOrder } from '../../api/tour/tour.js';
	export default {

		data() {
			return {
				orderList:[],

			};
		},

		onShow() {
			viewOrder().then(res => {
				this.orderList = res.data.payList
			});
		},
		methods: {
		viewLocation(item){
			uni.navigateTo({
				url: '/pages/guider/viewLocation?locationName='+item.locationName+'&locationContent='+item.locationContent+'&locationLongitude='+item.locationLongitude+'&locationLatitude='+item.locationLatitude+' '
			})
		},
	    viewProduct(item){
			uni.navigateTo({
				url: '/pages/tour/tourViewProduct?productId='+item.productId+''
			})
		},
	    viewTour(item){
			uni.navigateTo({
				url: '/pages/tour/viewTour?touristIds='+item.touristIds+'&planId='+item.planId+'&orderId='+item.orderId+''
			})
		},
		continuePay(item){
			uni.navigateTo({
				url: '/pages/tour/continuePay?date='+item.date+'&LocationName='+item.LocationName+'&orderId='+item.orderId+'&shoudPay='+item.shoudPay+'&hashPay='+item.hashPay+'&needPay='+item.needPay+''
			})
		}
				
		}
	}
</script>

<style lang="scss">
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
