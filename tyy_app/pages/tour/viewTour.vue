<template>
	<view class="form-item">
<!-- 		<view style="display : flex ; flex-flow : row;flex-direction:row-reverse">
			<view class="item-title" style="width: 300upx;color: red;text-align: center;" @click="addTouristInOrder()">新增游客</view>
		</view> -->
		<uni-section title="报名情况" type="line" />
		<view class="form-item"  >			
			<view style="display : flex ; flex-flow : row;">
					<view style="text-align: center;margin-left: 10upx;">计划人数:{{ numList.sumNum }}</view>
					<view style="text-align: center;margin-left: 10upx;">已报人数:{{ numList.planNum }}</view>
					<view style="text-align: center;margin-left: 10upx;">剩余人数:{{ numList.remainNum }}</view>
					<view class="item-title" style="width: 300upx;color: blue;text-align: right;" >
						<button type="primary" style="width: 90%;" @click="addTouristInOrder" >新增游客</button>
					</view>
		</view>			
		</view>

		<uni-section title="游客列表" type="line" />
		<view class="item-t" v-for="(item, index) in tourList" :key="index">
			<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
				<view style="margin-bottom: 3px;">
					<text>姓名:{{ item.tourName }}</text>
				</view>
				<view style="margin-bottom: 3px;">手机号:{{ item.phone }}</view>
				<view style="margin-bottom: 3px;">身份证号:{{ item.cerNum }}</view>
				<view style="margin-bottom: 3px;">性别:{{item.sex>0?'男':'女'}}</view>
				<view style="margin-bottom: 3px;">年龄:{{ item.age }}</view>
				<view style="margin-bottom: 3px;">关系:{{ item.relateNode }}</view>
				<view style="margin-bottom: 3px;">类型:{{  item.ticketTypeName }}</view> 
				<view style="margin-bottom: 3px;">费用:{{  item.setPrice }}</view>  				
			</view>
		</view>
		
	</view>
</template>

<script>
import {viewTour,addTouristInOrder,getPlanNum } from '../../api/tour/tour.js';
	export default {

		data() {
			return {
				tourList:[],
				touristIds:'',
				planId:'',
				orderId:'',
				numList:[]
			};
		},

		onLoad(options) {
			this.touristIds = options.touristIds
			this.planId = Number(options.planId)
			this.orderId = options.orderId
			viewTour({  touristIds: this.touristIds,planId:this.planId,orderId:this.orderId })
			.then(res => {
				this.tourList = res.data;
			})
			.catch(err => {});	
		getPlanNum({planId:this.planId})
			.then(res => {
				this.numList = res.data;
			})
			.catch(err => {});						
		},
		onShow() {
			this.tourList =[]
			viewTour({  touristIds: this.touristIds,planId:this.planId,orderId:this.orderId })
			.then(res => {
				this.tourList = res.data;
			})
			.catch(err => {});
		getPlanNum({planId:this.planId})
			.then(res => {
				this.numList = res.data;
			})
			.catch(err => {});					
		},
		methods: {
			refreshRequest(){
						this.tourList =[]
			viewTour({  touristIds: this.touristIds,planId:this.planId,orderId:this.orderId })
			.then(res => {
				this.tourList = res.data;
			})
			.catch(err => {});	
		getPlanNum({planId:this.planId})
			.then(res => {
				this.numList = res.data;
			})
			.catch(err => {});					
				},
			
			addTouristInOrder:function(){
													uni.navigateTo({
					url:
						'/pages/tourist/addTouristInOrder?planId='+this.planId+'&orderId='+this.orderId+''
						
				});
			}
		
				
		}
	}
</script>

<style lang="scss">
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
  	align-items: left;
  	height: auto;
  	background-color: white;
  	.item-title {
  		margin-top: 10px;
  	}
  }
  .item-t {
  	padding: 15px;
  	margin-left: 10upx;
  	margin-right: 10upx;
  	border: 2px solid DarkGray;
  	display: flex;
  	flex-direction: row;
  	justify-content: space-between;
  	align-items: center;
  }
</style>
