<template>
	
			<view>
			<uni-section style="height: 7vh;" title="选择员工" type="line" />
			<view class="item-t" v-for="(item, index) in staffList" :key="index"
			        @click="viewAccount(item)"
			>
				<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
					<view style="margin-bottom: 3px;">
						<text>{{  item.name }}</text>
					</view>
					<view style="margin-bottom: 3px;">
						<text>{{  item.phone }}</text>
					</view>					
				</view>
			</view>
		</view>
</template>

<script>
import {viewStaff } from '../../api/tour/tour.js';
	export default {

		data() {
			return {
				staffList:[],
				productId:''
			};
		},
	onLoad: function(option) {
		this.productId = option.productId;

	},
		onShow() {
			viewStaff().then(res => {
				this.staffList = res.data


			});
		},
		methods: {
				viewAccount(item){
					uni.navigateTo({
						url: '/pages/tour/addOrder?productId='+this.productId+'&staffId='+item.staffId+'' 
					})											
		},
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
</style>
