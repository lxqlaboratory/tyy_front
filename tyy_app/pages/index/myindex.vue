<template>
	<view  >
		<view class="header">
			<view class="input-view">
				<uni-icons type="search" size="22" color="#666666" />
				<input confirm-type="search" class="input" type="text" placeholder="输入搜索关键词" @confirm="confirm">
			</view>
		</view>
		<view >
			<uni-section title="产品" type="line"></uni-section>
			<view class="example-body">
				<button @click="showDrawer('showRight')" type="primary" class="button1"> 筛选</button>
				<uni-drawer ref="showRight" mode="right" :mask-click="false" @change="change($event,'showRight')">
					<view class="scroll-view">
						<scroll-view class="scroll-view-box" scroll-y="true">
							<view class="info">
								<text class="info-text">选择产品类型</text>
							</view>
							<view class="example-body">
							
								<view class="tag-view">
									<uni-tag  :circle="true" :inverted="inverted" text="热销"  type="primary" @click="setInvertedR" />
								</view>
								<view class="tag-view">
									<uni-tag  :circle="true" :inverted="inverted1" text="特价"  type="primary" @click="setInvertedT" />
								</view>
					<view class="tag-view">
						<uni-tag :circle="true" :inverted="inverted2" text="最新" type="primary" @click="setInvertedZ" />
					</view>
							</view>
							
							<view class="info">
										<text class="info-text">选择价格区间</text>
									</view>
									<view class="section1">
										<input class="input1" />元~<input class="input1" />元
									</view>
							
							
							<view class="info">
										<text class="info-text">选择行程天数</text>
									</view>
									<view class="example-body">
									
										<view class="tag-view">
											<uni-tag :inverted="inverted10" :circle="true" text="一日游" type="primary" @click="setInvertedOne" />
										</view>
										<view class="tag-view">
											<uni-tag :inverted="inverted11"  :circle="true" text="两日游" type="primary" @click="setInvertedTwo" />
										</view>
							<view class="tag-view">
								<uni-tag :circle="true" :inverted="inverted12" text="三日游" type="primary" @click="setInvertedTree" />
							</view>
							<view class="tag-view">
											<uni-tag :inverted="inverted13" :circle="true" text="四日游" type="primary" @click="setInvertedFour" />
										</view>
										<view class="tag-view">
											<uni-tag :inverted="inverted14" :circle="true" text="五日游" type="primary" @click="setInvertedFive" />
										</view>
							<view class="tag-view">
								<uni-tag :circle="true" :inverted="inverted15" text="六日游" type="primary" @click="setInvertedSix" />
							</view>
							<view class="tag-view">
											<uni-tag :inverted="inverted16" :circle="true" text="七日游" type="primary" @click="setInvertedSeven" />
										</view>
										<view class="tag-view">
											<uni-tag :inverted="inverted17" :circle="true" text="七以上" type="primary" @click="setInvertedMore" />
										</view>
					
									</view>
							
							
							<view class="close">
								<view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70" @click="closeDrawer('showRight')"><text class="word-btn-white">确定</text></view>
							</view>
						</scroll-view>
					</view>
				</uni-drawer>
			</view>
			
			<view class="f-header m-t">
				<image src="/static/temp/h1.png"></image>
				<view class="tit-box">
					<text class="tit">好景点</text>
					<text class="tit2">Good  JingDian</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<view class="group-section">
				<swiper class="g-swiper" :duration="500">
					<swiper-item
						class="g-swiper-item"
						v-for="(item, index) in goodsList" :key="index"
						v-if="index%2 === 0"
						@click="navToDetailPage(item)"
					>
						<view class="g-item left">
							<image src="/static/jiuru.png" mode="aspectFill"></image>
							<view class="t-box">
								<text class="title clamp">九如山瀑布</text>
								<view class="price-box">
									<text class="price">￥24</text> 
									<text class="m-price">￥188</text> 
								</view>
								
								<view class="pro-box">
								  	<view class="progress-box">
								  		<progress percent="72" activeColor="#fa436a" active stroke-width="6" />
								  	</view>
									<text>6人成团</text>
								</view>
							</view>
							            
						</view>
					</swiper-item>
			
				</swiper>
			</view>
			
			
		</view>
	</view>
</template>


