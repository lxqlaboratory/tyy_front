<template>
	<view>

		<drag-button :isDock="true" :existTabBar="false" firstText="创 建" secondText="海 报" @btnClick="addNewhaibao()" />
		<uni-section title="已生成海报产品列表" type="line"></uni-section>
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item,index) in posterList" :options="options1" :key="item.posterId" @click="swipeClick2($event,index,item.posterId)">
				<view class="detail-container">
					<view class="detail-row">
						<text>海报名称:</text>
						<text>{{item.postName}}</text>
					</view>
					<view class="detail-row">
						<text>创建时间:</text>
						<text>{{item.createTime}}</text>
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
		getHaibaoListInit
	} from '../../api/product/product.js';
	import {
		deleteHaibaoList
	} from '../../api/product/product.js';
	export default {
		components: {
			uniSection,
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				posterList: [],
				options1: [{
						text: '删除',
						style: {
							backgroundColor: 'rgb(255,58,49)'
						}
					},
					{
						text: '编辑',
						style: {
							backgroundColor: 'green'
						}
					}
				]

			}
		},
		onShow() {
			getHaibaoListInit({})
				.then(res => {
					this.posterList = res.data;
				})
		},
		methods: {
			swipeClick2(e, index, Id) {
				let {
					content
				} = e
				if (content.text === '删除') {
					uni.showModal({
						title: '提示',
						content: '是否删除',
						success: (res) => {
							if (res.confirm) {
								this.posterList.splice(index, 1);
								deleteHaibaoList({posterId:Id })
									.then(res => {

									})
							} else {
								uni.showToast({
									title: `已取消操作`,
									icon: 'none'
								})
							}
						}
					});
				} else if (content.text === '编辑') {
					uni.navigateTo({
						url: './editHaibao?posterId=' + Id + ''
					})
				}
			},
			addNewhaibao() {
				uni.navigateTo({
					url: './createHaibao'
				})
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


	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10px;
	}

	.padding1vh {
		padding: 1vh;
	}

	.posterImage {
		width: 60vw;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}
</style>
