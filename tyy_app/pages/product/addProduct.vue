<template>
	<view>
		<drag-button :isDock="true" :existTabBar="false" @btnClick="addPro" />
		<uni-section title="基本信息" type="line" />
		<view class="form-item">
			<view class="item-title"><text class="red">*</text>服务类型</view>
			<view class="input-container">
				<input type="text" class="item-input" disabled="true" value="散客" />
			</view>
		</view>
		<view class="sole-row-item">
			<view class="switch-container">
				<view><text class="red">*</text>产品类型</view>
				<picker mode="selector" :value="index" :range="proTypeList" range-key=proTypeName @change="proTypeChange">
					<view class="picker-container">
						<view>{{proType.typeName_1}}</view>
						<image src="@/static/icon-right.png" mode="widthFix" class="icon-right"></image>
					</view>
				</picker>
			</view>

			<view class="switch-container" v-if="secondType">
				<view><text class="red">*</text>二级类型</view>
				<picker mode="selector" :value="index" :range="childrenProTypeList" range-key=proTypeName @change="childrenTypeChange">
					<view class="picker-container">
						<view>{{proType.typeName_2}}</view>
						<image src="@/static/icon-right.png" mode="widthFix" class="icon-right"></image>
					</view>
				</picker>
			</view>
		</view>
		<view class="form-item">
			<view class="item-title"><text class="red">*</text>游客类型</view>
			<checkbox-group class="label-container" @change="typeChange($event)">
				<label class="question" v-for="(option,index) in ticketTypeList" :key="index">
					<view>
						<checkbox :value="option.DataItemNum" :checked="option.check" />
					</view>
					<view>{{option.DataItemName}}</view>
				</label>
			</checkbox-group>
		</view>		
		<view class="form-item">
			<view class="item-title"><text class="red">*</text>产品名称</view>
			<view class="input-container">
				<input type="text" :value="commodity.name" class="item-input" placeholder="请输入" @input="onInput($event,'name')" />
			</view>
		</view>
		<view class="sole-row-item">
			<view class="switch-container">
				<view>销售状态</view>
				<switch :checked='commodity.saleState' @change="saleStateChange" />
			</view>
		</view>
		<view class="form-item">
			<view class="item-title">产品属性</view>
			<checkbox-group class="label-container" @change="attrChange($event)">
				<label class="question" v-for="(option,index) in attrList" :key="index">
					<view>
						<checkbox :value="option.id" :checked="option.check" />
					</view>
					<view>{{option.attributeName}}</view>
				</label>
			</checkbox-group>
		</view>
		<view class="form-item">
			<view class="item-title">主要景点</view>
			<view class="input-container">
				<input type="text" :value="commodity.proScene" class="item-input" placeholder="请输入" @input="onInput($event,'scene')" />
			</view>
		</view>
		<view class="sole-row-item">
			<view class="switch-container">
				<view>行程天数</view>
				<uni-number-box @change="travelDaysChange" min="1" :value="commodity.proDateNum"></uni-number-box>
			</view>
		</view>
		<!-- <view class="form-item">
			<view class="item-title">集合地点</view>
			<checkbox-group class="label-container" @change="gatherChange($event)">
				<label class="question" style="width: 340rpx;" v-for="(option,index) in locationList" :key="index">
					<view>
						<checkbox :value="option.id" :checked="option.check" />
					</view>
					<view>{{option.locationName}}</view>
				</label>
			</checkbox-group>
		</view> -->
		<!-- <view class="form-item">
			<view class="item-title">销售端口</view>
			<checkbox-group class="label-container" @change="disChange($event)">
				<label class="question" style="width: 160rpx;" v-for="(option,index) in disList" :key="index">
					<view>
						<checkbox :value="option.id" :checked="option.check" />
					</view>
					<view>{{option.roleName}}</view>
				</label>
			</checkbox-group>
		</view> -->

		<!-- <uni-section title="结算项目" type="line" />
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
						<view class="seg-content" style="background-color: #f1f1f1;">
							<view class="seg-row-container">
								<view class="seg-row"><text>结算类型</text><input type="text" class="seg-input" :value="item.name" @input="accountInput($event,index,'name')" /></view>
							</view>
							<view class="seg-row-container">
								<view class="seg-row"><text>结算价(同行价)</text><input type="number" class="seg-input" :value="item.retPrice" @input="accountInput($event,index,'retPrice')" /><text>元</text></view>
							</view>
							<view class="seg-row-container">
								<view class="seg-row"><text>参考价(外报价)</text><input type="text" class="seg-input" :value="item.setPrice" @input="accountInput($event,index,'setPrice')" /><text>元</text></view>
							</view>
							<view class="seg-row-container">
								<view class="seg-row">
									<text>年龄范围</text>
									<input class="seg-input" style="width: 80rpx;" :value="item.minAge" @input="accountInput($event,index,'minAge')" />
									—
									<input class="seg-input" style="width: 80rpx;" :value="item.maxAge" @input="accountInput($event,index,'maxAge')" />
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
				<view class="form-item" style="border-bottom: 0px;">
					<view class="item-title" style="display: flex;flex-direction:column; align-items: center;">项目备注</view>
					<view class="input-container">
						<input type="text" class="item-input" placeholder="此处可填写航班信息或价格说明等" :value="disSelectList[current].des" @input="accountInput($event,0,'des')" />
					</view>
				</view>
			</view>
		</view> -->

		<uni-section title="封面图片" type="line" />
		<view style="padding-bottom: 10px;padding-top: 5px;background-color: #FFFFFF;">
			<imageupload :count="1" :length="1" :restype="8" v-model="imageList"></imageupload>
		</view>


		<uni-section title="产品特色" type="line" />
		<view class="form-item">
			<view class="input-container">
				<textarea maxlength="-1" :value='commodity.proDes' class="text-area" placeholder="请介绍产品特色" @input="onInput($event,'feature')" />
				</view>
		</view>
		<uni-section  title="行程详情" type="line" />
		<view class="form-item" v-for="(item,index) in travelDetail" :key=index>
			<view class="item-title">第{{item.day}}天</view>
			<checkbox-group class="label-container" @change="mealChange($event,index)">
				<label class="question" style="justify-content: center;" v-for="(option,i) in mealOption" :key="i">
					<view>
						<checkbox :value="option.id" :checked="checkSelected(index,i)"/>
					</view>
					<view>{{option.mealName}}</view>
				</label>
			</checkbox-group>
			<view class="one-row">
				<view class="one-row-title">
					区间
				</view>
				<view>
					<input type="text" class="one-row-input" placeholder="请输入" :value="item.trip" @input="traDetailInput($event,index,'trip')"/>
				</view>
			</view>
			<view class="one-row">
				<view class="one-row-title">
					住宿
				</view>
				<view>
					<input type="text" class="one-row-input" placeholder="请输入" :value="item.hotel" @input="traDetailInput($event,index,'hotel')"/>
				</view>
			</view>
			<view class="upLoad-container">
				<view style="display: flex;flex-direction: column;width: 100rpx;justify-content: center;align-items: center;margin-top: 8px;">
					<text>添</text>
					<text>加</text>
					<text>图</text>
					<text>片</text>
				</view>
				<!-- <view v-if="index==0" class="upload-content">
					<block v-for="(item, i) in travelDetail[index].images" :key="i">
						<view class="upload-item">
							<image class="upload-img" :src="item.filePath" mode="aspectFill" @click="previewImage(i)"></image>
							<image
								class="upload-del-btn"
								@click="delImage(i,index)"
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjNBODgzQjUwNDM5MTFFOUJDMjlGN0UwRTJGMjVCNjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjNBODgzQjYwNDM5MTFFOUJDMjlGN0UwRTJGMjVCNjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGM0E4ODNCMzA0MzkxMUU5QkMyOUY3RTBFMkYyNUI2NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGM0E4ODNCNDA0MzkxMUU5QkMyOUY3RTBFMkYyNUI2NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuYQTIAAAAHNSURBVHjazJgxasMwFIbjnsD4BDmCLxDQDZrNQ5bcILlBvXvpDRLIWmiHFkyH2t0LyVbwEkPpbE/eYlUCGYQax096UuIffkIgij7ryU/vyZuYy2e+Z56K70R8lsJcOfPn5AriMCvmZ2YKdMW8EQ/hRA9iEorwXlpZtObMRySQ6kysvrFWloHUEIcmUBuHUDLccmxQskErt7wyVLdy00tQ4Q2g5De2V9kNwWjffiNDA33f/42i6E13Qj5uNptlwJD+SyODuaqqqi/KVBTFOxSKA7VtW/NxSZI8AcbE2nuraZpvKgSBk6G4drsdBOwogz1CwAghH/JEl+BUKJ1VltPHHjoIAoeE4l53YFqb+RKcBSgqyqXhtxEKZwkKB3YOThYCqjPuCDoHZwGK3mGLtdPp5LmqTI1Dqe4p26EkNqA4iE6eg2z+iQ0okyQMATvYgLIIt9Y6knTyFBIudHqIq3BpmkL60VJ9O0sXZY8MBwSLtdNGEAQ/i8XiVXcz83EcEPDbuq/fzMdYWt+6GTmMsX2rh9q3TtsxNrzXhKt1rwg6rR1Dhdjqo7QMlWOvoWTF4imxQMRF7eaL8L5ohmwrLgDB8pCQc8DlcG7y538CDABJNGPqfaJgfgAAAABJRU5ErkJggg=="
								mode="scaleToFill"
							></image>
							<view class="upload-progress" v-if="item.progress < 100">{{ item.progress }}%</view>
						</view>
					</block>
				</view> -->
				<imageupload  :count="4" :length="8" :restype="8" :receiveImage='travelDetail[index].images' v-model="travelDetail[index].images"></imageupload>
			</view>
			<view class="input-container">
				<textarea maxlength="-1" class="text-area"  placeholder="请输入内容" :value="item.content" @input="traDetailInput($event,index,'content')"/>
			</view>
		</view>
		<uni-section  title="服务项目" type="line" />
		<view class="form-item">
			<view class="input-container">
				<textarea maxlength="-1" :value='commodity.proServer' class="text-area"  placeholder="请介绍服务项目" @input="onInput($event,'service')"/>
			</view>
		</view>
		<!-- <uni-section  title="视频展示" type="line" />
		<view class="input-container">
		    <video id="myVideo" src="<iframe height=498 width=510 src='https://player.youku.com/embed/XNDcwNTQ2NDQ1Ng==' frameborder=0 'allowfullscreen'></iframe>"
		       ></video>
		</view> -->
		<uni-section  title="自费与购物" type="line" />
		<view class="form-item">
			<view class="input-container">
				<textarea maxlength="-1" :value='commodity.proBuy' class="text-area"  placeholder="请介绍自费与购物" @input="onInput($event,'buy')"/>
			</view>
		</view>
		<uni-section  title="注意事项" type="line"/>
		<view class="form-item">
			<view class="input-container">
				<textarea maxlength="-1" :value='commodity.proAution' class="text-area"  placeholder="请介绍注意事项"  @input="onInput($event,'aution')"/>
			</view>
		</view>
		<uni-section  title="友情提示" type="line"/>
		<view class="form-item">
			<view class="input-container">
				<textarea maxlength="-1" :value='commodity.proNotice' class="text-area"  placeholder="请介绍友情提示"  @input="onInput($event,'notice')"/>
			</view>
		</view>

		<uni-section  title="价格标准" type="line" />
		<view class="form-item">
			<view class="sole-row-item">
				<view class="switch-container">
					<view>最低收客人数</view>
					<uni-number-box :value='commodity.minTouNum' @change="minNumChange"></uni-number-box>
				</view>
			</view>
			<view class="item-title">散客成本</view>
			<view class="input-container">
				<textarea maxlength="-1" :value='commodity.saCost' class="text-area"   @input="onInput($event,'cost')"/>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	import {
		getProductDetail,
		addPro,
		getSupInfo,
		getSupType,
		getCarType,
		gerProType,
		getSerTypes,
		getAtts,
		getLocations,
		getDisType,
		getTicketTypeList
	} from '../../api/product/product.js';
	export default {
		data() {
			return {
				options1: [{
					text: "删除",
					style: {
						backgroundColor: 'red',
					}
				}],
				mealOption:[
					{
						id:0,
						mealName:'早餐',
						note:'早'
					},
					{
						id:1,
						mealName:'午餐',
						note:'中'
					},
					{
						id:2,
						mealName:'晚餐',
						note:'晚'
					}
				],
				id:null,
				longitude: '',
				latitude: '',
				list: [],
				current: 0,
				proTypeList:[],
				serTypeList:[],
				childrenProTypeList:[],
				attrRecaive:[],
				disReceive:[],
				travelDays:0,
				// travelDetail:[{meal:'中',images:[{rId:23,progress:100,filePath:"http://cdn.lionstudio.top/FiUq4GZDoV0s7Uq7wetA_PNCpjZ_"}],trip:'11',hotel:'222',day:0}],
				travelDetail:[],
				attrList:[],
				locationList:[],
				disList:[],
				lastEList:[],
				imageList:[],
				selectTicketTypeList:[],
				ticketTypeList:[],
				receiveImage:[],
				checkedTypeList:[],
				traDetailReceive:[],
				disSelectList:[{roleName:'缺省结算项目',planCharge:[{name:'人',retPrice:null,setPrice:null,minAge:'',maxAge:''}],isSpecial:true,des:''}],
				areaItem:{},
				secondType:false,
				commodity:{id:null,serType:1,proType_1:'',proType_2:'',name:'',saleState:true,proAtts:[],proScene:'',proDateNum:1,proLocation:[],disListStr:[],proImage:[],proDes:'',proTravelStr:[],
				proServer:'',proBuy:'',proNotice:'',proAution:'',minTouNum:0,saCost:'大交通：\n车：\n房：\n餐：\n门票：\n导游：\n其他：'},
				proType:{typeName_1:'',typeName_2:''}
			};
		},
		onLoad: function(option) {
			// this.travelDetail=[{meal:'中',images:[{rId:23,progress:100,filePath:"http://cdn.lionstudio.top/Fi1die48vhA7NX6Ft4L_QSmAUmcm"}],trip:'11',hotel:'222',day:0}]
			if(option.type==1){
				this.commodity.id=option.productId
			}
			this.id=option.productId
			getTicketTypeList({})
			.then(res => {
				this.ticketTypeList = res.data;
			})
			.catch(err => {});		
			getSupInfo().then(res => {
					this.list = res.data;
					getSupType().then(res2 => {
						this.list = res2.data;
						getCarType().then(res3 => {
							this.list = res3.data;
							gerProType().then(res4 => {
								this.proTypeList = res4.data;
								getSerTypes().then(res5 => {
									this.serTypeList = res5.data;
									getAtts().then(res6 => {
										this.attrList = res6.data;
										getLocations().then(res7 => {
											this.locationList = res7.data;
											getDisType().then(res8 => {
												this.disList = res8.data;
												getProductDetail({id:this.id}).then(res9 => {
														if(res9.status==1){
															this.commodity.name=res9.data.name
															this.commodity.proType_2=res9.data.proType_2
															this.commodity.saleState=res9.data.saleState
															this.commodity.proAtts=JSON.parse(res9.data.proAtts)
															this.commodity.proScene=res9.data.proScene
															this.commodity.proDateNum=res9.data.proDateNum
															this.commodity.proLocation=JSON.parse(res9.data.proLocation)
															this.receiveImage=res9.data.imageIndexList
															this.commodity.proDes=res9.data.proDes
															this.travelDetail=JSON.parse(res9.data.proTraDetail)
															this.traDetailReceive=JSON.parse(res9.data.proTraDetail)
															this.checkedTypeList = res9.data.ticketType
															// for (var i = 0, lenI = this.traDetailReceive.length; i < lenI; ++i) {
															// 	this.travelDetail.push(this.traDetailReceive[i])
															// }
															for (var i = 0, lenI = this.traDetailReceive.length; i < lenI; ++i) {
																var tempList=[]
																for (var j = 0, lenJ = this.traDetailReceive[i].images.length; j < lenJ; ++j){
																	var traImageList=this.traDetailReceive[i].images[j]
																	var item={rId:traImageList.rId,progress:100,filePath:traImageList.url}
																	this.travelDetail[i].images.splice(j,1,item)
																}
																
															}
															console.log(this.travelDetail)
															this.commodity.proServer=res9.data.proServer
															this.commodity.proBuy=res9.data.proBuy
															this.commodity.proNotice=res9.data.proNotice
															this.commodity.proAution=res9.data.proAution
															this.commodity.minTouNum=res9.data.minTouNum
															this.commodity.saCost=res9.data.saCost
															
															for (var i = 0, lenI = this.checkedTypeList.length; i < lenI; ++i) {
																for (var j = 0, lenJ = this.ticketTypeList.length; j < lenJ; ++j){
																	if(this.checkedTypeList[i]==this.ticketTypeList[j].DataItemNum){
																		this.ticketTypeList[j].check=true
																	}
																}
															}
															for (var i = 0, lenI = this.proTypeList.length; i < lenI; ++i) {
																var item=this.proTypeList[i].children
																for (var j = 0, lenJ = item.length; j < lenJ; ++j){
																	if(item[j].id==this.commodity.proType_2){
																		this.commodity.proType_1=this.proTypeList[i].id
																	}
																}
															}
															for (var i = 0, lenI = this.proTypeList.length; i < lenI; ++i) {
																if (this.commodity.proType_1 == this.proTypeList[i].id) {
																	this.proType.typeName_1 = this.proTypeList[i].proTypeName
																	this.childrenProTypeList=this.proTypeList[i].children
																	this.secondType=true
																}
															}
															
															for (var i = 0, lenI = this.childrenProTypeList.length; i < lenI; ++i) {
																if (this.commodity.proType_2 == this.childrenProTypeList[i].id) {
																	this.proType.typeName_2 = this.childrenProTypeList[i].proTypeName
																}
															}
															for (var i = 0, lenI = this.commodity.proAtts.length; i < lenI; ++i) {
																for (var j = 0, lenJ = this.attrList.length; j < lenJ; ++j){
																	if(this.commodity.proAtts[i]==this.attrList[j].id){
																		this.attrList[j].check=true
																	}
																}
															}
															for (var i = 0, lenI = this.commodity.proLocation.length; i < lenI; ++i) {
																for (var j = 0, lenJ = this.locationList.length; j < lenJ; ++j){
																	if(this.commodity.proLocation[i]==this.locationList[j].id){
																		this.locationList[j].check=true
																	}
																}
															}
															for (var i = 0, lenI = this.receiveImage.length; i < lenI; ++i) {
																var item={rId:this.receiveImage[i].rId,progress:100,filePath:this.receiveImage[i].url}
																this.imageList.push(item)
															}
															
															// console.log(this.traDetailReceive)
															
															// this.travelDetail.splice(0,0,{meal:'中',images:[{rId:23,progress:100,filePath:"http://cdn.lionstudio.top/FiUq4GZDoV0s7Uq7wetA_PNCpjZ_"}],trip:'11',hotel:'222',day:0})
															
															
															var receiveDisList=JSON.parse(res9.data.disList)
															for (var i = 0, lenI = receiveDisList.length; i < lenI; ++i) {
																this.disReceive.push(receiveDisList[i].id)
																this.disSelectList.push(receiveDisList[i])
															}
															
															for (var i = 0, lenI = this.disReceive.length; i < lenI; ++i) {
																for (var j = 0, lenJ = this.disList.length; j < lenJ; ++j){
																	if(this.disReceive[i]==this.disList[j].id){
																		this.disList[j].check=true
																	}
																}
															}
															this.lastEList=this.disReceive
														}
														
												});
										});
									});
								});
							});
						});
					});
				});
			});
			
				
		},
		onShow() {
			
			
		},
		onReady: function(res) {
		        // #ifndef MP-ALIPAY
		        this.videoContext = uni.createVideoContext('myVideo')
		        // #endif
		    },
		methods: {
			
			proTypeChange: function(e) {
				this.secondType=true
				this.commodity.proType_2=''
				console.log(e)
				for (var i = 0, lenI = this.proTypeList.length; i < lenI; ++i) {
					if (e.target.value == i) {
						this.commodity.proType_1 = this.proTypeList[i].id
						this.proType.typeName_1 = this.proTypeList[i].proTypeName
						this.childrenProTypeList=this.proTypeList[i].children
					}
				}
				this.proType.typeName_2=''
			},
			childrenTypeChange: function(e) {
				console.log(e)
				for (var i = 0, lenI = this.childrenProTypeList.length; i < lenI; ++i) {
					if (e.target.value == i) {
						this.commodity.proType_2 = this.childrenProTypeList[i].id
						this.proType.typeName_2 = this.childrenProTypeList[i].proTypeName
					}
				}
				console.log(this.commodity)
			},
			
			saleStateChange: function (e) {
				console.log(this.commodity.proDateNum)
				this.commodity.saleState=e.target.value
			},
			attrChange: function(e) {
				this.commodity.proAtts=e.target.value
			},
			typeChange: function(e) {
				this.selectTicketTypeList=e.target.value
				console.log(this.selectTicketTypeList);
			},
			mealChange: function(e,index) {
				console.log(e)
				this.travelDetail[index].meal=[]
				var eList= e.target.value
				for (var i = 0, lenI =eList.length; i < lenI; ++i) {
					for (var j = 0, lenJ =this.mealOption.length; j < lenJ; ++j) {
						if(eList[i]==this.mealOption[j].id){
							this.travelDetail[index].meal.push(this.mealOption[j].note)
						}
					}
				}
			},
			checkboxChange: function(e) {
				console.log(e)
				// for (var i = 0, lenI = this.childrenProTypeList.length; i < lenI; ++i) {
				// 	if (e.target.value == i) {
				// 		this.commodity.proType_2 = this.childrenProTypeList[i].proTypeName
				// 	}
				// }
			},
			
			travelDaysChange(value) {
				
				
				// if(this.commodity.proDateNum==0){
				// 	this.travelDetail=[]
				// 	this.travelDays = value
				// 	for (var i = 0; i < this.commodity.proDateNum; ++i) {
				// 		var item={day:i+1,trip:'',meal:[],hotel:'',content:'',images:[],}
				// 		this.travelDetail.push(item)
				// 	}
				// }
				if(this.travelDetail.length==0){
					this.commodity.proDateNum=value
					for (var i = 0; i < this.commodity.proDateNum; ++i) {
						var item={day:i+1,trip:'',meal:[],hotel:'',content:'',images:[],}
						this.travelDetail.push(item)
					}
				}
				else{
						if(value>this.travelDetail.length){
							var temp=value-this.travelDetail.length
							console.log(temp)
							for (var i = 0; i < temp; ++i) {
								var item={day:this.travelDetail.length+1,trip:'',meal:[],hotel:'',content:'',images:[],}
								this.travelDetail.push(item)
							}
						}
						else{
							if(value!=0 && value!=null && value!=undefined){
								this.travelDetail.splice(value)
							}
						}
				}
				this.commodity.proDateNum=value
				
			},
			minNumChange(value) {
				this.commodity.minTouNum=value
			},
			gatherChange: function(e) {
				this.commodity.proLocation=e.target.value
				console.log(this.commodity.proLocation)
			},
			disChange: function(e) {
				// this.disSelectList=[{roleName:'缺省结算项目',planCharge:[],des:''}]
				console.log(e)
				var eList=e.target.value
				// 销售端口增加
				if(eList.length>this.lastEList.length){
					if(this.lastEList.length!=0){
						for (var i = 0, lenI = eList.length; i < lenI; ++i) {
							var flag=0
							for (var j = 0, lenJ = this.lastEList.length; j < lenJ; ++j){
								if (eList[i] == this.lastEList[j]) {
									flag=1
								}
							}
							
							if(flag==0){
								console.log(eList[i])
								
								for (var k = 0, lenK = this.disList.length; k < lenK; ++k) {
									if(this.disList[k].id==eList[i]){
										// item.title=this.disList[k].roleName
										var item={id:this.disList[k].id,roleCreateTime:this.disList[k].roleCreateTime,roleDes:this.disList[k].roleDes,roleName:this.disList[k].roleName,roleOrder:this.disList[k].roleOrder,type:this.disList[k].type,planCharge:[{name:'成人',retPrice:null,setPrice:null,minAge:'',maxAge:''}],isSpecial:false,des:''}
										this.disSelectList.push(item);
									}
								}
							}
							
						}
					}
					
					else{
						for (var i = 0, lenI = this.disList.length; i < lenI; ++i) {
							for (var j = 0, lenJ = eList.length; j < lenJ; ++j){
								if (this.disList[i].id == eList[j]) {
									var item={id:this.disList[i].id,roleCreateTime:this.disList[i].roleCreateTime,roleDes:this.disList[i].roleDes,roleName:this.disList[i].roleName,roleOrder:this.disList[i].roleOrder,type:this.disList[i].type,planCharge:[{name:'成人',retPrice:null,setPrice:null,minAge:'',maxAge:''}],isSpecial:false,des:''}
									// item.title=this.disList[i].roleName
									this.disSelectList.push(item);
								}
							}
							
						}
					}
				}
				// 销售端口减少
				else{
					for (var i = 0, lenI = this.lastEList.length; i < lenI; ++i) {
						var flag=0
						for (var j = 0, lenJ = eList.length; j < lenJ; ++j){
							if (eList[j] == this.lastEList[i]) {
								flag=1
							}
						}
						
						if(flag==0){
							var delArea=''
							for (var h = 0, lenH = this.disList.length; h < lenH; ++h) {
								if (this.disList[h].id == this.lastEList[i]) {
									delArea=this.disList[h].roleName
								}
							}
							console.log(this.lastEList[i])
							for (var k = 0, lenK = this.disSelectList.length; k < lenK; ++k) {
								if(this.disSelectList[k].roleName==delArea){
									this.disSelectList.splice(k,1)
									this.lastEList=e.target.value
									this.current=0
									this.areaItem=this.disSelectList[0]
									return
								}
							}
						}
						
					}
				}
				
				this.lastEList=e.target.value
				console.log(this.disSelectList)
				// for(var k=0,lenK = this.disSelectList.length; k < lenK; ++k){
				// 	if(this.current==k){
				// 		this.areaItem=this.disSelectList[k]
				// 		return
				// 	}
				// }
				
			},
			
			segChange: function(e) {
					if (this.current !== e.currentIndex) {
					    this.current = e.currentIndex;
						// for(var i=0,lenI = this.disSelectList.length; i < lenI; ++i){
						// 	if(this.current==i){
						// 		this.areaItem=this.disSelectList[i]
						// 		return
						// 	}
						// }
					}	
					console.log(this.disSelectList)
			},
			addAccount(){
				var item={name:'',retPrice:null,setPrice:null,minAge:'',maxAge:''}
				this.disSelectList[this.current].planCharge.push(item)
			},
			deleteAccount(account,index){
				this.disSelectList[this.current].planCharge.splice(index,1)
			},
			accountInput: function(event, index,item) {
				switch (item) {
					case "name":
						this.disSelectList[this.current].planCharge[index].name = event.target.value;
						break;
					case "retPrice":
						this.disSelectList[this.current].planCharge[index].retPrice = event.target.value;
						break;
					case "setPrice":
						this.disSelectList[this.current].planCharge[index].setPrice = event.target.value;
						break;
					case "minAge":
						this.disSelectList[this.current].planCharge[index].minAge = event.target.value;
						break;
					case "maxAge":
						this.disSelectList[this.current].planCharge[index].maxAge = event.target.value;
						break;
					case "des":
						this.disSelectList[this.current].des = event.target.value;
						break;
					default:
						break;
			
				}
				console.log(this.disSelectList)
			},
			traDetailInput: function(event, index,item) {
				switch (item) {
					case "trip":
						this.travelDetail[index].trip = event.target.value;
						break;
					case "hotel":
						this.travelDetail[index].hotel = event.target.value;
						break;
					case "content":
						this.travelDetail[index].content = event.target.value;
						break;
					default:
						break;
			
				}
				console.log(this.travelDetail)
			},
			onInput: function(event, item) {
				switch (item) {
					case "name":
						this.commodity.name = event.target.value;
						break;
					case "scene":
						this.commodity.proScene = event.target.value;
						break;
					case "feature":
						this.commodity.proDes = event.target.value;
						break;
					case "service":
						this.commodity.proServer = event.target.value;
						break;
					case "buy":
						this.commodity.proBuy = event.target.value;
						break;
					case "aution":
						this.commodity. proAution = event.target.value;
						break;
					case "notice":
						this.commodity.proNotice = event.target.value;
						break;
					case "cost":
						this.commodity.saCost = event.target.value;
						break;
					default:
						break;
			
				}
				console.log(this.disSelectList)
			},
			delImage: function(i,index) {
				uni.showModal({
					content: '确定要放弃这张图片么？',
					success: confirmRes => {
						if (confirmRes.confirm) {
							this.travelDetail[index].images.splice(i, 1);
						}
					}
				});
			},
			checkSelected: function(index,num) {
				for (var i = 0, lenI = this.travelDetail[index].meal.length; i < lenI; ++i) {
					if(this.travelDetail[index].meal[i]==this.mealOption[num].note){
						return true
					}
					
				}
			},
			strategyChange: function(e) {
				this.disSelectList[this.current].isSpecial=!this.disSelectList[this.current].isSpecial
				// this.areaItem.isSpecial=!this.areaItem.isSpecial
				// for(var j=0,lenJ = this.disSelectList.length; j < lenJ; ++j){
				// 	if(this.areaItem.roleName==this.disSelectList[j].roleName){
				// 		this.disSelectList[j]=this.areaItem
				// 	}
				// }
			},
			addPro() {
				console.log(this.disSelectList)
				this.commodity.disListStr=[]
				for(var i=1,lenI = this.disSelectList.length; i < lenI; ++i){
					if(this.disSelectList[i].isSpecial==false){
						this.disSelectList[i].planCharge=this.disSelectList[0].planCharge
						this.disSelectList[i].des=this.disSelectList[0].des
					}
					this.commodity.disListStr.push(this.disSelectList[i])
				}
				
				for(var i=0,lenI = this.serTypeList.length; i < lenI; ++i){
					if(this.serTypeList[i].serviceName=='散客'){
						this.commodity.serType=this.serTypeList[i].id
					}
				}
				this.commodity.proTravelStr=this.travelDetail
				for(var i=0,lenI = this.travelDetail.length; i < lenI; ++i){
					var a=this.travelDetail[i].images
					this.commodity.proTravelStr[i].images=[]
					for(var j=0,lenJ = a.length; j < lenJ; ++j){
						this.commodity.proTravelStr[i].images.push(a[j].rId)
					}
				}
				
				for(var j=0,lenJ = this.imageList.length; j < lenJ; ++j){
					this.commodity.proImage.push(this.imageList[j].rId)
				}
				
				console.log(this.commodity)
				addPro({selectTicketTypeList:this.selectTicketTypeList,id:this.commodity.id,serType:this.commodity.serType,proType_1:this.commodity.proType_1,proType_2:this.commodity.proType_2,name:this.commodity.name,
				saleState:this.commodity.saleState,proAtts:this.commodity.proAtts,proScene:this.commodity.proScene,proDateNum:this.commodity.proDateNum,proLocation:this.commodity.proLocation,
				disListStr:JSON.stringify(this.commodity.disListStr),proImage:this.commodity.proImage,proDes:this.commodity.proDes,proTravelStr:JSON.stringify(this.commodity.proTravelStr),
				proServer:this.commodity.proServer,proBuy:this.commodity.proBuy,proNotice:this.commodity.proNotice,proAution:this.commodity.proAution,
				minTouNum:this.commodity.minTouNum,saCost:this.commodity.saCost}).then(res => {
					console.log(res)
					if(res.status == '1'){
						uni.showToast({
						    title: '产品保存成功',
							icon:"success",
						    duration: 2000
						});
					}
					else{
						uni.showModal({
							showCancel:false,
						    title: '提示',
						    content: res.errMessage  
						});
					}
				}).catch(err => {})
				
			}
	
		}
	}
