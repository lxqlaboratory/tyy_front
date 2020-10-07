<template>
	<view class="container">
		<view class="set_box" v-for="(item,index) in jorunalList" :key="index">
			<view class="set_time">
				<view>{{item.createTime}}</view>
			</view>
			<!-- 步骤条 -->
			<view class="set-1">
				<view class="set-2">
					<view class="tlak_o">
						<view class="user like_">
							<view class="user_say like_o">
								<view class="user_head like_h">
									<text class="doc_name name_">{{item.title}}</text>
								</view>
								<view class="user_talk like_talk">
									<text>{{item.content}}</text>
									<view class="like_img" v-if="item.photo">
										<image :src="pic" v-for="pic in item.photo" @tap="_previewImage(pic)"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
		import { viewJournalTitle } from '../../api/guider/guider.js';
	
	export default {
		data() {
			return {
				jorunalList:[],
				talk: [{
						"id": 1,
						"MMDD": "1月21",
						"data": [{
							"doc": {
								"d_name": "张三",
								"HMS": "10:30:48",
								"talk": "测试数据测试数据测试数据测试数据"
							},
							"user": {
								"u_name": "李四",
								"HMS": "10:20:18",
								"talk": "测试数据测试数据测试数据",
								"imgUrl": ["/static/temp/c6.png", "/static/temp/c6.png",
									"/static/temp/c6.png"
								]
							}
						}]
					},
					{
						"id": 2,
						"MMDD": "1月20",
						"data": [{
								"doc": {
									"d_name": "张三",
									"HMS": "10:30:48",
									"talk": "测试数据测试数据测试数据测试数据"
								},
								"user": {
									"u_name": "李四",
									"HMS": "10:30:22",
									"talk": "测试数据测试数据测试数据测试数据",
									"imgUrl": ["/static/temp/c6.png", "/static/temp/c6.png",
										"/static/temp/c6.png"
									]
								}
							},
							{
								"doc": {
									"d_name": "张三",
									"HMS": "10:29:02",
									"talk": "测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据"
								},
								"user": {
									"u_name": "李四",
									"HMS": "10:29:10",
									"talk": "测试数据测试数据测试数据",
									"imgUrl": ["/static/temp/c6.png", "/static/temp/c6.png",
										"/static/temp/c6.png"
									]
								}
							}
						]
					}
				]
			}
		},
		onLoad() {
				viewJournalTitle().then(res => {
				this.jorunalList = res.data;
			});
		},
		methods: {
			
							_previewImage(image) {
				var imgArr = [];
				imgArr.push(image);
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
				});
			},
		}
	}
</script>

