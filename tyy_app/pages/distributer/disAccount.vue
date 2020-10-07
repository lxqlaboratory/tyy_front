<template>
	<view class="app">
		<view class="price-box">
			<text>账目金额</text>
			<text class="price">{{money}}</text>
		</view>
	</view>
</template>

<script>
import {
		getDistributeAccount
	} from '../../api/tour/tour.js';
	export default {
		data() {
			return {
				money: '',
				orderInfo: {}
			};
		},
		
		onShow() {
			getDistributeAccount().then(res => {
				this.money = res.data;
			});
		},

		methods: {
	
			confirm: async function() {
				uni.redirectTo({
					url: '/pages/money/paySuccess'
				})
			},
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
	}
</style>
