<template>
	<view>
		<uni-section title="创建团队" type="line"/>
		<view class="adBaseView">
				<view class="adRowView">
					<view class="headView">团队名称</view>
					<view style="width: 70%;"><input  class="input" v-model="groupName" placeholder="请输团队名称" /></view>
				</view>
				<view class="bottomLine"/>
		</view>
		
		<view class="adBaseView">
			<view class="adRowView">
				<view class="headView">选择导游类型</view>
				<view style="width: 70%;"><picker class="input" @change="bindchange" :value="index" :range="guiderTypeList" :range-key="'label'">
								<view class="uni-input">{{guiderTypeList[index].label}}</view>
							</picker></view>
			</view>
			<view class="bottomLine"/>
		</view>	
		
		
		<view class="adBaseView">
			<view class="adRowView">
				<view class="headView">选择导游</view>
				<view style="width: 70%;"><picker class="input" @change="bindchange2" :value="index2" :range="guiderList" :range-key="'label'">
								<view class="uni-input">{{guiderList[index2].label}}</view>
							</picker></view>
			</view>
			<view class="bottomLine"/>
		</view>	
		
		<view class="adBaseView">
			<view class="adRowView">
				<view class="headView">选择车辆类型</view>
				<view style="width: 70%;"><picker class="input" @change="bindchange3" :value="index3" :range="carTypeList" :range-key="'label'">
								<view class="uni-input">{{carTypeList[index3].label}}</view>
							</picker></view>
			</view>
			<view class="bottomLine"/>
		</view>	
		
		
		<view class="adBaseView">
			<view class="adRowView">
				<view class="headView">选择车辆</view>
				<view style="width: 70%;"><picker class="input" @change="bindchange4" :value="index4" :range="carList" :range-key="'label'">
								<view class="uni-input">{{carList[index4].label}}</view>
							</picker></view>
			</view>
			<view class="bottomLine"/>
		</view>	
		<button type="primary" @click="submit">创建团队</button>
		</view>
</template>

<script>
	import {
		getGuider
	} from '../../api/group/group.js';
	import {
		getCarType
	} from '../../api/group/group.js';
	import {
		getGuiderInfo
	} from '../../api/group/group.js';
	import {
		getCarNameS
	} from '../../api/group/group.js';
	import {
		createGroup
	} from '../../api/group/group.js';
	export default {
		data() {
			return {
				groupName:'',
				index: 0,
				index2: 0,
				index3: 0,
				index4: 0,
				value:'',
				value2:'',
				value3:'',
				value4:'',
				planId:'2',
	             orderId:'',
				 productId:'',
				 carTypeList: [],
				 guiderList: [],
				 carList: [],
				guiderTypeList: []
			};
		},
		onLoad(options) {
			this.planId = options.planId
		getGuider().then(res => {
			this.guiderTypeList = res.data;
			this.index = 0;
			this.value = this.guiderTypeList[this.index].value
		});
			getCarType().then(res => {
				this.carTypeList = res.data;
				this.index3 = 0;
				this.value3 = this.carTypeList[this.index3].value
			});
		},
		methods: {
			submit(){
				if(this.groupName === ''||this.value1 === ''||this.value2 === ''||this.value3 === ''||this.value4 === ''){
					uni.showModal({
					    title: '提示',
						showCancel: false,
						confirmColor: "#000000",
					    content: '不能为空',
					    success: function (res) {
					        if (res.confirm) {
						       
					        } 
					    }
					});
					}else{
						createGroup({planId:this.planId,guiderId:this.value2,carId:this.value4,groupName:this.groupName}).then(res => {
					uni.showModal({
					    title: '提示',
						showCancel: false,
						confirmColor: "#000000",
					    content: '创建成功',
					    success: function (res) {
					        if (res.confirm) {
						       uni.navigateBack()
					        } 
					    }
					});
						});
					}
				},
	         bindchange(e){
	         	 this.index = e.target.value
	         	  
	         	 this.value = this.guiderTypeList[this.index].value
	         	 console.log(this.value)
				
				
				getGuiderInfo({guiderTypeId:this.value}).then(res => {
					this.guiderList = res.data;
					this.index2 = 0;
					this.value2 = this.guiderList[this.index2].value
				});
	         },
			 bindchange2(e){
				 this.index2 = e.target.value
				  
				 this.value2 = this.guiderList[this.index2].value
				 console.log(this.value2)
			 },
			 bindchange3(e){
				 this.index3 = e.target.value
				  
				 this.value3 = this.carTypeList[this.index3].value
				 console.log(this.value3)
				 getCarNameS({carTypeId:this.value3}).then(res => {
				 	this.carList = res.data;
				 	this.index4 = 0;
				 	this.value4 = this.carList[this.index4].value
				 });
			 },
			 bindchange4(e){
			 				 this.index4 = e.target.value
			 				  
			 				 this.value4 = this.guiderList[this.index4].value
			 				 console.log(this.value4)
			 },
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

