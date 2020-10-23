<template>
	<view>
		<drag-button :isDock="true" :existTabBar="false" firstText="保 存" secondText="计 划" @btnClick="savePlan" />
		<uni-section title="出团日期" type="line" />
		<view style="width: 100%;display: flex;align-items: center;justify-content: center;padding: 10px;font-size: 18;">{{travelDate}}</view>

		<uni-section title="基本信息" type="line" />
		<view class="sole-row-item">
			<view class="switch-container">
				<view>销售状态</view>
				<switch :checked='saleState' @change="saleStateChange" />
			</view>
		</view>
		<view class="sole-row-item">
			<view class="switch-container">
				<view>计划人数</view>
				<uni-number-box @change="personNumChange" min="1" :value="numLimit"></uni-number-box>
			</view>
		</view>
		<view class="form-item">
			<view class="item-title">集合地点</view>
			<checkbox-group class="label-container" @change="gatherChange($event)">
				<label class="question" style="width: 340rpx;" v-for="(option,index) in locationList" :key="index">
					<view>
						<checkbox :value="option.id" :checked="option.check" />
					</view>
					<view>{{option.locationName}}</view>
				</label>
			</checkbox-group>
		</view>
		<view class="form-item">
			<view class="item-title">销售端口</view>
			<checkbox-group class="label-container" @change="disChange($event)">
				<label class="question" style="width: 160rpx;" v-for="(option,index) in disList" :key="index">
					<view>
						<checkbox :value="option.id" :checked="option.check" />
					</view>
					<view>{{option.roleName}}</view>
				</label>
			</checkbox-group>
		</view>

		<uni-section title="结算项目" type="line" />
		<view class="seg-item">
			<view class="null-list" v-if="disSelectList.length==1">
				<text>尚未有销售端口</text>
			</view>
			<view class="seg-container" v-else>
				<uni-segmented-control :current="current" :values="disSelectList" @clickItem="segChange" style-type="button"
				 active-color="#007AFF"></uni-segmented-control>
				<view class="seg-content">
					<view class="null-list" v-if="current != 0">
						<text style="margin-right: 5px;">缺省结算策略</text>
						<switch style="margin-right: 5px;" :checked="disSelectList[current].isSpecial" @change="strategyChange" />
						<text>特殊结算策略</text>
					</view>
					<view class="add" v-if="disSelectList[current].isSpecial" @click="addAccount">
						<text style="color: #FFFFFF;">增加结算类型</text>
					</view>
				</view>
				<uni-swipe-action>
					<uni-swipe-action-item v-if="disSelectList[current].isSpecial" :disabled="index==0" v-for="(item,index) in disSelectList[current].planCharge"
					 :options="options1" :key=index @click="deleteAccount(item,index)">
						<!-- <view class="seg-content" v-if="areaItem.isSpecial" v-for="(item,index) in disSelectList[current].planCharge" :key=index> -->
						<view class="seg-content" style="background-color: #f1f1f1;">
							<view class="seg-row-container">
								<view class="seg-row"><text>结算类型</text>
								<!-- <input type="text" class="seg-input" :value="item.name" @input="accountInput($event,index,'name')" /> -->
								<view style="margin-left: 10upx;" >
									<picker class="input" @change="accountInput($event,index,'name',item)" :value="item.index1" :range="portList" :range-key="'dataItemName'"
									>
									<view class="uni-input">{{portList[item.index1].dataItemName}}</view>
								</picker>
								</view>	
								</view>
							</view>
							<view class="seg-row-container">
								<view class="seg-row"><text>结算价(同行价)</text><input type="number" class="seg-input" :value="item.retPrice" @input="accountInput($event,index,'retPrice')" /><text>元</text></view>
							</view>
							<view class="seg-row-container">
								<view class="seg-row"><text>参考价(外报价)</text><input type="text" class="seg-input" :value="item.setPrice" @input="accountInput($event,index,'setPrice')" /><text>元</text></view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getPlanInfo,
		addProductPlan,
		editProductPlan,
		getTicketTypeListForPlan,
		setTicketTypeListForPlan
	} from '../../api/product/plan.js';
	import {
		getLocations,
		getDisType
	} from '../../api/product/product.js';
	export default {
		data() {
			return {
				index1:0,
				options1: [{
					text: "删除",
					style: {
						backgroundColor: 'red',
					}
				}],
				TicketTypeList:[],
				proChargeList:[],
				list: [],
				current: 0,
				productId: null,
				planId:null,
				showMonth: false, // 以月份为背景
				money: 6.00,
				isFlag: true,
				totalAmount: 0.00,
				startDate: '2018-04-05', // limitFlag == true 有效 2020-04-05
				endDate: '2020-12-05', // limitFlag == true 有效 2020-04-25
				selectedDate: [],
				locationList: [],
				disList: [],
				disReceive:[],
				lastEList: [],
				disSelectList: [{
					portName: '默认',					
					portId: 0,
					planId: this.planId,
					planCharge: [{
						dataItemName: "请选择类型",
						retPrice: "0",
						setPrice:"0",
						dataItemNum: "0",
						index1:0
					}],
					isSpecial: true,						
				}],
				portList:[],
				limitFlag: false,
					proId: null,
					saleState: true,
					proLocation: [],
					disListStr: [],
					numLimit: 0,
					defalutPlanChargeStr: [],
					planDes: '',
					travelDate:'',

			};
		},
		onLoad: function(option) {
			this.productId = option.productId
			this.planId = option.planId
			console.log(this.planId)
				getTicketTypeListForPlan({productId:this.productId}).then(res => {
					this.portList = res.data;
				});					
		},
		onShow() {
			getLocations().then(res => {
				this.locationList = res.data;
				getDisType().then(res1 => {
					this.disList = res1.data;
				});
			});
				getPlanInfo({
					planId:this.planId
				}).then(res => {
					this.proLocation=JSON.parse(res.data.proLocation)
					this.numLimit=res.data.numLimit
					this.travelDate=res.data.travelDate
					this.disSelectList[0].planCharge=res.data.defaultCharge
					for (var i = 0; i < this.disSelectList[0].planCharge.length; i++) {
						for (var j = 0; j < this.portList.length; j++) {
							if ( this.disSelectList[0].planCharge[i].dataItemNum == this.portList[j].dataItemNum) {
									this.disSelectList[0].planCharge[i].index1 = j
							}
						}
					}
					if(res.data.saleState==0){
						this.saleState=false
					}
					for (var i = 0, lenI = this.proLocation.length; i < lenI; ++i) {
						for (var j = 0, lenJ = this.locationList.length; j < lenJ; ++j){
							if(this.proLocation[i]==this.locationList[j].id){
								this.locationList[j].check=true
							}
						}
					}
					var receiveDisList=res.data.proCharge
					for (var i = 0, lenI = receiveDisList.length; i < lenI; ++i) {
						this.disReceive.push(receiveDisList[i].portId)
						this.disSelectList.push(receiveDisList[i])
					}
					
					for (var i = 0, lenI = this.disReceive.length; i < lenI; ++i) {
						for (var j = 0, lenJ = this.disList.length; j < lenJ; ++j){
							if(this.disReceive[i]==this.disList[j].id){
								this.disList[j].check=true
							}
						}
					}
					for (var i = 1; i < this.disSelectList.length; i++) {
					for (var k = 0; k < this.disSelectList[i].planCharge.length; k++) {
						for (var j = 0; j < this.portList.length; j++) {
							if ( this.disSelectList[i].planCharge[k].dataItemNum == this.portList[j].dataItemNum) {
									this.disSelectList[i].planCharge[k].index1 = j
							}
						}
					}
				}
				
					this.lastEList=this.disReceive
				});

			
		},
		methods: {
			saleStateChange: function(e) {
				this.saleState = e.target.value
			},
			personNumChange(value) {
				this.numLimit = value
			},
			gatherChange: function(e) {
				this.proLocation = e.target.value
			},
			disChange: function(e) {
				// this.disSelectList=[{roleName:'缺省结算项目',planCharge:[],des:''}]
				// console.log(e)
				var eList = e.target.value
				console.log(e.target.value);
				// 销售端口增加
				if (eList.length > this.lastEList.length) {
					if (this.lastEList.length != 0) {
						for (var i = 0, lenI = eList.length; i < lenI; ++i) {
							var flag = 0
							for (var j = 0, lenJ = this.lastEList.length; j < lenJ; ++j) {
								if (eList[i] == this.lastEList[j]) {
									flag = 1
								}
							}

							if (flag == 0) {

								for (var k = 0, lenK = this.disList.length; k < lenK; ++k) {
									if (this.disList[k].id == eList[i]) {
										// item.title=this.disList[k].roleName
										var item = {	
											portId: eList[i],
											planId: this.planId,
											portName: this.disList[k].roleName,
											planCharge: [{
											dataItemName: '请选择游客类型',
											retPrice: "0",
											setPrice: "0",
											dataItemNum: "0",
											index1:0,
											}],
											isSpecial: true,										
										}

										this.disSelectList.push(item);
									}
								}
							}

						}
					} else {
						for (var i = 0, lenI = this.disList.length; i < lenI; ++i) {
							for (var j = 0, lenJ = eList.length; j < lenJ; ++j) {
								if (this.disList[i].id == eList[j]) {
									var item = {
											portId:this.disList[i].id,
											planId: this.planId,
											portName: this.disList[i].roleName,
											planCharge: [{
											dataItemName: '请选择游客类型',
											retPrice: "0",
											setPrice: "0",
											dataItemNum: "0",
											index1:0,
											}],
											isSpecial: true,																				
									}
									this.disSelectList.push(item);
								}
							}

						}
					}
				}
				// 销售端口减少
				else {
					for (var i = 0, lenI = this.lastEList.length; i < lenI; ++i) {
						var flag = 0
						for (var j = 0, lenJ = eList.length; j < lenJ; ++j) {
							if (eList[j] == this.lastEList[i]) {
								flag = 1
							}
						}

						if (flag == 0) {
							var delArea = ''
							for (var h = 0, lenH = this.disList.length; h < lenH; ++h) {
								if (this.disList[h].id == this.lastEList[i]) {
									delArea = this.disList[h].roleName
								}
							}
							console.log(this.lastEList[i])
							for (var k = 0, lenK = this.disSelectList.length; k < lenK; ++k) {
								if (this.disSelectList[k].portName == delArea) {
									
									this.disSelectList.splice(k, 1)
									this.lastEList = e.target.value
									this.current = 0
									this.areaItem = this.disSelectList[0]
									return
								}
							}
						}

					}
				}

				this.lastEList = e.target.value
				console.log(this.disSelectList)
			},
			segChange: function(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}			
			},
			strategyChange: function(e) {
				this.disSelectList[this.current].isSpecial = !this.disSelectList[this.current].isSpecial
			},
			addAccount() {
				var item = {
					dataItemName: '请选择游客类型',
					retPrice: "0",
					setPrice: "0",
					dataItemNum: "0",
					index1:0,
				}
				this.disSelectList[this.current].planCharge.push(item)
			},
			deleteAccount(account, index) {
				this.disSelectList[this.current].planCharge.splice(index, 1)
			},
			accountInput: function(event, index, type,item) {
				switch (type) {
					case "name":
						// this.index1 = event.target.value		
						item.index1 = event.target.value
						this.disSelectList[this.current].planCharge[index].dataItemName= this.portList[item.index1].dataItemName;	
						console.log(this.current);
						this.disSelectList[this.current].planCharge[index].dataItemNum = this.portList[item.index1].dataItemNum;
						break;
					case "retPrice":
						this.disSelectList[this.current].planCharge[index].retPrice = Number(event.target.value) ;
						break;
					case "setPrice":
						this.disSelectList[this.current].planCharge[index].setPrice =Number(event.target.value);
						break;
					default:
						break;
				}
				console.log(this.disSelectList)
			},
			savePlan() {
				this.disListStr = []
				for (var i = 1, lenI = this.disSelectList.length; i < lenI; ++i) {
					if (this.disSelectList[i].isSpecial == false) {
						this.disSelectList[i].planCharge = this.disSelectList[0].planCharge
					}
					this.disListStr.push(this.disSelectList[i])
				}
				this.defalutPlanChargeStr = this.disSelectList[0].planCharge
				if(this.planId!=null){
					editProductPlan({
						planId:this.planId,
						productId: this.productId,
						saleState: this.saleState,
						proLocation: this.proLocation,
						disListStr: this.disListStr,
						defalutPlanChargeStr: this.defalutPlanChargeStr,
						numLimit: Number(this.numLimit),
					}).then(res => {
						console.log(res)
						if (res.status == '1') {
							uni.showToast({
								title: '计划保存成功',
								icon: "success",
								duration: 2000
							});
						} else {
							uni.showModal({
								showCancel: false,
								title: '提示',
								content: res.errMessage
							});
						}
					}).catch(err => {})
				}
				
		},
	}
	}
