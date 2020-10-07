<template>
	<view>
		<uni-section style="height: 7vh;" title="团队详情" type="line" />
		<view class="c-list">
			<view class="c-row b-b">
				<text class="tit">团队名称:</text>
				<view class="con-list">
					<text  >{{ groupName }}</text>
				</view>
			</view>			
			<view class="c-row b-b">
				<text class="tit">出行日期:</text>
				<view class="con-list">
					<text  >{{ dataList.travelDate }}</text>
				</view>
			</view>
			<view class="c-row b-b">
				<text class="tit">出行时间:</text>
				<view class="con-list">
					<text >{{ dataList.ProDateNum }}</text>
				</view>
			</view>
			<view class="c-row b-b">
				<text class="tit">实际人数:</text>
				<view class="bz-list con">
					<text>{{ dataList.tourNum }}</text>
				</view>
			</view>
		</view>

		<uni-section style="height: 7vh;" title="报账详情" type="line" />
<!-- 		<uni-collapse>
			<uni-collapse-item title="交通" :open="true">
				<view class="adRowView">
					<view class="headView" style="font-size: 35upx;">车费</view>
					<view style="width: 70%;"><input class="input1" v-model="accountList.trafficCar" placeholder="请输入" @blur="trafficOnInput" /></view>
				</view>
				<view class="adRowView">
					<view class="headView" style="font-size: 35upx;">路桥及停车费</view>
					<view style="width: 70%;"><input class="input1" v-model="accountList.trafficRoad" placeholder="请输入" @blur="trafficOnInput"/></view>
				</view>
				<view class="adRowView">
					<view class="headView"  style="font-size: 35upx;">费用小计</view>
					<view style="width: 70%;"><input class="input1" v-model="accountList.trafficTotal" placeholder="请输入" /></view>
				</view>
			</uni-collapse-item>
		</uni-collapse> -->
		<view class="uni-collapse-cell" style=" background-color: #f1f1f1;">
			<view class="uni-collapse-cell__title">
				<text class="uni-collapse-cell__title-text">交通</text>
				<view class="uni-collapse-cell__title-arrow"><uni-icons color="#bbb" size="20" type="plus" @click="addTrafficList" /></view>
			</view>

			<view class="item-t" v-for="(item, index) in trafficList" :key="index" style=" background-color: #f1f1f1;">
				<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
					<view class="adRowView">
						<view class="headView" style="font-size: 35upx;">明细     </view>
						<view style="width: 70%;">
