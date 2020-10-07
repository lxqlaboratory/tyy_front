<template>
	<view class="app">
		<view class="price-box">
			<text class="price">绑定分销商</text>
		</view>

		<view class="pay-type-list">

		
			<view class="type-item" >
				<view class="con">
					<text class="tit">请填写分销商</text>
					<input class="titIput" placeholder="请输入分销商手机号" v-model="phone"/>
				</view>
			</view>
		</view>
		
		<text class="mix-btn" @click="confirm">确认</text>
	</view>
</template>

<script>
import {tourSubmitOder} from "../../api/product/product.js"
	export default {
		data() {
			return {
				payType: 1,
				phone:'',
				orderInfo: {}
			};
		},
		computed: {
		
		},
		onLoad(options){
			this.productId = options.productId
		},

		methods: {
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			
			confirm: async function() {
				tourSubmitOder({productId:this.productId,phone:this.phone}).then(res => {
					if(res.data === "分销商不存在"){
						uni.showModal({
						    title: '提示',
							showCancel: false,
							confirmColor: "#000000",
						    content: res.data,
						    success: function (res) {
						        if (res.confirm) {
							        
						        } 
						    }
						});
					}else {
						console.log(res.data)
				uni.navigateTo({
					url: '../tour/tourFinishOrder?productId='+this.productId+'&&orderId='+res.data+''
				})
					}
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
		
		.titIput{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
			border: 1px solid rgba(219, 63, 96, 0.4);
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
