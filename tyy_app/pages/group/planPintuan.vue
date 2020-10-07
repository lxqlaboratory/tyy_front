<template>
	<view>
		<uni-section title="已拼团订单" type="line"></uni-section>
		<uni-swipe-action>
	<uni-swipe-action-item v-for="(item,index) in pintuanList" :options="options1" :key="item.orderId"  @click="swipeClick2($event,index,item.orderId)">
		<view class="detail-container">
			<view class="detail-row">
				<text>订单编号</text>
				<text>{{item.orderName}}</text>
			</view>
			<view class="detail-row">
				<text>集合地点</text>
				<text>{{item.locationName}}</text>
			</view>
			<view class="detail-row">
				<text>下单人姓名</text>
				<text>{{item.tourName}}</text>
			</view>
			<view class="detail-row">
				<view>
					<text>订单人数</text>
				</view>
				<view>
					<text>{{item.tourNum}}</text>
					<text>人</text>
				</view>	
			</view>
		</view>
	</uni-swipe-action-item>
		</uni-swipe-action>
		
		
		<uni-section title="请输入计划编号选择订单" type="line"></uni-section>
		<view class="form-item">
			<view class="item-title"><text class="red">*</text>请输入计划编号</view>
			<view class="input-container">
				<input type="text" class="item-input"  v-model="planNum" />
			</view>
		</view>
		<button type="primary" class="tt" @click="submit">搜索</button>
			
		<uni-section title="计划中未拼团订单列表" type="line"></uni-section>
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item,index) in weipintuanList" :options="options2" :key="item.orderId"  @click="swipeClick($event,index,item.orderId)">
				<view class="detail-container">
					<view class="detail-row">
						<text>订单编号</text>
						<text>{{item.orderName}}</text>
					</view>
					<view class="detail-row">
						<text>集合地点</text>
						<text>{{item.locationName}}</text>
					</view>
					<view class="detail-row">
						<text>下单人姓名</text>
						<text>{{item.tourName}}</text>
					</view>
					<view class="detail-row">
						<view>
							<text>订单人数</text>
						</view>
						<view>
							<text>{{item.tourNum}}</text>
							<text>人</text>
						</view>	
					</view>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>
<script>

	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/wxcomponts/uni-swipe-action-item/uni-swipe-action-item.vue'
	import {
		getGroupsOrderByID
	} from '../../api/group/group.js';
	import {
		Shanchugroupding
	} from '../../api/group/group.js';
	import {
		GroupShanchuPintuan
	} from '../../api/group/group.js';
	import {
		qintajihuadingdan
	} from '../../api/group/group.js';
	import {
		addOrdertoGroup
	} from '../../api/group/group.js';
	export default {
		 components: {
		 uniSection,
		 uniSwipeAction,
		 uniSwipeActionItem
		 },
		 data() {
		 		return {
					planNum: '',
		 			planId: '2',
		 			showdetail: false,
		 			groupId: '',
		 			list: [],
					options1: [{
						text: '删除',
						style: {
							backgroundColor: 'rgb(255,58,49)'
						}
					}],
					options2: [{
						text: '拼团',
						style: {
							backgroundColor: 'Magenta'
						}
					}],
		 			instanceId: '',
		 			instanceName: '',
		 			retType: '',
		 			pintuanList: [],
					weipintuanList: []
		 		}
		 	},
		 	onLoad(options) {
				this.groupId = options.groupId
				console.log(this.groupId)
		 		getGroupsOrderByID({groupId: this.groupId}).then(res => {

		 						this.pintuanList = res.data
		 						
		 					}).catch(err => {
		 						
		 					})
		 	},
		 	methods:{
		 	swipeClick(e, index,orderId) {
		 		let {
		 			content
		 		} = e
		 		if (content.text === '拼团') {
		 			uni.showModal({
		 				title: '提示',
		 				content: '是否拼团',
		 				success: (res) => {
		 					if (res.confirm) {
		 						
		 					addOrdertoGroup({groupId: this.groupId,orderId: orderId}).then(res => {
		 									this.pintuanList = res.data
		 								this.weipintuanList.splice(index,1);
		 									
		 								}).catch(err => {
		 									
		 								})
		 					} else  {
		 						uni.showToast({
		 							title: `已取消操作`,
		 							icon: 'none'
		 						})
		 					}
		 				}
		 			});
		 		} 
		 				
		 	},
		 		submit(){
		 			qintajihuadingdan({planNum: this.planNum}).then(res => {
		 			
		 							this.weipintuanList = res.data
		 							
		 						}).catch(err => {
		 							
		 						})
		 		},
				swipeClick2(e, index,orderId) {
					let {
						content
					} = e
					if (content.text === '删除') {
						uni.showModal({
							title: '提示',
							content: '是否删除',
							success: (res) => {
								if (res.confirm) {
									
								Shanchugroupding({orderId: orderId}).then(res => {
											this.pintuanList.splice(index,1);
												
											}).catch(err => {
												
											})
								} else  {
									uni.showToast({
										title: `已取消操作`,
										icon: 'none'
									})
								}
							}
						});
					} 
							
				}
							
		 	}
		 }