<!-- 							<input class="input1" v-model="trafficDetail[index]" placeholder="请输入" />-->					
				<textarea maxlength="-1" class="input1" auto-height	 style="width:400upx" placeholder="请输入" v-model="trafficDetail[index]" />
 </view> 
				</view>
					<view class="adRowView">
						<view class="headView" style="font-size: 35upx;">价格</view>
						<view style="width: 70%;"><input class="input1"  style="width:400upx" v-model="trafficMoney[index]" placeholder="请输入" @blur="trafficMoneyInput"/></view>
					</view>
				</view>
				<view style="display: flex;flex-direction: column;justify-content: left;"><view style="color: red;" @click="delTrafficList(item, index)">删除</view></view>
			</view>
		</view>

		<view class="uni-collapse-cell" style=" background-color: #f1f1f1;">
			<view class="uni-collapse-cell__title">
				<text class="uni-collapse-cell__title-text">接送（附小车接送费明细）</text>
				<view class="uni-collapse-cell__title-arrow"><uni-icons color="#bbb" size="20" type="plus" @click="addCarList" /></view>
			</view>

			<view class="item-t" v-for="(item, index) in carList" :key="index" style=" background-color: #f1f1f1;">
				<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
					<view class="adRowView">
						<view class="headView" style="font-size: 35upx;">明细</view>
						<view style="width: 70%;">
											<textarea maxlength="-1" class="input1" auto-height	 style="width:400upx" placeholder="请输入" v-model="carDetail[index]" />
							
							<!-- <input class="input1" v-model="carDetail[index]" placeholder="请输入" /> -->
							</view>
					</view>
					<view class="adRowView">
						<view class="headView" style="font-size: 35upx;">价格</view>
						<view style="width: 70%;"><input class="input1" style="width:400upx" v-model="carMoney[index]" placeholder="请输入" @blur="carMoneyInput"/></view>
					</view>
				</view>
				<view style="display: flex;flex-direction: column;justify-content: left;"><view style="color: red;" @click="delCarList(item, index)">删除</view></view>
			</view>
		</view>

		<view class="uni-collapse-cell" style=" background-color: #f1f1f1;">
			<view class="uni-collapse-cell__title">
				<text class="uni-collapse-cell__title-text">地接</text>
				<view class="uni-collapse-cell__title-arrow"><uni-icons color="#bbb" size="20" type="plus" @click="addLocalList" /></view>
			</view>

			<view class="item-t" v-for="(item, index) in localList" :key="index" style=" background-color: #f1f1f1;">
				<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
					<view class="adRowView">
						<view class="headView" style="font-size: 35upx;">明细</view>
						<view style="width: 70%;">
						<textarea maxlength="-1" class="input1" auto-height	 style="width:400upx" placeholder="请输入" v-model="localDetail[index]" />
							
							<!-- <input class="input1" v-model="localDetail[index]" placeholder="请输入" /> -->
							</view>
					</view>
					<view class="adRowView">
						<view class="headView" style="font-size: 35upx;">价格</view>
						<view style="width: 70%;"><input class="input1" style="width:400upx" v-model="localMoney[index]" placeholder="请输入" @blur="localMoneyInput"/></view>
					</view>
				</view>
				<view style="display: flex;flex-direction: column;justify-content: left;"><view style="color: red;" @click="delLocalList(item, index)">删除</view></view>
			</view>
		</view>
		
				<view class="uni-collapse-cell" style=" background-color: #f1f1f1;">
			<view class="uni-collapse-cell__title">
				<text class="uni-collapse-cell__title-text">导游</text>
				<view class="uni-collapse-cell__title-arrow"><uni-icons color="#bbb" size="20" type="plus" @click="addGuiderList" /></view>
			</view>
		
			<view class="item-t" v-for="(item, index) in guiderList" :key="index" style=" background-color: #f1f1f1;">
				<view style="display: flex;flex-direction: column;justify-content: right;align-items: flex-start;">
					<view class="adRowView">
						<view class="headView" style="font-size: 35upx;">明细</view>
						<view style="width: 70%;">
						<textarea maxlength="-1" class="input1" auto-height	 style="width:400upx" placeholder="请输入" v-model="guiderDetail[index]" />
							
							<!-- <input class="input1" v-model="guiderDetail[index]" placeholder="请输入" /> -->
							</view>
					</view>
					<view class="adRowView">
						<view class="headView" style="font-size: 35upx;">价格</view>
						<view style="width: 70%;"><input class="input1" style="width:400upx" v-model="guiderMoney[index]" placeholder="请输入" @blur="guiderMoneyInput"/></view>
					</view>
				</view>
				<view style="display: flex;flex-direction: column;justify-content: left;"><view style="color: red;" @click="delGuiderList(item, index)">删除</view></view>
			</view>
		</view>

