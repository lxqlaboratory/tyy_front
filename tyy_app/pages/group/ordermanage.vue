<template>
	<view>
		<uni-section title="搜索订单" type="line"></uni-section>

		<view class="form-item">
			<view class="item-title"><text class="red">*</text>请选择发团日期</view>
				<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
					<picker mode="date" :value="start" :start="startDate" :end="endDate" @change="bindDateChange">
						<view>{{start}}</view>
					</picker>
				</view>			
			
		</view>
		<button type="primary" class="tt" @click="submit">搜索</button>
         <button type="primary" class="tt" @click="selectDemoType">全部未拼团列表</button>
		<uni-section title="订单列表" type="line"></uni-section>


		
		<button type="default" size="mini" class="tt1" @tap="check">全选</button>
		<button type="default" size="mini" @tap="cancel" class="tt1">取消</button>
		<button type="default" size="mini" @tap="invert" class="tt1">反选</button>
		<helang-checkbox ref="checkbox" @change="valueChange"></helang-checkbox>
		
		  <button type="primary" class="tt" @click="tijiaozi">拼团</button>
	</view>

</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/wxcomponts/uni-swipe-action-item/uni-swipe-action-item.vue'
	import helangCheckbox from "@/components/helang-checkbox/helang-checkbox.vue"
	import {
		getGroupsOrderALL
	} from '../../api/group/group.js';
	import {
		findOrdersByDate
	} from '../../api/group/group.js';
	export default {
		components: {
			uniSection,
			uniSwipeAction,
			"helang-checkbox": helangCheckbox,
			uniSwipeActionItem
		},
		data() {
						const currentDate = this.getDate({
				format: true
			})
			return {
				start: currentDate,				
				showdetail: false,
				groupList: '',
				list: [],
				data:[],
				instanceId: '',
				instanceName: '',
				retType: '',
				orderList: [],
				weipintuanList: []
			}
		},
		onLoad() {
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},		
		methods: {
			bindDateChange(e) {
				this.start = e.target.value
			},			
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},			
			selectDemoType() {
				getGroupsOrderALL().then(res => {
					this.orderList = res.data
					this.$refs.checkbox.set({
						type: 'checkbox', // 类型：复选框
						column: 1, // 分列：3
						list: this.orderList
					});
					
				}).catch(err => {
				
				})
				
			},

           cancel(){
				this.$refs.checkbox.cancelAll();	// 该功能在单选框模式下为取消当前选中项
			
			},
			invert(){
				this.$refs.checkbox.invertAll();	// 该功能在单选框模式下为取消当前选中项
			},
			check() {
				this.$refs.checkbox.checkAll(); // 该功能在单选框模式下无效

			},
			valueChange(data) {
				
			},
			submit() {

				findOrdersByDate({
					date: this.start
				}).then(res => {
					this.orderList = res.data
					
					this.$refs.checkbox.set({
						type: 'checkbox', // 类型：复选框
						column: 1, // 分列：3
						list: this.orderList
					});
				}).catch(err => {

				})

// 				findOrdersByName({
// 					locationName: this.locationName
// 				}).then(res => {
// 					this.orderList = res.data
// 					
// 					this.$refs.checkbox.set({
// 						type: 'checkbox', // 类型：复选框
// 						column: 1, // 分列：3
// 						list: this.orderList
// 					});
// 				}).catch(err => {
// 
// 				})
			},
			tijiaozi(){
				 let data = this.$refs.checkbox.get();
				if(data === null){
					uni.showModal({
					    title: '提示',
						showCancel: false,
						confirmColor: "#000000",
					    content: '拼团订单不能为空',
					    success: function (res) {
					        if (res.confirm) {
						        
					        } 
					    }
					});
				}else{
					
				uni.navigateTo({
					url:'./sanpintuan?data='+encodeURIComponent(JSON.stringify(data))
				})	
				}
				
				}

		}
	}
</script>

