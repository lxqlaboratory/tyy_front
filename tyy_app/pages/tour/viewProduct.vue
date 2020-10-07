<template>
	
			<view>
			<uni-section style="height: 7vh;" title="选择产品" type="line" />
			<view class="item-t" v-for="(item, index) in productList" :key="index"
			        @click="viewAccount(item)"
			>
				<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
					<view style="margin-bottom: 3px;">
						<text>{{  item.name }}</text>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
import {viewProduct } from '../../api/tour/tour.js';
	export default {

		data() {
			return {
				productList:[],
				type :''
			};
		},

		onShow() {
			viewProduct().then(res => {
				this.productList = res.data.data
				this.type = res.data.type

			});
		},
		methods: {
				viewAccount(item){
					if(this.type == "A"){
					uni.navigateTo({
						url: '/pages/tour/selectDis?productId='+item.proId+''
					})	
					}
					if(this.type == "B"){
					uni.navigateTo({
						url: '/pages/tour/selectAstaff?productId='+item.proId+''
					})	
					}
					if(this.type == "C"){
					uni.navigateTo({
						url: '/pages/tour/addOrder?productId='+item.proId+''
					})	
					}											
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