<!-- 		<uni-collapse>
			<uni-collapse-item title="地接" :open="true">
				<view class="adRowView">
					<view class="headView" style="font-size: 35upx;">门票</view>
					<view style="width: 70%;"><input class="input1" v-model="accountList.localTicket" placeholder="请输入" @blur="localOnInput"/></view>
				</view>
				<view class="adRowView">
					<view class="headView" style="font-size: 35upx;">住宿</view>
					<view style="width: 70%;"><input class="input1" v-model="accountList.localAccommodation" placeholder="请输入" @blur="localOnInput"/></view>
				</view>
				<view class="adRowView">
					<view class="headView"  style="font-size: 35upx;">餐费</view>
					<view style="width: 70%;"><input class="input1" v-model="accountList.localFood" placeholder="请输入"  @blur="localOnInput"/></view>
				</view>
				<view class="adRowView">
					<view class="headView"  style="font-size: 35upx;">其他</view>
					<view style="width: 70%;"><input class="input1" v-model="accountList.localOther" placeholder="请输入" @blur="localOnInput" /></view>
				</view>
				<view class="adRowView">
					<view class="headView"  style="font-size: 35upx;">费用小计</view>
					<view style="width: 70%;"><input class="input1" v-model="accountList.localTotal" placeholder="请输入" /></view>
				</view>
			</uni-collapse-item>
		</uni-collapse>

		<uni-collapse>
			<uni-collapse-item title="导游" :open="true">
				<view class="adRowView"  style="font-size: 35upx;">
					<view class="headView" style="font-size: 35upx;">导服</view>
					<view style="width: 70%;"><input class="input1" v-model="accountList.guiderClothes" placeholder="请输入"@blur="guiderOnInput" /></view>
				</view>
				<view class="adRowView"  style="font-size: 35upx;">
					<view class="headView" style="font-size: 35upx;">补助</view>
					<view style="width: 70%;"><input class="input1" v-model="accountList.guiderSubsidy" placeholder="请输入" @blur="guiderOnInput"/></view>
				</view>
				<view class="adRowView"  style="font-size: 35upx;">
					<view class="headView" style="font-size: 35upx;">其他</view>
					<view style="width: 70%;"><input class="input1" v-model="accountList.guiderOther" placeholder="请输入" @blur="guiderOnInput" /></view>
				</view>
				<view class="adRowView"  style="font-size: 35upx;">
					<view class="headView">费用小计</view>
					<view style="width: 70%;"><input class="input1" v-model="accountList.guiderTotal" placeholder="请输入" /></view>
				</view>
			</uni-collapse-item>
		</uni-collapse> -->
		
		
<!-- 		<view class="item-t" v-for="(item, index) in photoList" :key="index" style=" background-color: #f1f1f1;">
		<view class="like_img" v-show="item.photo!==''">
			<image :src="item.photo" @tap="_previewImage(item.photo)" @longtap="longtap(item,index)" ></image>
		</view>
		</view> -->

		
		<uni-section title="上传照片(已上传成功照片长按删除)" type="line" />
		<view class="like_img" v-show ="flag">
			<image v-for="(pic, index) in photoList" @tap="_previewImage(pic.photo)" @longtap="longtap(pic,index)"
			:src="pic.photo"></image>
		</view>
		
		<imageupload :count="4" :length="8" :restype="8" v-model="imgRidList"></imageupload>

		<view class="uni-collapse-cell" style=" background-color: #f1f1f1;">
			<view class="uni-collapse-cell__title">
				<text class="uni-collapse-cell__title-text">付款总合计{{ accountList.total }}</text>
				<view class="uni-collapse-cell__title-arrow" style="width: 80px;
	height: 48px;">
			<button class="confirm-btn" @click="submit" >提交</button>
	
	</view>
			</view>	
			</view>
	</view>
</template>

<script>
		import imageupload from '../../components/upload-images.vue'
		import { saveAccount,AccountInit ,getAccount,delAccountPhoto} from '../../api/guider/guider.js'
	
