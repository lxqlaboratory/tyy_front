<template>
	<view>
		<uni-section style="height: 7vh;" title="订单查询" type="line" />
	
	
		<view class="item-t" v-for="item in orderList" :key="item.orderId">
	
			<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
				<view style="margin-bottom: 3px;">
					<text>{{ '产品名称：' + '  ' + item.productName }}</text>
				</view>
				<view style="margin-bottom: 3px;">{{ '产品编号：' + '  ' + item.code }}</view>
				<view style="margin-bottom: 3px;">{{ '游客姓名：' + '  ' + item.tourName }}</view>
			</view>
		<view style="display: flex;flex-direction: column;justify-content: left;">
			<!-- <view style="color: #39B54A;" v-if="item.groupState === 0"> 未出行</view> -->
			<view style="color: red;" v-if="item.confirm === '0' " > 未确认</view>
		<view style="color: #39B54A;" v-if="item.confirm === '1' "> 已确认</view>
		<view class="f-button" v-if="item.confirm === '0'"  @click="queren(item)" >
		
			确认订单</view>
		</view>
		
	
	
		</view>
	
	</view>
</template>

<script>
	import {
		getDisOrderInit
	} from '../../api/product/product.js';
	
	export default {
		data() {
			return {
				orderList: [],
				personList: []
			};
		},
		onShow() {
			getDisOrderInit().then(res => {
			this.orderList = res.data.orderList
			});
		},
		methods: {
			queren(item) {
				uni.navigateTo({
					url: './disConfirmOrder?code='+item.code+'&&productId='+item.productId+'&&orderId='+item.orderId+''
	
				});
			}
	
		}
	}
</script>

<style>
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
		background-color: white;
	}
	
	.item-bottom {
	
		width: 100%;
		padding: 15px;
	
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: white;
	}
	
	.f-button {
		font-size: 13px;
		padding: 5px 15px;
		background-color: WhiteSmoke;
		color: Black;
		border-radius: 5px;
		border: 1px solid Gray;
	}
</style>
