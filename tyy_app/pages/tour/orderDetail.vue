<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额：{{price}}元</text>
			<input class="price" v-model="price"></input>
		</view>


	<view class="pay-type-list">

			<view class="type-item b-b" >
				<view class="con">
					<text class="tit2">集合地点:{{locationName}}</text>
				</view>
				
			</view>
			<view class="type-item b-b" >
				<view class="con">
					<text class="tit2">发团日期:{{date}}</text>
				</view>
				
			</view>
		
		</view>

		
		<text class="mix-btn" @click="confirm">确认支付</text>
	</view>
</template>

<script>
import {
		getOrderMoneyInit
	} from "../../api/product/product.js"
	import {
			setPayOrderMoney
		} from "../../api/product/product.js"
		import {
				setPayFinishOrder
			} from "../../api/product/product.js"
	export default {
		data() {
			return {
				orderId: '',
				price: '',
				realP: '',
				locationName:'',
				date:'',
				orderInfo: {},
				tourList:[],
				touristIds:[]
			};
		},
		computed: {
		
		},
		onLoad(options) {
			this.tourList =JSON.parse(decodeURIComponent(options.tourList)) ;
			this.touristIds =JSON.parse(decodeURIComponent(options.touristIds)) ;
			this.orderId = options.orderId;
			getOrderMoneyInit({orderId: this.orderId,tourList:this.tourList,touristIds:this.touristIds})
				.then(res => {
				 this.price = res.data.shudPay
				 this.date = res.data.date
				 this.locationName = res.data.locationName
	
				})
				.catch(err => {});
		},

		methods: {
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			confirm(){
				
				setPayOrderMoney({  orderId: this.orderId, price: this.price })
					.then(res => {
						if(res.data === ''){
							uni.showModal({
							    title: '提示',
								showCancel: false,
								confirmColor: "#000000",
							    content: '系统错误，发起支付失败',
							    success: function (res) {
							      
							    }
							});
						}else{
							this.data = JSON.parse(res.data)
							this.payinfo = JSON.parse(this.data.payinfo)
							var that = this
							wx.requestPayment({
								'timeStamp': this.payinfo.timeStamp,
								'nonceStr': this.payinfo.nonceStr,
								'package': this.payinfo.package,
								'signType': this.payinfo.signType,
								'paySign': this.payinfo.paySign,
								'success': function(res) {
									console.log(res.errMsg)
									if(res.errMsg === 'requestPayment:ok'){
										setPayFinishOrder({  orderId: that.orderId, price: that.price,chnltrxid: that.data.chnltrxid,cusid: that.data.cusid,reqsn: that.data.reqsn, trxid: that.data.trxid})
											.then(res => {
												if(res.data === '支付完成'){
													uni.navigateTo({
															url:'../product/paySuccess'
													})
												}
												})
									
									}
								},
								'fail': function(res) {
							if(res.errMsg == 'requestPayment:fail cancel'){
								uni.showModal({
								    title: '提示',
									showCancel: false,
									confirmColor: "#000000",
								    content: '用户取消支付，请重新支付',
								    success: function (res) {
								      
								    }
								});
							}else{
								uni.showModal({
								    title: '提示',
									showCancel: false,
									confirmColor: "#000000",
								    content: '系统错误，请重新支付',
								    success: function (res) {
								      
								    }
								});
							}
								},
								'complete': function(res) {
								}
							})
						}
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
					})
					.catch(err => {});
				}
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
			width: 30%;
			text-align: center;
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;
		
		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.icon-alipay {
			color: #01aaef;
		}
		.tit{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.tit2{
			font-size: $font-lg;
			color: $font-color-dark;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

</style>
