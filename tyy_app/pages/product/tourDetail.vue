<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image :src="item.url" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section">
			<text class="title">{{title}}</text>
			<view class="price-box">
				<text class="price-tip">产品编码</text>
				<text class="m-price"></text>
				<text class="coupon-tip">{{code}}</text>
			</view>
		</view>
		
		
		
		
		
<view v-if="isYuangong">
		<uni-section title="选择省 市 区" type="line" />
		<view class="adBaseView">
			<view class="adRowView" @click="handleTap('picker1')">
				<view class="headView">请选择省</view>
				<view class="input-text">{{sheng}}</view>
			</view>
			<view class="bottomLine"></view>
		</view>

		<view class="adBaseView">
			<view class="adRowView" @click="handleTap('picker2')">
				<view class="headView">请选择市</view>
				<view class="input-text">{{shi}}</view>
			</view>
			<view class="bottomLine"></view>
		</view>

		<view class="adBaseView">
			<view class="adRowView" @click="handleTap('picker3')">
				<view class="headView">请选择区</view>
				<view class="input-text">{{qv}}</view>
			</view>
			<view class="bottomLine"></view>
		</view>

		<lb-picker ref="picker1" mode="multiSelector" :list="list" :level="1" @confirm="ConfirmProvince">
		</lb-picker>

		<lb-picker ref="picker2" mode="multiSelector" :list="list" :level="2" @confirm="ConfirmCity">
		</lb-picker>

		<lb-picker ref="picker3" mode="multiSelector" :list="list" :level="3" @confirm="Confirmqv">
		</lb-picker>

		<button type="primary" @click="chaxun" style="width: 80%;">查询分销商</button>
		<uni-section title="请选择分销商" type="line" />



		<button type="default" size="mini" class="tt1" @tap="check">全选</button>
		<button type="default" size="mini" @tap="cancel" class="tt1">取消</button>
		<button type="default" size="mini" @tap="invert" class="tt1">反选</button>
		<helang-checkbox ref="checkbox" @change="valueChange"></helang-checkbox>
		<!--  分享 -->
		<view >
			<view class="share-section" @click="fenxiao">
				<view class="share-icon">
					<text class="yticon icon-xingxing"></text>
					分
				</view>
				<text class="tit">转发线路</text>
				<text class="yticon icon-bangzhu1"></text>
				<view class="share-btn">
					立即转发
					<text class="yticon icon-you"></text>
				</view>

			</view>
		</view>
		
		
		</view>
		
		
		
		
		
		<view v-if="isDis">
			
		
				<button type="primary" @click="chaxunYuYan" style="width: 80%;">查询我的业务员</button>
				<uni-section title="请选择分销商业务员" type="line" />
		
		
		
				<button type="default" size="mini" class="tt1" @tap="check">全选</button>
				<button type="default" size="mini" @tap="cancel" class="tt1">取消</button>
				<button type="default" size="mini" @tap="invert" class="tt1">反选</button>
				<helang-checkbox ref="checkbox" @change="valueChange"></helang-checkbox>
				<!--  分享 -->
				<view >
					<view class="share-section" @click="fenxiaoYewuyuan">
						<view class="share-icon">
							<text class="yticon icon-xingxing"></text>
							分
						</view>
						<text class="tit">转发线路</text>
						<text class="yticon icon-bangzhu1"></text>
						<view class="share-btn">
							立即转发
							<text class="yticon icon-you"></text>
						</view>
		
					</view>
				</view>
				
				
				</view>
		
		
		
		
		
		
		
		<view class="c-list">
			<view class="c-row b-b">
				<text class="tit">线路描述</text>
				<view class="bz-list con">
					<text>{{des}}</text>
				</view>
			</view>
		</view>


		<button type="primary" @click="fenxiaoyouke" style="width: 80%;">生成海报</button>
		<hchPoster ref="hchPoster" :canvasFlag.sync="canvasFlag" @cancel="canvasCancel" :posterObj.sync="posterData" />
		<view :hidden="canvasFlag">
			<!-- 海报 要放外面放组件里面 会找不到 canvas-->
			<canvas class="canvas" canvas-id="myCanvas"></canvas><!-- 海报 -->
		</view>
	</view>
</template>