import uniCollapseItem from '../../components/uni-collapse-item/uni-collapse-item.vue';
export default {
	components: {
		uniCollapseItem,
		imageupload
	},
	data() {
		return {
			
			flag:false,
			groupId:'',
			groupName:'',
			dataList:[],
			imgRidList: [],		
				
			carList: ['apple'],
			carDetail:[],
			carMoney:[],
			
			trafficList: ['apple'],
			trafficDetail:[],
			trafficMoney:[],	
					
			localList: ['apple'],
			localDetail:[],
			localMoney:[],
			
			guiderList: ['apple'],
			guiderDetail:[],
			guiderMoney:[],						
			
			guiderMoneyInputMoney:0,
			localMoneyInputMoney:0,
			carMoneyInputMoney:0,
			trafficMoneyInputMoney:0,
			
			photoList:[],
			accountList: {
				trafficCar:'0',
				trafficRoad:'0',
				trafficTotal:'0',
				localTicket:'0',
				localAccommodation:'0',
				localFood:'0',
				localOther:'0',
				localTotal:'0',
				guiderClothes:'0',
				guiderSubsidy:'0',
				guiderOther:'0',
				guiderTotal:'0',
				total:0
			},
			photo:[]
		};
	},
		onLoad(options){
			this.groupId = options.groupId
			this.groupName = options.groupName
			AccountInit({groupId:this.groupId}).then(res => {
						if(res.status==0){
						uni.showModal({
					    title: '提示',
						showCancel: false,
						confirmColor: "#000000",
					    content: res.errMessage,
					    success: function (res) {
					        if (res.confirm) {
								 uni.navigateBack()
					        } 
					    }
					});
				}
							this.dataList = res.data
						}).catch(err => {
							
						})
						
		getAccount({groupId:this.groupId}).then(res => {
					if(res.status==0){
				}
				if (res.data.accountList.photoData!=0){
					this.photoList = res.data.accountList.photoData
					this.flag = true
				}
				this.accountList = res.data.accountList
				if(res.data.carDetailArrayList!=0){
					this.carDetail =res.data.carDetailArrayList
					this.carMoney =res.data.carMoneyArrayList	
				}
				while(this.carList.length<this.carDetail.length){
					this.addCarList()
				}
				
				if(res.data.trafficDetailArrayList!=0){
					this.trafficDetail =res.data.trafficDetailArrayList
					this.trafficMoney =res.data.trafficMoneyArrayList	
				}
				while(this.trafficList.length<this.trafficDetail.length){
					this.addTrafficList()
				}
								
				if(res.data.guiderDetailArrayList!=0){
					this.guiderDetail =res.data.guiderDetailArrayList
					this.guiderMoney =res.data.guiderMoneyArrayList	
				}
				while(this.guiderList.length<this.guiderDetail.length){
					this.addGuiderList()
				}		
								
				if(res.data.localDetailArrayList!=0){
					this.localDetail =res.data.localDetailArrayList
					this.localMoney =res.data.localMoneyArrayList	
				}
				while(this.localList.length<this.localDetail.length){
					this.addLocalList()
				}														
				this.guiderMoneyInput()
				this.localMoneyInput()
				this.trafficMoneyInput()
				this.carMoneyInput()
						}).catch(err => {
							
						})		
								
								
			
		},
	methods: {
			longtap(item,index){

				console.log("item=="+item.index);
				 var that = this
				 that.groupId =this.groupId
				uni.showModal({
				title: '提示',
				content: '删除该图片',
				success: function (res) {
				if (res.cancel) {
					
				} else if (res.confirm) {
				  delAccountPhoto({groupId:that.groupId,photoIndex:item.index,index:index}).then(res=>{
				  	if(res.status==1){
				  			uni.showModal({
				  		    title: '提示',
				  			showCancel: false,
				  			confirmColor: "#000000",
				  		    content: res.data,
				  		    success: function (res) {
				  		        if (res.confirm) {
									that.photoList.splice(index,1)
				  		        } 
				  		    }
				  		});
				  	}else{
				  	uni.showModal({
				  	    title: '提示',
				  		showCancel: false,
				  		confirmColor: "#000000",
				  	    content: res.errMessage,
				  	});						
				  	}				
				})					
					}
				}
			});
		},
		
				_previewImage(image) {
			var imgArr = [];
			imgArr.push(image);
			//预览图片
			uni.previewImage({
				urls: imgArr,
				current: imgArr[0]
			});
		},
		
		addCarList: function() {
			this.carList.splice(this.carList.length, 0, 'apple');
		},
		delCarList: function(item,index) {
			this.carList.splice(index, 1);
			this.carMoney.splice(index, 1);
			this.carDetail.splice(index, 1);
			// this.accountList.total = this.accountList.localTotal*1+this.accountList.trafficTotal*1+this.accountList.guiderTotal*1
			this.carMoneyInput()
		},
		
		addTrafficList: function() {
			this.trafficList.splice(this.trafficList.length, 0, 'apple');
		},
		delTrafficList: function(item,index) {
			this.trafficList.splice(index, 1);
			this.trafficMoney.splice(index, 1);
			this.trafficDetail.splice(index, 1);
			this.trafficMoneyInput()
		},
		
		addLocalList: function() {
			this.localList.splice(this.localList.length, 0, 'apple');
		},
		delLocalList: function(item,index) {
			this.localList.splice(index, 1);
			this.localMoney.splice(index, 1);
			this.localDetail.splice(index, 1);
			this.localMoneyInput()
		},
		
		addGuiderList: function() {
			this.guiderList.splice(this.guiderList.length, 0, 'apple');
		},
		delGuiderList: function(item,index) {
			this.guiderList.splice(index, 1);
			this.guiderMoney.splice(index, 1);
			this.guiderDetail.splice(index, 1);
			this.guiderMoneyInput()
		},
		
		// trafficOnInput:function(e){
		// 	this.accountList.trafficTotal = this.accountList.trafficCar *1+this.accountList.trafficRoad*1
		// 	this.accountList.total = this.accountList.localTotal*1+this.accountList.trafficTotal*1+this.accountList.guiderTotal*1
		// 	for (var i = 0; i < this.carMoney.length; i++) {
		// 	this.accountList.total += this.carMoney[i]*1
		// 	}
		// 	this.accountList.total=this.accountList.total.toFixed(1)
		// 	this.accountList.trafficTotal=this.accountList.trafficTotal.toFixed(1)
		// },
		// localOnInput:function(e){
		// 	this.accountList.localTotal = this.accountList.localAccommodation *1+this.accountList.localFood*1+this.accountList.localTicket*1+this.accountList.localOther*1
		// 	this.accountList.total = this.accountList.localTotal*1+this.accountList.trafficTotal*1+this.accountList.guiderTotal*1
		// 	for (var i = 0; i < this.carMoney.length; i++) {
		// 	this.accountList.total += this.carMoney[i]*1
		// 	}
		// 	this.accountList.total=this.accountList.total.toFixed(1)
		// 	this.accountList.localTotal=this.accountList.localTotal.toFixed(1)
		// 	
		// },
		// guiderOnInput:function(e){
		// 	this.accountList.guiderTotal = this.accountList.guiderClothes *1+this.accountList.guiderSubsidy*1+this.accountList.guiderOther*1
		// 	this.accountList.total = this.accountList.localTotal*1+this.accountList.trafficTotal*1+this.accountList.guiderTotal*1
		// 	for (var i = 0; i < this.carMoney.length; i++) {
		// 		this.accountList.total += this.carMoney[i]*1
		// 	}
		// 	this.accountList.total=this.accountList.total.toFixed(1)
		// 	this.accountList.guiderTotal=this.accountList.guiderTotal.toFixed(1)
		// },
		carMoneyInput:function(e){
			this.carMoneyInputMoney=0
			for (var i = 0; i < this.carMoney.length; i++) {
				this.carMoneyInputMoney += this.carMoney[i]*1
			}
			this.accountList.total= this.carMoneyInputMoney+this.trafficMoneyInputMoney+this.localMoneyInputMoney+this.guiderMoneyInputMoney
			this.accountList.total=this.accountList.total.toFixed(2)
		},
		
		guiderMoneyInput:function(e){
			
			this.guiderMoneyInputMoney=0
			for (var i = 0; i < this.guiderMoney.length; i++) {
				this.guiderMoneyInputMoney += this.guiderMoney[i]*1
			}
			this.accountList.total= this.carMoneyInputMoney+this.trafficMoneyInputMoney+this.localMoneyInputMoney+this.guiderMoneyInputMoney
			this.accountList.total=this.accountList.total.toFixed(2)
		},
		
		localMoneyInput:function(e){
			this.localMoneyInputMoney=0
			for (var i = 0; i < this.localMoney.length; i++) {
				this.localMoneyInputMoney += this.localMoney[i]*1
			}
			this.accountList.total= this.carMoneyInputMoney+this.trafficMoneyInputMoney+this.localMoneyInputMoney+this.guiderMoneyInputMoney
			this.accountList.total=this.accountList.total.toFixed(2)
		},
		
		trafficMoneyInput:function(e){
			this.trafficMoneyInputMoney=0
			for (var i = 0; i < this.trafficMoney.length; i++) {
				this.trafficMoneyInputMoney += this.trafficMoney[i]*1
			}
			this.accountList.total= this.carMoneyInputMoney+this.trafficMoneyInputMoney+this.localMoneyInputMoney+this.guiderMoneyInputMoney
			this.accountList.total=this.accountList.total.toFixed(2)
		},
		
		
		
	submit() {
				for (var i = 0; i < this.imgRidList.length; i++) {
					this.photo[i] = this.imgRidList[i].rId
				}
				saveAccount({groupId:this.groupId,carDetail:this.carDetail,carMoney:this.carMoney,accountList:this.accountList,
				trafficDetail:this.trafficDetail,trafficMoney:this.trafficMoney,
				localDetail:this.localDetail,localMoney:this.localMoney,
				guiderDetail:this.guiderDetail,guiderMoney:this.guiderMoney,
				
				imgRidList:this.photo,size : this.photo.length}).then(res=>{
					if(res.status==1){
							uni.showModal({
						    title: '提示',
							showCancel: false,
							confirmColor: "#000000",
						    content: res.data,
						    success: function (res) {
						        if (res.confirm) {
							     uni.navigateBack()
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
};
</script>

<style lang="scss">
.input1 {
	text-align: right !important;
	font-size: 35upx !important;
}
page {
	background: $page-color-base;
}
.c-list {
	font-size: $font-sm + 2upx;
	color: $font-color-base;
	background: #fff;
	.c-row {
		display: flex;
		align-items: center;
		padding: 20upx 30upx;
		position: relative;
	}
	.tit {
		width: 140upx;
	}
	.con {
		flex: 1;
		color: $font-color-dark;
		.selected-text {
			margin-right: 10upx;
		}
	}
	.bz-list {
		height: 40upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		text {
			display: inline-block;
			margin-right: 30upx;
		}
	}
	.con-list {
		flex: 1;
		display: flex;
		flex-direction: column;
		color: $font-color-dark;
		line-height: 40upx;
	}
	.red {
		color: $uni-color-primary;
	}
}
.title1 {
	padding: 12px 12px;
	position: relative;
	/* #ifndef APP-NVUE */
	display: flex;
	width: 100%;
	box-sizing: border-box;
	/* #endif */
	height: 48px;
	line-height: 24px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	flex: 1;
	font-size: 42upx;
	/* #ifndef APP-NVUE */
	white-space: nowrap;
	color: inherit;
	/* #endif */
	/* #ifdef APP-NVUE */
	lines: 1;
	/* #endif */
	overflow: hidden;
	text-overflow: ellipsis;
}

.uni-collapse-cell__title {
	padding: 12px 12px;
	position: relative;
	/* #ifndef APP-NVUE */
	display: flex;
	width: 100%;
	box-sizing: border-box;
	/* #endif */
	height: 48px;
	line-height: 24px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.uni-collapse-cell {
	// flex-direction: column;
	border-color: $uni-border-color;
	border-bottom-width: 1px;
	border-bottom-style: solid;
}
.uni-collapse-cell__title-text {
	flex: 1;
	font-size: 42upx;
	/* #ifndef APP-NVUE */
	white-space: nowrap;
	color: inherit;
	/* #endif */
	/* #ifdef APP-NVUE */
	lines: 1;
	/* #endif */
	overflow: hidden;
	text-overflow: ellipsis;
}

.uni-collapse-cell__title-arrow {
	width: 20px;
	height: 20px;
	transform: rotate(0deg);
	transform-origin: center center;
}
.item-t {
	width: 100%;
	padding: 15px;
	border-bottom: 1px solid DarkGray;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
	.confirm-btn{
	margin-top: 18upx;
	width: 200upx;
	height: 76upx;
	line-height: 80upx;
	background: $uni-color-primary;
	color: #fff;
	font-size: $font-lg;
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
</style>
