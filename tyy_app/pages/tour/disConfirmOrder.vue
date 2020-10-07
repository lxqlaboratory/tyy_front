<template>
	<view class="app">
		<view class="price-box">
			<text>订单编号</text>
			<text class="price">{{code}}</text>
		</view>
		
		<view class="pay-type-list">
		<view class="adBaseView">
			<view class="adRowView">
				<view class="headView">选择公司员工</view>
				<view style="width: 70%;"><picker class="input" @change="bindchange" :value="index" :range="personList" :range-key="'label'">
								<view class="uni-input">{{personList[index].label}}</view>
							</picker></view>
			</view>
			<view class="bottomLine"/>
		</view>	
		
		</view>
		<text class="mix-btn" @click="confirm">确认</text>
		</view>
</template>

<script>
	import {
		getWorkersInit
	} from '../../api/product/product.js';
	import {
		setOrderDisWork
	} from '../../api/product/product.js';
	export default {
		data() {
			return {
				code:'',
				index: 0,
				value:'',
                 orderId:'',
				 productId:'',
				personList: []
			};
		},
		onLoad(options) {
			this.code = options.code
				this.orderId = options.orderId
				this.productId = options.productId
			getWorkersInit().then(res => {
				this.personList = res.data.personList;
				this.index = res.data.index;
				this.value = this.personList[this.index].value
			});
			
		},
		methods: {
			confirm() {
				setOrderDisWork({workerId:this.value,code:this.code,orderId:this.orderId,productId:this.productId}).then(res => {
					uni.showModal({
					    title: '提示',
						showCancel: false,
						confirmColor: "#000000",
					    content: res.data,
					    success: function (res) {
					        if (res.confirm) {
						        uni.navigateBack()
					        } 
					    }
					});
					
				});
			},
	         bindchange(e){
	         	 this.index = e.target.value
	         	 
	         	this.value = this.personList[this.index].value
				console.log(this.value)
	         }
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
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
		overflow:hidden; /*超出的部分隐藏起来。*/ 
		white-space:nowrap;/*不显示的地方用省略号...代替*/
		text-overflow:ellipsis;/* 支持 IE */
		
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