<script>
	import LbPicker from '@/components/lb-picker'
	import areaData from "../../api/base/area-data-min.js"
	import hchPoster from '@/components/hch-poster.vue'
	import {
		fenfaProduct
	} from "../../api/product/product.js"
	import {
		getResourseImage
	} from "../../api/base/baseApi.js"
	import {
		getFenxiaoshangYWY
	} from "../../api/base/baseApi.js"
	import {
		getFenxiaoshangBYarea
	} from "../../api/base/baseApi.js"
	import {
		fenxiaoPerson
	} from "../../api/product/product.js"
	import {
		fenxiaoYewuyuan
	} from "../../api/product/product.js"
	import {
		fenxiaoTour
	} from "../../api/product/product.js"
	
	import {
		tourProduct
	} from "../../api/product/product.js"
	import helangCheckbox from "@/components/helang-checkbox/helang-checkbox.vue"
	export default {
		components: {
			"helang-checkbox": helangCheckbox,
			hchPoster,
			LbPicker
		},
		data() {
			return {
				deliveryFlag: false,
				canvasFlag: true,
				posterData: {},
				image: '',
				title: '',
				list: areaData,
				des: '',
				secondisList:'',
				value1: '',
				value7: '',
				value8: '',
				value9: '',
				value10: '',
				value11: '',
				sheng: '',
				shi: '',
				qv: '',
				isC: false,
				productId: '',
				server: '',
				tour: [],
				tourList: [],
				personList: [],
				lineId: '',
				specSelected: [],
				rangeKey: '',
				value: '',
				label: '',
				isYuangong: false,
				disList: [],
				productDetail: '',
				value2: [],
				isDis: false,
				code: '',
				favorite: true,
				shareList: [],
				imgList: [],

			}
		},
		onLoad(options) {

			this.productId = options.productId
			this.lineId = options.lineId
			fenfaProduct({
				productId: this.productId,
				lineId: this.lineId
			}).then(res => {
				this.image = res.data.detail.image
				this.title = res.data.detail.title
				this.server = res.data.detail.server
				this.des = res.data.detail.des
				this.code = res.data.detail.code
				this.isYuangong = res.data.isYuangong
				this.isDis = res.data.isDis
				let imageI = JSON.parse(res.data.detail.productDetail)[0].images

				console.log(imageI)
				getResourseImage({
					List: imageI
				}).then(res => {
					this.imgList = res.data

				})

			}).catch(err => {

			})
		},
		methods: {
			selectChange2(e) {

				this.value2 = e
			},
			tourChange(e) {
				this.tour = e
				Console.log(this.tour)
			},
			fenxiaoYewuyuan(){
				let data = this.$refs.checkbox.get();
				if (data === null) {
					uni.showModal({
						title: '提示',
						showCancel: false,
						confirmColor: "#000000",
						content: '转发人员不能为空',
						success: function(res) {
							if (res.confirm) {
				
							}
						}
					});
				
				} else {
					fenxiaoYewuyuan({
						personList: data,
						productId: this.productId,
						lineId: this.lineId
					}).then(res => {
						uni.showModal({
							title: '提示',
							showCancel: false,
							confirmColor: "#000000",
							content: '转发成功',
							success: function(res) {
								if (res.confirm) {
									uni.navigateBack()
								}
							}
						});
					})
				}
				
			},
			fenxiao() {
				 let data = this.$refs.checkbox.get();
				if (data === null) {
					uni.showModal({
						title: '提示',
						showCancel: false,
						confirmColor: "#000000",
						content: '转发人员不能为空',
						success: function(res) {
							if (res.confirm) {

							}
						}
					});

				} else {
					fenxiaoPerson({
						personList: data,
						productId: this.productId,
						lineId: this.lineId
					}).then(res => {
						uni.showModal({
							title: '提示',
							showCancel: false,
							confirmColor: "#000000",
							content: '转发成功',
							success: function(res) {
								if (res.confirm) {
									uni.navigateBack()
								}
							}
						});
					})
				}

			},
			fenxiaoyouke() {


				tourProduct({
					code: this.code,
					productId: this.productId
				}).then(res => {

					Object.assign(this.posterData, {
						url: this.image,
						// url:this.imgList[0].url,//商品主图
						phone: '济南天一同业旅游公司',
						title: this.des, //标题
						// code:'https://img0.zuipin.cn/mp_zuipin/poster/hch-code.png',//小程序码
						code: res.data, //小程序码
					})
					this.$forceUpdate(); //强制渲染数据
					setTimeout(() => {
						this.canvasFlag = false; //显示canvas海报
						this.deliveryFlag = false; //关闭分享弹窗
						this.$refs.hchPoster.createCanvasImage(); //调用子组件的方法
					}, 500)

				}).catch(err => {

				})
				// uni.navigateTo({
				// 	url:'../tour/tourProduct'
				// })
			},
			//分享
			share() {
				this.$refs.share.toggleMask();
			},
			//收藏
			toFavorite() {
				this.favorite = !this.favorite;
			},
			buy() {
				uni.navigateTo({
					url: `/pages/order/createOrder`
				})
			},
			canvasCancel(val) {
				this.canvasFlag = val;
			},
			stopPrevent() {},
			handleTap(picker) {
				this.$refs[picker].show()
			},
			ConfirmProvince(item) {

				this.sheng = item.item[0].label
				this.value1 = this.sheng
			},
			ConfirmCity(item) {
				this.value7 = item.item[0].label
				this.value8 = item.item[1].label
				this.shi = this.value7 + '-' + this.value8
			},
			Confirmqv(item) {

				this.value9 = item.item[0].label
				this.value10 = item.item[1].label
				this.value11 = item.item[2].label
				this.qv = this.value9 + '-' + this.value10 + '-' + this.value11
			},
			chaxunYuYan(){
				getFenxiaoshangYWY().then(res =>{
					this.secondisList = res.data
					this.$refs.checkbox.set({
						type: 'checkbox', // 类型：复选框
						column: 2, // 分列：3
						list: this.secondisList
					});
					
				})
			},
			chaxun() {
				if (this.value9 != '' && this.value10 != '' && this.value11 != '') {
					getFenxiaoshangBYarea({
						province: this.value9,
						city: this.value10,
						region: this.value11
					}).then(res => {
						this.disList = res.data
						this.$refs.checkbox.set({
							type: 'checkbox', // 类型：复选框
							column: 3, // 分列：3
							list: this.disList
						});

					}).catch(err => {

					})
				} else if (this.value7 != '' && this.value8 != '') {
					getFenxiaoshangBYarea({
						province: this.value7,
						city: this.value8,
						region: this.value11
					}).then(res => {
						this.disList = res.data
						this.$refs.checkbox.set({
							type: 'checkbox', // 类型：复选框
							column: 3, // 分列：3
							list: this.disList
						});

					}).catch(err => {

					})
				} else if (this.value1 != '') {
					getFenxiaoshangBYarea({
						province: this.value1,
						city: this.value8,
						region: this.value11
					}).then(res => {
						this.disList = res.data
						this.$refs.checkbox.set({
							type: 'checkbox', // 类型：复选框
							column: 3, // 分列：3
							list: this.disList
						});

					}).catch(err => {

					})
				} else {
					uni.showModal({
						title: '提示',
						showCancel: false,
						confirmColor: "#000000",
						content: '省市区不能全为空',
						success: function(res) {
							if (res.confirm) {

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

			}
		},

	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
		padding-bottom: 160upx;
	}

	.tt1 {
		height: 60rpx;
		line-height: 60rpx;

	}

	.main {
		font-size: 32rpx;
		padding: 20rpx;
	}

	.icon-you {
		font-size: $font-base + 2upx;
		color: #888;
	}

	.carousel {
		height: 722upx;
		position: relative;

		swiper {
			height: 100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	.hang {
		display: flex;

		.hangjia {
			font-size: 13px;
			padding: 5px 15px;
			background-color: WhiteSmoke;
			color: Black;
			border-radius: 5px;
			border: 1px solid Gray;
		}

		.hhaha {
			display: flex;
			flex-direction: column;
			justify-content: left;
			font-size: 40upx;
		}
	}

	/* 标题简介 */
	.introduce-section {
		background: #fff;
		padding: 20upx 30upx;

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}

		.price-box {
			display: flex;
			align-items: baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color: $uni-color-primary;
		}

		.price {
			font-size: $font-lg + 2upx;
		}

		.m-price {
			margin: 0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}

		.coupon-tip {
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx);
		}

		.bot-row {
			display: flex;
			align-items: center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;

			text {
				flex: 1;
			}
		}
	}

	.adBaseView {
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 20upx;
	}

	.adRowView {
		width: calc(100% - 48upx);
		display: flex;
		flex-direction: row;
		align-items: center;
		color: rgb(94, 94, 94);
	}

	.headView {
		flex: 1;
		text-align: left;
		/* margin-left: 30upx; */
		font-size: 28upx;
		/*超出一行点点点*/
		overflow: hidden;
		/*超出的部分隐藏起来。*/
		white-space: nowrap;
		/*不显示的地方用省略号...代替*/
		text-overflow: ellipsis;
		/* 支持 IE */

		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.mustView {
		color: red;
		font-size: 32upx;
		margin-left: 10upx;
	}

	.bottomLine {
		width: 95%;
		height: 2upx;
		background-color: #DDDDDD;
		margin-top: 20upx;
	}

	.input {
		text-align: right !important;
		font-size: 28upx !important;
	}

	.input-text {
		text-align: right !important;
		font-size: 28upx !important;
		color: rgb(128, 128, 128);
	}

	/* 分享 */
	.share-section {
		display: flex;
		align-items: center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;

		.share-icon {
			display: flex;
			align-items: center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position: relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;

			&:after {
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position: absolute;
				background: $uni-color-primary;
			}
		}

		.icon-xingxing {
			position: relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}

		.tit {
			font-size: $font-base;
			margin-left: 10upx;
		}

		.icon-bangzhu1 {
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}

		.share-btn {
			flex: 1;
			text-align: right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}

		.icon-you {
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}

	.c-list {
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;

		.c-row {
			display: flex;
			align-items: center;
			padding: 20upx 30upx;
			position: relative;
		}

		.tit {
			width: 140upx;
		}

		.con {
			flex: 1;
			color: $font-color-dark;

			.selected-text {
				margin-right: 10upx;
			}
		}

		.bz-list {
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;

			text {
				display: inline-block;
				margin-right: 30upx;
			}
		}

		.con-list {
			flex: 1;
			display: flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}

		.red {
			color: $uni-color-primary;
		}
	}

	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;

		.e-header {
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.tit {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}

			.tip {
				flex: 1;
				text-align: right;
			}

			.icon-you {
				margin-left: 10upx;
			}
		}
	}

	.eva-box {
		display: flex;
		padding: 20upx 0;

		.portrait {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;

			.con {
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}

			.bot {
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color: $font-color-light;
			}
		}
	}

	/*  详情 */
	.detail-desc {
		background: #fff;
		margin-top: 16upx;

		.d-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;

			text {
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}

			&:after {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc;
			}
		}
	}

	/* 规格选择弹窗 */
	.attr-content {
		padding: 10upx 30upx;

		.a-t {
			display: flex;

			image {
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;
				;
			}

			.right {
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;

				.price {
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}

				.selected-text {
					margin-right: 10upx;
				}
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}

		.item-list {
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
			}

			.selected {
				background: #fbebee;
				color: $uni-color-primary;
			}
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}



	/*每个页面公共css */
	.content {
		text-align: center;
		height: 100%;
	}

	.share-btn {
		padding: 30upx 60upx;
	}

	.share-pro {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-direction: column;
		z-index: 5;
		line-height: 1;
		box-sizing: border-box;

		.share-pro-mask {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background: rgba(0, 0, 0, 0.5);
		}

		.share-pro-dialog {
			width: 750rpx;
			height: 310rpx;
			overflow: hidden;
			background-color: #fff;
			border-radius: 24rpx 24rpx 0px 0px;
			position: relative;
			box-sizing: border-box;
			position: fixed;
			bottom: 0;

			.close-btn {
				padding: 20rpx 15rpx;
				position: absolute;
				top: 0rpx;
				right: 29rpx;
			}

			.share-pro-title {
				font-size: 28rpx;
				color: #1c1c1c;
				padding: 28rpx 41rpx;
				background-color: #f7f7f7;
			}

			.share-pro-body {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				font-size: 28rpx;
				color: #1c1c1c;

				.share-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					justify-content: space-around;

					.share-icon {
						text-align: center;
						font-size: 70rpx;
						margin-top: 39rpx;
						margin-bottom: 16rpx;
						color: #42ae3c;
					}

					&:nth-child(2) {
						.share-icon {
							color: #ff5f33;
						}
					}
				}
			}
		}

		/* 显示或关闭内容时动画 */

		.open {
			transition: all 0.3s ease-out;
			transform: translateY(0);
		}

		.close {
			transition: all 0.3s ease-out;
			transform: translateY(310rpx);
		}

	}

	.canvas {
		position: fixed !important;
		top: 0 !important;
		left: 0 !important;
		display: block !important;
		width: 100% !important;
		height: 100% !important;
		z-index: 10;
	}
</style>