<style lang="scss">
	.set_box {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
	}

	/* 左侧时间 */
	.set_time {
		width: 10%;
		position: relative;

		view {
			width: 120%;
			position: absolute;
			margin-top: 60upx;
			right: -40rpx;
			color: #999999;
		}

	}


	/* 右侧内容 */


	.set-1 {
		width: 90%;
	}

	.set-2 {
		min-height: 300upx;
		border-radius: 10upx;
		width: 84%;
		margin-left: 100upx;
		margin-top: 60upx;
		padding-right: 10rpx;
		position: relative;

		.tlak_o {
			width: 100%;
			min-height: 300upx;

			.like_ {
				width: 100%;
				min-height: 100rpx;

				.like_o {
					width: 100%;
					height: 100%;

					.like_h {
						color: #999999;

						.name_ {
							margin-right: 20rpx;
							font-size: 32rpx;
						}

						.time_ {
							font-size: 24rpx;
						}
					}

					.like_talk {
						width: 95%;
						min-height: 100rpx;
						margin: 0 30rpx;

						text {
							color: #333333;
						}

						.like_img {
							width: 100%;
							min-height: 100rpx;
							display: flex;
							justify-content: flex-start;
							flex-wrap: wrap;

							image {
								width: 30%;
								height: 180rpx;
								margin-bottom: 20rpx;
								margin-right: 2%;
							}
						}
					}
				}
			}
		}
	}

	.set-2::after {
		content: '';
		/* 必须存在如果没有图标就留空 */
		top: -20upx;
		/* 定位 距离*/
		border-left: #c6c6c6 1px solid;
		/* 横线颜色 */
		left: -44upx;
		/* 定位 距离*/
		height: 120%;
		/* 高度 */
		position: absolute;
		/* 定位 */
	}

	.set-2::before {
		content: "\e64d";
		/* 必须存在如果没有图标就留空 */
		color: #c6c6c6;
		/* 设置颜色 */
		position: absolute;
		/* 定位 */
		left: -70upx;
		top: -20upx;
		/* 移动到左边 */
		font-weight: bold;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		font-family: "iconfont" !important;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		font-size: 54upx;
		/* 图标大小 */
		font-style: normal;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		-webkit-font-smoothing: antialiased;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		-moz-osx-font-smoothing: grayscale;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
	}

	@font-face {
		font-family: "iconfont";
		src: url('//at.alicdn.com/t/font_1337773_f06f5a7las.eot?t=1565581133395');
		/* IE9 */
		src: url('//at.alicdn.com/t/font_1337773_f06f5a7las.eot?t=1565581133395#iefix') format('embedded-opentype'),
			/* IE6-IE8 */
			url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAOIAAsAAAAAB8QAAAM7AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDMgqCRIIjATYCJAMUCwwABCAFhG0HZhvNBsiemjwJqJERRCC3tX4YOM4iqNbCnr29uw8wKGBUsUAKqDyCjY5HcEzCALron1wr8wDk8hKBFpIc5yaXfWZJoIBIQkF1KlvVqWuFfZ3c/CBw0p8fcMJJsQY6uIuEMk8188LgXgfHTJceiXlrm0tGajTgaMCz2T6yyf5BXh+Ef9BdxMSIS9cTaKmvYGbzFhRXA1sZ2C0QO7cRAdhadnmkNTSEqufYLM4qNdKx9AJn+M/Hb2OiQVIWwL6rNufIIP1bj29voaZspAiK/byITqLAaEAmdvX6d7KQ+dEstCw2tjQL0FJDkvZald8e//3y+WglCIaW0E/e5R8vERWvuTWY5RYy3/ywXBtKXBEF395EBN++FCQ8V5CWsmEt4CBgHMz1Ad8rde7s2LbD7oUhT3l+eWHbhxwOB+LFrfkVL7I3FIAWdpdWvfHiYt8FltYWdzy1Pz/WfPhQ/elT7efPvUJiVlRsIj8+18X3az7+5Wb48vVrbnvo7OndVe1cPc55k2ebWG7OmMgYX01bT3vJnNlJWtemes0mn3vI/PJl80NQQqVErfcH/Ys5Fy3evrVoyyZNDLSq/cp5EyYsKTbb69bD/+5fmPs/cFwxG9ABoCNdTY+AKrwdi2npHk0Xu4vMH/Q7Wl+4+Yftkv83kMHXTiVutOlsnh68ZYPZit+hmDmRSxVwlDnvxvI8WOq3gz4VCy3xE8Id/d7H2GV2M6Ghi4ak1gcKDYORGTsaSq2Mg0rDTGhplLyTW+mEsRC5BUYadyC0dwpJWw+h0N53ZMb+glJX/6DSPgpoaUN4nLOVobGtZdYuJHAkQ7EbqiVqwMjF7UVrJSKKTmCmitNrETOpUzAiNLxZykMGxPY4wNRBIjnHEDOqh7nOzZBOR6GRUQ2SeKiKc2NiWBju+6JQieqBvbkYRMAhMkjUDVKTUAaYzufsW99fCSEUOgI20rMQr4UwJurloQihwmcg8/SGWT3v8hKTDkQkjsMgjKH0oFzHi+hgnoKM/VtpIBIulGpF1ihRmDcLz9WHnm/Uv0BZNAD40zJSFJGjjEq77dsEg1ahKoF2qbupYvP0KNS2e69WbmucSNZAOpEa5XpUagAAAA==') format('woff2'),
			url('//at.alicdn.com/t/font_1337773_f06f5a7las.woff?t=1565581133395') format('woff'),
			url('//at.alicdn.com/t/font_1337773_f06f5a7las.ttf?t=1565581133395') format('truetype'),
			/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
			url('//at.alicdn.com/t/font_1337773_f06f5a7las.svg?t=1565581133395#iconfont') format('svg');
		/* iOS 4.1- */
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-yuandian:before {
		content: "\e64d";
	}

	.icon-dingweiweizhi:before {
		content: "\e619";
	}
</style>
