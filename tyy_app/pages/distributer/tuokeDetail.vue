<template>
			<view>
			<uni-section style="height: 7vh;" title="游客浏览信息" type="line" />
			<view class="item-t" v-for="(item, index) in touList" :key="index"
			>
				<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
						<view style="margin-bottom: 3px;color: blue;"  @click="call(item.phone)">{{  item.phone }}</view>
					<view style="margin-bottom: 3px;">
						<text>{{  item.viewTime }}</text>
					</view>					
				</view>
			</view>
		</view>
</template>

<script>
import { tuokeDetail } from '../../api/guider/guider.js';
	export default {

		data() {
			return {
				code:'',
				productId:'',
				touList:[]
			};
		},

		onLoad(options) {
			this.code = options.code
			this.productId = options.productId
			tuokeDetail({code:this.code,productId:this.productId}).then(res => {
			this.touList = res.data
			});
		},
		methods: {
		call(phoneNum){
 	uni.makePhoneCall({
 	
 	// 手机号
    phoneNumber: phoneNum

		});
		},
		},
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
