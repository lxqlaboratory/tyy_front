<template>
	
			<view>
			<uni-section style="height: 7vh;" title="选择团队" type="line" />
			<view class="item-t" v-for="(item, index) in groupList" :key="index"
			        @click="viewAccount(item)"
			>
				<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
					<view style="margin-bottom: 3px;">
						<text>{{  item.proName }}</text>
					</view>
					<view style="margin-bottom: 3px;">
						<text>{{  item.groupName }}</text>
					</view>
					<view style="margin-bottom: 3px;">{{  item.groupDate }}</view>
				</view>
			</view>
		</view>
</template>

<script>
import {viewGroupForOpinion } from '../../api/guider/guider.js';
	export default {

		data() {
			return {
				groupList:[],

			};
		},

		onShow() {
			viewGroupForOpinion().then(res => {
				this.groupList = res.data
			});
		},
		methods: {
				viewAccount(item){
			uni.navigateTo({
				url: '/pages/guider/viewAccount?groupId='+item.groupId+'&groupName='+item.groupName+''
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
