<template>
	<view class="container">
		<view class="history-section icon" v-for="(item,index) in funcBlockList" :key=index>
			<view class="sec-header">
				<text class="yticon icon-lishijilu"></text>
				<text style="font-size: 15px;font-weight:bold;">{{item.blockName}}</text>
			</view>
			<view class="h-list">
	
				<view class="function-item" v-for="func in item.secondList" :key=func.id  @click="skip(func.menuCmd)">
					<image class="core-item-icon" src="@/static/temp/c3.png"></image>
					<text style="margin-top: 5px;font-size: 12px;height: 25px;text-align: center;">{{func.menuName}}</text>
				</view>
	
			</view>
	
		</view>
	
	</view>
</template>

<script>
	import {
		uniDrawer
	} from '@dcloudio/uni-ui'
	import {
		getUniappMenuList
	} from '../../api/base/baseApi.js'
	export default {
		data() {
			return {
				funcBlockList: [],
			}
		},
		onShow: function(e) {
			getUniappMenuList().then(res => {
				this.funcBlockList = res.data
				// this.haveAuditedList = res.data.sourceList
				console.log(res)
				// this.isLoading = false
			}).catch(err => {

			})
		},
		methods: {
			skip(cmd) {
				console.log(cmd)
				uni.navigateTo({
					url:'..'+cmd
				})
			}
		}
	}
</script>

<style lang='scss'>
	.container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-bottom: 30rpx;
	}

	.history-section {
		padding: 30upx 0 0;
		width: 700rpx;
		margin-top: 30upx;
		background: #fff;
		border-radius: 20upx;
		.sec-header {
			border-bottom: 1px solid #cccccc;
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			/* margin-left: 30upx; */
			width: 100%;
			padding: 1px 1px 10px 10px;

			.yticon {
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}

		.h-list {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			padding-top: 10px;
			/* border: 1px solid #007AFF; */
			/* padding: 10rpx; */
			/* white-space: nowrap;
			padding: 30upx 30upx 0; */
			/* image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				
				border-radius: 10upx;
			} */
		}
	}

	.function-item {
		margin-bottom: 10px;
		width: 175rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: auto;
		/* border: 1px solid #007AFF; */
	}

	.tit {
		font-size: $font-base+2upx;
		color: #f7d680;
		margin-bottom: 28upx;

		.yticon {
			color: #f6e5a3;
			margin-right: 16upx;
		}
	}

	.core-item-icon {
		display: block;
		width: 85upx;
		height: 85upx;
		/* margin: 15upx auto; */
	}
</style>
