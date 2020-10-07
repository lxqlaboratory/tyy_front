<template>
	<view>
		<view>
			<drag-button :isDock="true" :existTabBar="false" firstText="生 成" secondText="海 报" @btnClick="okceshi()" />
			<uni-section title="已选择生成海报产品列表" type="line"></uni-section>
			<uni-swipe-action>
				<uni-swipe-action-item v-for="(item,index) in proLList" :options="options1" :key="item.productId" @click="swipeClick2($event,index,item.productId)">
					<view class="detail-container">
						<view class="detail-row">
							<text>产品名称</text>
							<text>{{item.text}}</text>
						</view>

					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
			<uni-section title="请输入海报名字" type="line"></uni-section>
			<view class="form-item">
			<view class="item-title">海报名字</view>
			<view class="input-container">
				<input type="text" class="item-input" v-model="postName" />
			</view>
          </view>
			<uni-section title="搜索产品" type="line"></uni-section>

			<view class="form-item">
				<view class="item-title">价格</view>
				<view class="input-container">
					<input type="text" class="item-input" v-model="minPrice" />
					<text>至</text>
					<input type="text" class="item-input" v-model="maxPrice" />
				</view>
				<view class="item-title">天数</view>
				<view class="input-container">
					<input type="text" class="item-input" placeholder="请输入数字" v-model="minDay" />
					<text>至</text>
					<input type="text" class="item-input" placeholder="请输入数字" v-model="maxDay" />
				</view>

				<view class="item-title">地点名字</view>
				<view class="input-container">
					<input type="text" class="item-input" v-model="location" />
				</view>
				<view class="item-title">日期</view>
				<view class="item-t">
					<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
						<picker mode="date" :value="start" :start="startDate" :end="endDate" @change="bindDateChange">
							<view>{{start}}</view>
						</picker>
					</view>
					<view style="display: flex;flex-direction: column;justify-content: left;">
						<picker mode="date" :value="end" :start="startDate" :end="endDate" @change="bindDateChange1">
							<view>{{end}}</view>
						</picker>
					</view>
				</view>
				<view class="sole-row-item">
					<view class="switch-container">
						<view>产品类型</view>
						<picker mode="selector" :value="index" :range="proTypeList" range-key=proTypeName @change="proTypeChange">
							<view class="picker-container">
								<view>{{typeName_1}}</view>
								<image src="@/static/icon-right.png" mode="widthFix" class="icon-right"></image>
							</view>
						</picker>
					</view>

					<view class="switch-container" v-if="secondType">
						<view>二级类型</view>
						<picker mode="selector" :value="index" :range="childrenProTypeList" range-key=proTypeName @change="childrenTypeChange">
							<view class="picker-container">
								<view>{{typeName_2}}</view>
								<image src="@/static/icon-right.png" mode="widthFix" class="icon-right"></image>
							</view>
						</picker>
					</view>
				</view>
			</view>
			<button type="primary" class="tt" @click="submit">搜索</button>

			<uni-section title="产品列表" type="line"></uni-section>

			<button type="default" size="mini" class="tt1" @tap="check">全选</button>
			<button type="default" size="mini" @tap="cancel" class="tt1">取消</button>
			<helang-checkbox ref="checkbox" @change="valueChange"></helang-checkbox>
			<!-- <view class="item-t" v-for="(item, index) in pList" :key="index">
				<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
					<view style="margin-bottom: 3px;">
						<text>{{ item.name }}</text>
					</view>
				</view>
			</view> -->

			<button type="primary" class="tt" @click="addSudent">添加</button>

		</view>
		<!-- <button type="primary" @tap="okceshi()">生成活动海报</button> -->
		<!-- 图片展示由自己实现 -->
		<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image :src="poster.finalPath || ''" mode="widthFix" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
					<!-- <button type="primary" size="mini" @tap.prevent.stop="share()">分享图片</button> -->
				</view>
			</view>
		</view>

		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>
	</view>
</template>

