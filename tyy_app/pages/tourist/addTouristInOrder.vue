<template>
	<view style="margin-bottom: 20px;">
		<uni-section title="姓名" type="line" />
		<view class="form-item">
			<view class="input-container">
				<input type="text" class="item-input" placeholder="请输入姓名" v-model="name" required = "true" />
			</view>
		</view>	
		<uni-section title="手机号" type="line" />
		<view class="form-item">
			<view class="input-container">
				<input type="text" class="item-input" placeholder="请输入手机号" v-model="phone" required = "true" />
			</view>
		</view>	
		<uni-section title="性别" type="line" />
		<view class="form-item">
			<radio-group class="label-container" @change="radioChange">
					<label class="question"  style="width: 200upx;">
						<radio value="1" />
					    <view style="width: 100upx;margin:10upx 0 0 20upx">男
					    </view>
					</label>
					<label class="question"  style="width: 200upx;">
						<radio value="0"  />
					    <view style="width: 100upx;margin:10upx 0 0 20upx">女
					    </view>
					</label>					
			</radio-group>
			</view>		
		<uni-section title="身份证号" type="line" />
		<view class="form-item">
			<view class="input-container">
				<input type="text" class="item-input" placeholder="请输入身份证号" v-model="cerNum" required = "true" />
			</view>
		</view>	
		<uni-section title="与该游客关系" type="line" />
		<view class="form-item">
			<view class="input-container">
				<input type="text" class="item-input" placeholder="选填" v-model="relatenode" required = "true" />
			</view>
		</view>	
				
		<uni-section title="类型" type="line" />
		<view class="form-item">
			<picker class="input" @change="bindchange($event)" :value="index" :range="portList" :range-key="'ticketTypeName'"
			>
			<view class="uni-input">{{portList[index].ticketTypeName+portList[index].setPrice}}元</view>
		</picker>
		</view>			
		<button class="confirm-btn" @click="submit" >提交</button>
	</view>
</template>

<script>
		import {
				addTouristInOrder,getPortByCode
	} from '../../api/tour/tour.js';
	export default {
		data() {
			return {
				name:'',
				phone:'',
				cerNum:'',
				age:'',
				sex:'',
				productId:'',
				relatenode:'',
				identity:'',
				portList:[],
				index:0,
				setPrice:''
			};
		},	
		onLoad(option) {
			this.planId = option.planId;
			this.orderId = option.orderId;
			getPortByCode({ planId:this.planId,orderId:this.orderId })
			.then(res => {
				this.portList = res.data;
			})
			.catch(err => {});		
		},
		methods: {
			
			
			 radioChange: function(e) {
				 this.sex = e.detail.value
            },
			bindchange:function(e){
				 this.identity = Number(this.portList[e.target.value].ticketTypeId)
				 this.touristId = Number(this.portList[e.target.value].touristId)
				 this.index = e.target.value
				 this.setPrice =this.portList[e.target.value].setPrice
			},			
			
			submit: function(){
				var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
				var idCardReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
				if (this.name === '') {
							  uni.showModal({
							      title: '提示',
							  	showCancel: false,
							  	confirmColor: "#000000",
							      content: '姓名不能为空',
							      success: function (res) {
							          if (res.confirm) {
							  	     
							          } 
							      }
							  });						
				} else if (!myreg.test(this.phone||!this.phone)) {
				//        wx.showToast({
				//      title: '手机号有误！',
				//      icon: 'none',
				//      duration: 1500
				//     })
							  uni.showModal({
							      title: '提示',
							  	showCancel: false,
							  	confirmColor: "#000000",
							      content: '手机号有误',
							      success: function (res) {
							          if (res.confirm) {
							  	     
							          } 
							      }
							  });				
				 }else if (this.sex === ''){
							  uni.showModal({
							      title: '提示',
							  	showCancel: false,
							  	confirmColor: "#000000",
							      content: '请选择性别',
							      success: function (res) {
							          if (res.confirm) {
							  	     
							          } 
							      }
							  });
				}else if (!this.cerNum || !idCardReg.test(this.cerNum)){
							  uni.showModal({
							      title: '提示',
							  	showCancel: false,
							  	confirmColor: "#000000",
							      content: '身份证号有误',
							      success: function (res) {
							          if (res.confirm) {
							  	     
							          } 
							      }
							  });
				}else if (this.identity==''||this.identity==0){
							  uni.showModal({
							      title: '提示',
							  	showCancel: false,
							  	confirmColor: "#000000",
							      content: '请选择游客类型',
							      success: function (res) {
							          if (res.confirm) {
							  	     
							          } 
							      }
							  });
				}else{
				 addTouristInOrder({planId:this.planId,setPrice:this.setPrice,name:this.name,phone:this.phone,cerNum:this.cerNum,sex:this.sex,relatenode:this.relatenode,orderId:this.orderId,identity:this.identity}).then(res=>{
							 	if(res.status === 1){
							 		uni.showModal({
							 		    title: '提示',
							 			showCancel: false,
							 			confirmColor: "#000000",
							 		    content: '添加成功',
							success: function(res) {
							 		        if (res.confirm) {
							 			        // uni.navigateBack()
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 2]; // 前一个页面
				console.log("beforePage",beforePage);
				console.log(pages);
				uni.navigateBack({
					delta: 1,
				    success: function() {
				        beforePage.$vm.refreshRequest(); // 执行前一个页面的刷新
				    }
				});
							 		        } 
							}
							 		});
							 		}else{
					uni.showModal({
					    title: '提示',
						showCancel: false,
						confirmColor: "#000000",
					    content: res.errMessage,
					    success: function (res) {
					        if (res.confirm) {
						     
					        } 
					    }
					});						
					}	
							 	})
						 }
				}
	},
	}
</script>

<style lang="scss">	
	.red{
		color: #f55347;
	}
	.form-item{
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		align-items: left;
		height: auto;
		color: #777777;
		border-bottom: 2px solid #FFFFFF;
		.item-title{
			margin-top: 10px;
		}
		.label-container{
			// border: 1px solid #007AFF;
			// width: 700px;
			align-items: left;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			margin-left: 25rpx;
			// margin-right: 25rpx;
			margin-top: 10px;
			.question{
				display: flex;
				flex-direction: row;
				margin-left: 10upx;
				align-items: left;
				// border: 1px solid #007AFF;
			}
		}
		.input-container{
			width: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			height: auto;
			flex-direction: row;
			flex-wrap: wrap;			
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
	}	
	.confirm-btn{
	width: 630upx;
	height: 76upx;
	line-height: 76upx;
	border-radius: 50px;
	margin-top: 120upx;
	background: $uni-color-primary;
	color: #fff;
	font-size: $font-lg;
	&:after{
		border-radius: 100px;
	}
	}
</style>