<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import {test} from "../../api/base/baseApi.js"
	export default {
		   components: {uniDrawer,uniTag},
		data() {
			return {
				showRight: false,
				showLeft: false,
				type: 'default',
				inverted: true,
				inverted1: true,
				inverted2: true,
				inverted3: true,
				inverted4: true,
				inverted5: true,
				inverted6: true,
				inverted7: true,
				inverted8: true,
				inverted9: true,
				inverted10: true,
				inverted11: true,
				inverted12: true,
				inverted13: true,
				inverted14: true,
				inverted15: true,
				inverted16: true,
				inverted17: true,
				goodsList: []
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
		
			async loadData() {
				let carouselList = await this.$api.json('carouselList');
				this.titleNViewBackground = carouselList[0].background;
				this.swiperLength = carouselList.length;
				this.carouselList = carouselList;
				
				let goodsList = await this.$api.json('goodsList');
				console.log(goodsList)
				this.goodsList = goodsList || [];
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].background;
			},
			//详情页
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.title;
				uni.navigateTo({
					url: `/pages/product/tourDetail?id=${id}`
				})
			},
			confirm() {},
			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
			},
			setInvertedR() {
				this.inverted = !this.inverted;
			},
			setInvertedT() {
				this.inverted1 = !this.inverted1;
			},
			setInvertedZ() {
				this.inverted2 = !this.inverted2;
			},
			setInverted2() {
				this.inverted3 = !this.inverted3;
			},
			setInverted4() {
				this.inverted4 = !this.inverted4;
			},
			setInverted5() {
				this.inverted5 = !this.inverted5;
			},
			setInverted10() {
				this.inverted6 = !this.inverted6;
			},
			setInverted15() {
				this.inverted7 = !this.inverted7;
			},
			setInverted30() {
				this.inverted8 = !this.inverted8;
			},
			setInverted10000() {
				this.inverted9 = !this.inverted9;
			},
			setInvertedOne() {
				this.inverted10 = !this.inverted10;
			},
			setInvertedTwo() {
				this.inverted11 = !this.inverted11;
			},
			setInvertedTree() {
				this.inverted12 = !this.inverted12;
			},
			setInvertedFour() {
				this.inverted13= !this.inverted13;
			},
			setInvertedFive() {
				this.inverted14 = !this.inverted14;
			},
			setInvertedSix() {
				this.inverted15 = !this.inverted15;
			},
			setInvertedSeven() {
				this.inverted16 = !this.inverted16;
			},
			setInvertedMore() {
				this.inverted17 = !this.inverted17;
			}
		},
		onShow(){
			// test().then(res=>{
			// 	console.log(res)
			// }).catch(error=>{
			// 	console.log(error)
			// }) 
		}
		
	}
</script>

<style lang="scss">


	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}
    .button1{
		width: 50%;
		display: flex;
	
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 28px;
		margin: 15px;
		margin-top: 3upx;
	}
    .f-header{
    	display:flex;
    	align-items:center;
    	height: 140upx;
    	padding: 6upx 30upx 8upx;
    	background: #fff;
    	image{
    		flex-shrink: 0;
    		width: 40upx;
    		height: 40upx;
    		margin-right: 10upx;
    	}
    	.tit-box{
    		flex: 1;
    		display: flex;
    		flex-direction: column;
    	}
    	.tit{
    		font-size: $font-lg +2upx;
    		color: #font-color-dark;
    		line-height: 1.3;
    	}
    	.tit2{
    		font-size: $font-sm;
    		color: $font-color-light;
    	}
    	.icon-you{
    		font-size: $font-lg +2upx;
    		color: $font-color-light;
    	}
    }
.group-section{
		background: #fff;
		.g-swiper{
			height: 400upx;
			padding-bottom: 30upx;
		}
		.g-swiper-item{
			width: 100%;
			padding: 0 30upx;
			display:flex;
		}
		image{
			width: 100%;
			height: 300upx;
			border-radius: 4px;
		}
		.g-item{
			display:flex;
			flex-direction: column;
			overflow:hidden;
		}
		.left{
			flex: 1.2;
			margin-right: 24upx;
			.t-box{
				padding-top: 20upx;
			}
		}
		.right{
			flex: 0.8;
			flex-direction: column-reverse;
			.t-box{
				padding-bottom: 20upx;
			}
		}
		.t-box{
			height: 160upx;
			font-size: $font-base+2upx;
			color: $font-color-dark;
			line-height: 1.6;
		}
		.price{
			color:$uni-color-primary;
		}
		.m-price{
			font-size: $font-sm+2upx;
			text-decoration: line-through;
			color: $font-color-light;
			margin-left: 8upx;
		}
		.pro-box{
			display:flex;
			align-items:center;
			margin-top: 10upx;
			font-size: $font-sm;
			color: $font-base;
			padding-right: 10upx;
		}
		.progress-box{
			flex: 1;
			border-radius: 10px;
			overflow: hidden;
			margin-right: 8upx;
		}
	}
	.example {
		padding: 0 15px 15px;
	}
	.section1{
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
   .input1{
	   width: 30%;
		border-width: 1rpx; border-style: solid;
   }
	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
	
		display: flex;
	
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
		overflow: hidden;
	}


	.example {
		padding: 0 15px;
	}

	.example-info {
	
		display: block;
	
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}


	.example-body {
		flex-direction: column;
		padding: 18px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
	
		display: flex;

		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 28px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.header {
	
		display: flex;
	
		flex-direction: row;
		padding: 10px 15px;
		align-items: center;
		border-top-width: 1px;
		border-top-color: #f5f5f5;
		border-top-style: solid;
		background-color: #ffffff;
	}

	.input-view {

		display: flex;

		align-items: center;
		flex-direction: row;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 10px;
		flex: 1;
		background-color: #f5f5f5;
	}

	.uni-drawer-info {
		background-color: #ffffff;
		padding: 15px;
		padding-top: 5px;
		color: #3b4144;
	}

	.uni-padding-wrap {
		padding: 0 15px;
		line-height: 1.8;
	}

	.input {
		flex: 1;
		padding: 0 5px;
		height: 24px;
		line-height: 24px;
		font-size: 14px;
		background-color: transparent;
	}

	.close {
		padding: 15px;
	}

	.example-body {

		display: flex;

		flex-direction: row;
		padding: 0;
	}

	.draw-cotrol-btn {
		flex: 1;
	}

	.info {
		padding: 15px;
		color: #666;
	}

	.info-text {
		font-size: 14px;
		color: #666;
	}

	.scroll-view {
		flex: 1
	}

	/* 处理抽屉内容滚动 */
	.scroll-view-box {
		flex: 1;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.info-content {
		padding: 5px 15px;
	}
	
</style>