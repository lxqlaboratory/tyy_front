<template>
	<view>
		<uni-section style="height: 7vh;" title="历史线路" type="line" />
		<scroll-view scroll-y="true" style="width: 100%;height: 100vh">
		
			<view  class="item-t" v-for="(item, i) in list" vx:key="*this" >
			
				<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;" >
					<view style="margin-bottom: 3px;">{{ item.pername }}</view>
					<view>手机号：{{item.phone}}</view>
				</view>
				<view style="display: flex;flex-direction: column;justify-content: left;">
					
					<view style="color: #39B54A;" v-if="item.percentage === undefined">请设置分成比例</view>
                    <view style="color: red; " v-else >分成比例： {{item.percentage}}%</view>
				<view class="f-button"  @click="chakan(item.adminId)" >
				
					编辑比例</view>
				</view>
			</view>
		
		</scroll-view>
	</view>
</template>

<script>
	import { getFollowYewuyuan } from '../../api/guider/guider.js';
	export default {
		data() {
			return {
				longitude: '',
				latitude: '',
				list: []
			};
		},
		onShow() {
			getFollowYewuyuan().then(res => {
				this.list = res.data;
			});
		},
		methods:{
			chakan(adminId){
				uni.navigateTo({
					url: './eidetPercentage?adminId='+adminId+''
						
				});
			}
			
		}
		}
</script>

<style scoped>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
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
	.f-button {
		font-size: 13px;
		padding: 5px 15px;
		background-color: WhiteSmoke;
		color: Black;
		border-radius: 5px;
		border: 1px solid Gray;
	}
</style>