<style lang="scss">
	.tt {
		margin-top: 5upx;
		width: 60%;
		height: auto;
		font-size: 28upx;
		margin-bottom: 8upx;
	}

	.tt1 {
		height: 60rpx;
		line-height: 60rpx;

	}

	.red {
		color: #f55347;
	}

	.form-item {
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		align-items: center;
		height: auto;
		color: #777777;
		border-bottom: 2px solid #FFFFFF;

		.item-title {
			width: 700rpx;
			margin-top: 10px;
		}

		.upLoad-container {
			display: flex;
			flex-direction: row;
			padding-bottom: 10px;
			padding-top: 5px;
			background-color: #f1f1f1;
			width: 100%;
		}

		.one-row {
			display: flex;
			flex-direction: row;
			width: 700rpx;
			height: auto;
			margin-top: 10px;

			.one-row-title {
				display: flex;
				width: 200rpx;
				align-items: center;
				justify-content: center;
			}

			.one-row-input {
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

		.input-container {
			width: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			height: auto;
			margin-top: 10px;

			.item-input {
				width: 700rpx;
				border-radius: 20rpx;
				border: 1px solid #C8C7CC;
				padding: 5px;
				height: auto;
				background-color: #FFFFFF;
			}
		}

		.label-container {
			// border: 1px solid #007AFF;
			// width: 700px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			// margin-left: 25rpx;
			// margin-right: 25rpx;
			margin-top: 10px;

			.question {
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

	.sole-row-item {
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		align-items: center;
		height: auto;
		color: #777777;
		border-bottom: 2px solid #FFFFFF;

		.switch-container {
			width: 700rpx;
			margin-top: 10px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.picker-container {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				background-color: #FFFFFF;
				margin-left: 30rpx;
				border-radius: 30rpx;
				padding-left: 30rpx;
				padding-top: 5px;
				padding-bottom: 5px;
				/* border: 2px solid #007AFF; */
				width: 520rpx;
				height: auto;
				font-size: 14px;
				overflow: auto;

				.icon-right {
					width: 50upx;
					height: 35upx;
					flex-shrink: 0;
				}
			}
		}

		.input-container {
			width: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			height: auto;
			margin-top: 8px;

			.item-input {
				width: 700rpx;
				border-radius: 20rpx;
				border: 1px solid #C8C7CC;
				padding: 5px;
				height: auto;
				background-color: #FFFFFF;
			}
		}
	}

	.seg-item {
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		align-items: center;
		height: auto;
		color: #777777;
		border-bottom: 2px solid #FFFFFF;

		.null-list {
			display: flex;
			flex-direction: row;
			width: 750rpx;
			margin-top: 10px;
			justify-content: center;
			align-items: center;
		}

		.seg-container {
			width: 100%;
			padding: 8px;
			font-size: 14px;
			margin-top: 10px;

			.seg-content {
				width: 100%;
				display: flex;
				height: auto;
				padding: 8px;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				border-bottom: 2px solid #FFFFFF;

				.add {
					margin-top: 10px;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #4CD964;
					width: auto;
					padding: 8px;
					height: auto;
					border-radius: 15rpx;
				}

				.seg-row-container {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					width: 100%;
					padding: 10px;

					.seg-row {
						// width: 50%;
						display: flex;
						flex-direction: row;
						// justify-content: center;
						align-items: center;

						.seg-input {
							margin-left: 8px;
							height: auto;
							width: 120rpx;
							// background-color: #e5e5e5;
							background-color: #FFFFFF;
							padding: 5px;
							margin-right: 8px;
						}
					}
				}
			}
		}

		.input-container {
			width: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			height: auto;
			margin-top: 10px;

			.item-input {
				width: 700rpx;
				border-radius: 20rpx;
				border: 1px solid #C8C7CC;
				padding: 5px;
				height: auto;
				background-color: #FFFFFF;
			}
		}
	}

	.text-area {
		height: 400rpx;
		width: 700rpx;
		border-radius: 20rpx;
		border: 1px solid #C8C7CC;
		padding: 5px;
		background-color: #FFFFFF;
	}

	.upload-content {
		padding: 24upx 0 0 28upx;
		// background-color: #fff;
		overflow: hidden;
	}

	.upload-item {
		position: relative;
		float: left;
		width: 150upx;
		height: 150upx;
		margin-right: 30upx;
		margin-bottom: 30upx;

		&:nth-child(4n) {
			margin-right: 0;
		}

		.upload-img {
			width: 100%;
			height: 100%;
			border-radius: 8upx;
		}

		.upload-del-btn {
			position: absolute;
			right: -16upx;
			top: -14upx;
			width: 36upx;
			height: 36upx;
			border: 4upx solid #fff;
			border-radius: 100px;
		}

		.upload-progress {
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.4);
			color: #fff;
			font-size: 24upx;
			border-radius: 8upx;
		}
	}

	.upload-add-btn {
		position: relative;
		float: left;
		width: 150upx;
		height: 150upx;
		z-index: 99;
		border-radius: 8upx;
		background: #f9f9f9;

		&:before,
		&:after {
			content: ' ';
			position: absolute;
			top: 50%;
			left: 50%;
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			width: 4upx;
			height: 60upx;
			background-color: #d6d6d6;
		}

		&:after {
			width: 60upx;
			height: 4upx;
		}

		&:active {
			background-color: #f7f7f7;
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