<script>
	import helangCheckbox from "@/components/helang-checkbox/helang-checkbox.vue"
	import _app from '@/js_sdk/QuShe-SharerPoster/QS-SharePoster/app.js'
	import {
		getSharePoster
	} from '@/js_sdk/QuShe-SharerPoster/QS-SharePoster/QS-SharePoster.js'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/wxcomponts/uni-swipe-action-item/uni-swipe-action-item.vue'
	import {
		selectProduct
	} from '../../api/group/group.js';
	import {
		gerProType
	} from '../../api/product/product.js';
	import {
		editShenchengHaibao
	} from '../../api/product/product.js';
	import {
		tourHaibaoProduct
	} from '../../api/product/product.js';
	
	import {
		editHaibaoListInit
	} from '../../api/product/product.js';
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
				postName: '',
				pList: '',
				deliveryFlag: false,
				posterBgFlag: true, //是否展示海报背景图
				simpleFlag: false, //是否展示简单版海报
				img: null,
				poster: {},
				heightHa: 1920,
				options1: [{
					text: '删除',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}],
				ListHa: [],
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				date: currentDate,
				start: currentDate,
				end: currentDate,
				minPrice: '',
				maxPrice: '',
				location: '',
				productList: [],
				minDay: '',
				maxDay: '',
				imageCode: '',
				proTypeList: [],
				secondType: false,
				childrenProTypeList: [],
				proType_1: '',
				proType_2: '',
				typeName_1: '',
				proLList: [],
				posterId: '',
				typeName_2: ''

			}
		},
		onLoad(options) {
			this.posterId = options.posterId
			editHaibaoListInit({posterId:options.posterId})
				.then(res => {
					this.proLList = res.data;
				})
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
								this.proLList.splice(index, 1);

							} else {
								uni.showToast({
									title: `已取消操作`,
									icon: 'none'
								})
							}
						}
					});
				}
			},
			cancel() {
				this.$refs.checkbox.cancelAll(); // 该功能在单选框模式下为取消当前选中项

			},
			invert() {
				this.$refs.checkbox.invertAll(); // 该功能在单选框模式下为取消当前选中项
			},
			check() {
				this.$refs.checkbox.checkAll(); // 该功能在单选框模式下无效

			},
			valueChange(data) {

			},
			proTypeChange: function(e) {
				this.secondType = true
				this.proType_2 = ''
				console.log(e)
				for (var i = 0, lenI = this.proTypeList.length; i < lenI; ++i) {
					if (e.target.value == i) {
						this.proType_1 = this.proTypeList[i].id
						this.typeName_1 = this.proTypeList[i].proTypeName
						this.childrenProTypeList = this.proTypeList[i].children
					}
				}
				this.typeName_2 = ''
				console.log(this.proType_1)
			},
			childrenTypeChange: function(e) {
				console.log(e)
				for (var i = 0, lenI = this.childrenProTypeList.length; i < lenI; ++i) {
					if (e.target.value == i) {
						this.proType_2 = this.childrenProTypeList[i].id
						this.typeName_2 = this.childrenProTypeList[i].proTypeName
					}
				}
				console.log(this.proType_2)
			},
			bindDateChange(e) {
				this.start = e.target.value
			},
			bindDateChange1(e) {
				this.end = e.target.value
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
			submit() {
				selectProduct({
					location: this.location,
					minPrice: this.minPrice,
					maxPrice: this.maxPrice,
					start: this.start,
					end: this.end,
					minDay: this.minDay,
					maxDay: this.maxDay,
					proType_1: this.proType_1,
					proType_2: this.proType_2,
				}).then(res => {
					this.pList = res.data.pList
					this.code = res.data.code

					this.$refs.checkbox.set({
						type: 'checkbox', // 类型：复选框
						column: 1, // 分列：3
						list: this.pList
					});
				}).catch(err => {})
			},
			addSudent() {
				var Listpp = this.$refs.checkbox.get();
				for (var i = 0; i < Listpp.length; i++) {
					let k = 0;
					for (var j = 0; j < this.proLList.length; j++) {
						if (this.proLList[j].productId === Listpp[i].productId) {
							k++;
						}
					}
					if (k === 0) {
						this.proLList.push(Listpp[i])
					}
				}

			},
			okceshi() {
				if (this.postName === '') {
					uni.showToast({
						title: `请输入海报名字`,
						icon: 'none'
					})
				} else {
					
					tourHaibaoProduct({
						code: '1-2'
					}).then(res => {
						editShenchengHaibao({
							imageCode: res.data,
							code: this.code,
							postName: this.postName,
							posterId:this.posterId,
							proLList: this.proLList
						}).then(res => {
							this.ListHa = res.data
							this.shareFc()
						}).catch(err => {})
					}).catch(err => {})
					
					
				}
			},
			async shareFc() {
				try {
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据

						},
						posterCanvasId: this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						background: {
							width: 1080,
							height: this.heightHa
						},
						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							var that = this
							const dx = bgObj.width * 0.3;
							const fontSize = bgObj.width * 0.045;
							const lineHeight = bgObj.height * 0.04;
							//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
							return new Promise((rs, rj) => {
								rs(that.ListHa);
							})
						},
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => { // 为动态设置画布宽高的方法，
							this.poster = bgObj;
						}
					});
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					this.poster.finalPath = d.poster.tempFilePath;
					this.qrShow = true;
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('保存成功');
						uni.navigateBack()
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif
			},
			hideQr() {
				this.qrShow = false;
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