</script>

<style lang="scss">
	.red{
		color: #f55347;
	}
	.form-item{
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		align-items: center;
		height: auto;
		color: #777777;
		border-bottom: 2px solid #FFFFFF;
		.item-title{
			width: 700rpx;
			margin-top: 10px;
		}
		.upLoad-container{
			display: flex;
			flex-direction: row;
			padding-bottom: 10px;
			padding-top: 5px;
			background-color: #f1f1f1;
			width: 100%;
		}
		.one-row{
			display: flex;
			flex-direction: row;
			width: 700rpx;
			height: auto;
			margin-top: 10px;
			.one-row-title{
				display: flex;
				width: 200rpx;
				align-items: center;
				justify-content: center;
			}
			.one-row-input{
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
		
		.input-container{
			width: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			height: auto;
			margin-top: 10px;
			.item-input{
				width: 700rpx;
				border-radius: 20rpx;
				border: 1px solid #C8C7CC;
				padding: 5px;
				height: auto;
				background-color: #FFFFFF;
			}
		}
		.label-container{
			// border: 1px solid #007AFF;
			// width: 700px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			// margin-left: 25rpx;
			// margin-right: 25rpx;
			margin-top: 10px;
			.question{
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
	.sole-row-item{
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		align-items: center;
		height: auto;
		color: #777777;
		border-bottom: 2px solid #FFFFFF;
		.switch-container{
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
		.input-container{
			width: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			height: auto;
			margin-top: 8px;
			.item-input{
				width: 700rpx;
				border-radius: 20rpx;
				border: 1px solid #C8C7CC;
				padding: 5px;
				height: auto;
				background-color: #FFFFFF;
			}
		}
	}
	.seg-item{
		padding-bottom: 10px;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		align-items: center;
		height: auto;
		color: #777777;
		border-bottom: 2px solid #FFFFFF;
		.null-list{
			display: flex;
			flex-direction: row;
			width: 750rpx;
			margin-top: 10px;
			justify-content: center;
			align-items: center;
		}
		.seg-container{
			width: 100%;
			padding: 8px;
			font-size: 14px;
			margin-top: 10px;
			.seg-content{
				width: 100%;
				display: flex;
				height: auto;
				padding: 8px;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
				border-bottom: 2px solid #FFFFFF;
				.add{
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
				.seg-row-container{
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					width: 100%;
					padding: 10px;
					.seg-row{
						// width: 50%;
						display: flex;
						flex-direction: row;
						// justify-content: center;
						align-items: center;
						.seg-input{
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
		.input-container{
			width: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			height: auto;
			margin-top: 10px;
			.item-input{
				width: 700rpx;
				border-radius: 20rpx;
				border: 1px solid #C8C7CC;
				padding: 5px;
				height: auto;
				background-color: #FFFFFF;
			}
		}
	}
	.text-area{
		height: 400rpx;
		width: 700rpx;
		border-radius: 20rpx;
		border: 1px solid #C8C7CC;
		padding: 5px;
		background-color: #FFFFFF;
	}
	
	.upload-content {
		padding: 24upx 0 0 28upx;
		// background-color: #fff;
		overflow: hidden;
	}
	.upload-item {
		position: relative;
		float: left;
		width: 150upx;
		height: 150upx;
		margin-right: 30upx;
		margin-bottom: 30upx;
		&:nth-child(4n) {
			margin-right: 0;
		}
		.upload-img {
			width: 100%;
			height: 100%;
			border-radius: 8upx;
		}
		.upload-del-btn {
			position: absolute;
			right: -16upx;
			top: -14upx;
			width: 36upx;
			height: 36upx;
			border: 4upx solid #fff;
			border-radius: 100px;
		}
		.upload-progress {
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.4);
			color: #fff;
			font-size: 24upx;
			border-radius: 8upx;
		}
	}
	.upload-add-btn {
		position: relative;
		float: left;
		width: 150upx;
		height: 150upx;
		z-index: 99;
		border-radius: 8upx;
		background: #f9f9f9;
		&:before,
		&:after {
			content: ' ';
			position: absolute;
			top: 50%;
			left: 50%;
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			width: 4upx;
			height: 60upx;
			background-color: #d6d6d6;
		}
		&:after {
			width: 60upx;
			height: 4upx;
		}
		&:active {
			background-color: #f7f7f7;
		}
	}
	
</style>