</script>

<style lang="scss">
	.red {
		color: #f55347;
	}

	.form-item {
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		align-items: center;
		height: auto;
		color: #777777;
		border-bottom: 2px solid #FFFFFF;

		.item-title {
			width: 700rpx;
			margin-top: 10px;
		}

		.upLoad-container {
			display: flex;
			flex-direction: row;
			padding-bottom: 10px;
			padding-top: 5px;
			background-color: #f1f1f1;
			width: 100%;
		}

		.one-row {
			display: flex;
			flex-direction: row;
			width: 700rpx;
			height: auto;
			margin-top: 10px;

			.one-row-title {
				display: flex;
				width: 200rpx;
				align-items: center;
				justify-content: center;
			}

			.one-row-input {
				display: flex;
				// flex-direction: row;
				// justify-content: space-between;
				// align-items: center;
				background-color: #FFFFFF;
				// margin-left: 30rpx;
				border-radius: 30rpx;
				padding-left: 30rpx;
				padding-top: 3px;
				padding-bottom: 3px;
				/* border: 2px solid #007AFF; */
				width: 480rpx;
				height: auto;
				font-size: 14px;

			}
		}

		.input-container {
			width: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			height: auto;
			margin-top: 10px;

			.item-input {
				width: 700rpx;
				border-radius: 20rpx;
				border: 1px solid #C8C7CC;
				padding: 5px;
				height: auto;
				background-color: #FFFFFF;
			}
		}

		.label-container {
			// border: 1px solid #007AFF;
			// width: 700px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			// margin-left: 25rpx;
			// margin-right: 25rpx;
			margin-top: 10px;

			.question {
				display: flex;
				flex-direction: row;
				width: 225rpx;
				margin-left: 25rpx;
				padding: 5px;
				align-items: center;
				// border: 1px solid #007AFF;
			}
		}

	}

	.sole-row-item {
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		align-items: center;
		height: auto;
		color: #777777;
		border-bottom: 2px solid #FFFFFF;

		.switch-container {
			width: 700rpx;
			margin-top: 10px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.picker-container {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				background-color: #FFFFFF;
				margin-left: 30rpx;
				border-radius: 30rpx;
				padding-left: 30rpx;
				padding-top: 5px;
				padding-bottom: 5px;
				/* border: 2px solid #007AFF; */
				width: 520rpx;
				height: auto;
				font-size: 14px;
				overflow: auto;

				.icon-right {
					width: 50upx;
					height: 35upx;
					flex-shrink: 0;
				}
			}
		}

		.input-container {
			width: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			height: auto;
			margin-top: 8px;

			.item-input {
				width: 700rpx;
				border-radius: 20rpx;
				border: 1px solid #C8C7CC;
				padding: 5px;
				height: auto;
				background-color: #FFFFFF;
			}
		}
	}

	.seg-item {
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		align-items: center;
		height: auto;
		color: #777777;
		border-bottom: 2px solid #FFFFFF;

		.null-list {
			display: flex;
			flex-direction: row;
			width: 750rpx;
			margin-top: 10px;
			justify-content: center;
			align-items: center;
		}

		.seg-container {
			width: 100%;
			padding: 8px;
			font-size: 14px;
			margin-top: 10px;

			.seg-content {
				width: 100%;
				display: flex;
				height: auto;
				padding: 8px;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				border-bottom: 2px solid #FFFFFF;

				.add {
					margin-top: 10px;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #4CD964;
					width: auto;
					padding: 8px;
					height: auto;
					border-radius: 15rpx;
				}

				.seg-row-container {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					width: 100%;
					padding: 10px;

					.seg-row {
						// width: 50%;
						display: flex;
						flex-direction: row;
						// justify-content: center;
						align-items: center;

						.seg-input {
							margin-left: 8px;
							height: auto;
							width: 120rpx;
							// background-color: #e5e5e5;
							background-color: #FFFFFF;
							padding: 5px;
							margin-right: 8px;
						}
					}
				}
			}
		}

		.input-container {
			width: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			height: auto;
			margin-top: 10px;

			.item-input {
				width: 700rpx;
				border-radius: 20rpx;
				border: 1px solid #C8C7CC;
				padding: 5px;
				height: auto;
				background-color: #FFFFFF;
			}
		}
	}

	.text-area {
		height: 400rpx;
		width: 700rpx;
		border-radius: 20rpx;
		border: 1px solid #C8C7CC;
		padding: 5px;
		background-color: #FFFFFF;
	}

	.masking_layer {
		background-color: #a5b4c4;
		display: flex;
		height: auto;
		flex-direction: column;
		justify-content: flex-end;

	}

	.price_total {
		flex-direction: row;
		align-items: Center;
		background-color: #ffffff;
		box-shadow: 5px 0px 15px #aaaa7f;
	}
</style>