</script>

<style lang="scss">
	.tt{
		margin-top: 5upx;
		width: 60%;
		height: auto;
		font-size: 28upx;
		margin-bottom: 8upx;
	}
	.red{
		color: #f55347;
	}
	.form-item{
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		align-items: center;
		height: auto;
		color: #777777;
		border-bottom: 2px solid #FFFFFF;
		.item-title{
			width: 700rpx;
			margin-top: 10px;
		}
		.upLoad-container{
			display: flex;
			flex-direction: row;
			padding-bottom: 10px;
			padding-top: 5px;
			background-color: #f1f1f1;
			width: 100%;
		}
		.one-row{
			display: flex;
			flex-direction: row;
			width: 700rpx;
			height: auto;
			margin-top: 10px;
			.one-row-title{
				display: flex;
				width: 200rpx;
				align-items: center;
				justify-content: center;
			}
			.one-row-input{
				display: flex;
				// flex-direction: row;
				// justify-content: space-between;
				// align-items: center;
				background-color: #FFFFFF;
				// margin-left: 30rpx;
				border-radius: 30rpx;
				padding-left: 30rpx;
				padding-top: 3px;
				padding-bottom: 3px;
				/* border: 2px solid #007AFF; */
				width: 480rpx;
				height: auto;
				font-size: 14px;
				
			}
		}
		
		.input-container{
			width: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			height: auto;
			margin-top: 10px;
			.item-input{
				width: 700rpx;
				border-radius: 20rpx;
				border: 1px solid #C8C7CC;
				padding: 5px;
				height: auto;
				background-color: #FFFFFF;
			}
		}
		.label-container{
			// border: 1px solid #007AFF;
			// width: 700px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			// margin-left: 25rpx;
			// margin-right: 25rpx;
			margin-top: 10px;
			.question{
				display: flex;
				flex-direction: row;
				width: 225rpx;
				margin-left: 25rpx;
				padding: 5px;
				align-items: center;
				// border: 1px solid #007AFF;
			}
		}
		
	}
	.cont {
		flex: 1;
		height: 45px;
		line-height: 45px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		font-size: 15px;
		border-bottom-color: #F5F5F5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}
	
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}
	
	/* #endif */
	
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}
	
	view {
		font-size: 14px;
		line-height: inherit;
	}
	
	.example {
		padding: 0 15px 15px;
	}
	
	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}
	
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}
	
	/* #endif */
	.example {
		padding: 0 15px;
	}
	
	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
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
	
	
	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}
	
	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}
	
	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}
	
	.word-btn--hover {
		background-color: #4ca2ff;
	}
	
	
	
	.search-result {
		margin-top: 10px;
		margin-bottom: 20px;
		text-align: center;
	}
	
	.search-result-text {
		text-align: center;
		font-size: 14px;
	}
	
	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 0px;
	}
	.detail-container {
		width: 100%;
		height: auto;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		// margin-bottom: 5px;
		background-color: #FFFFFF;
		border-bottom: 5px solid #b8b8b8;
		.detail-row {
			min-width: 600rpx;
			width: auto;
			height: auto;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 5px;
	
			.opertion-button {
				padding: 5px 10px 5px 10px;
				border-radius: 5px;
				color: #FFFFFF;
			}
		}
	}
</style>
