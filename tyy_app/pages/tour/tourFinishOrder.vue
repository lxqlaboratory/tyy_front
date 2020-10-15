 <template>
	<view>
		<uni-section title="确认订单信息" type="line" />

		<!-- 		<view class="form-item">
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

		
		<view class="form-item">
			<view class="item-title">选择出行时间</view>
			<radio-group class="label-container" >
				<label class="question" style="width: 300upx;" v-for="(item, index) in dateList" :key="index" @click="getLocation(item)"> 
					<view ><radio :value="item.id" /></view>
					<view style="width: 220upx;margin:10upx 0 0 20upx;" @click="getLocation(item)">{{ item.travelDate }}</view>
				</label>
			</radio-group>
		</view>


		<view class="form-item" v-show="haveDate">
			<view class="item-title">选择上车地点</view>
			<radio-group class="label-container">
				<label class="question" style="width: 300upx;" v-for="(item, index) in locationList" :key="index" @click="viewLocation1(item)">
					<view ><radio :value="item.id"/></view>
					<view style="width: 220upx;margin:10upx 0 0 20upx;color: blue;" @click="viewLocation(item)">{{ item.locationName }}</view>
				</label>
			</radio-group>
		</view>



		<view class="form-item" v-show="showTour">
			<view style="display : flex ; flex-flow : row;">
				<view class="item-title" style="width: 300upx; ">选择出行游客</view>
				<view class="item-title" style="width: 300upx;color: blue;text-align: right;" @click="manageTourist()">管理游客信息</view>
			</view>
			<checkbox-group class="label-container" @change="gatherChange($event)">
				<label class="question" style="width: 700upx;" v-for="(item, index) in tourList" :key="index">
					<view><checkbox :value="item.id" /></view>
					<view style="margin-left: 10upx;">{{ item.name }}</view>
					<view style="margin-left: 10upx;">{{ item.phone }}</view>
					
					<view style="margin-left: 10upx;" >
						<picker class="input" @change="bindchange(item,$event)" :value="item.index1" :range="portList" :range-key="'ticketTypeName'"
						>
						<view class="uni-input">{{portList[item.index1].ticketTypeName+portList[item.index1].setPrice}}</view>
					
					
					</picker>
					
					</view>		
					<!-- 					<view style="margin-left: 10upx;">{{item.cerNum}}</view> -->
				</label>
			</checkbox-group>
		</view>
		<view v-show="haveDate">
		<uni-section title="报名情况" type="line" />
		<view class="form-item"  >			
			<view style="display : flex ; flex-flow : row;">
					<view style="text-align: center;margin-left: 10upx;">计划人数:{{ numList.sumNum }}</view>
					<view style="text-align: center;margin-left: 10upx;">已报人数:{{ numList.planNum }}</view>
					<view style="text-align: center;margin-left: 10upx;">剩余人数:{{ numList.remainNum }}</view>
					<view class="item-title" style="width: 300upx;color: blue;text-align: right;" >
						<button type="primary" style="width: 70%;margin-top: 8upx;" @click="submit" >提交</button>
					</view>
		</view>			
		</view>
		</view>
		

	</view>
</template>

<script>
import { getPlanDate, getLocation, viewTourist,addOrder,tourGetPort,viewTouristAndPortList,savaIdentity,getPlanNum } from '../../api/tour/tour.js';
export default {
	data() {
		return {
			dateList: [],
			phone: '',
			productId: '',
			haveDate: false,
			locationList: [],
			id: '',
			location: '',
			date: '',
			touristIds: [],
			planId: '',
			tourList: [],
			orderId :'',
			showTour:false,
			index1:0,
			portList:[],
			numList:[]
		};
	},

	onLoad: function(option) {
		this.productId = option.productId;
		this.orderId = option.orderId;
		getPlanDate({  productId: this.productId })
			.then(res => {
				if(res.data == "无数据"){
					this.dateList = ''
					}else{
						this.dateList = res.data;
					}
				
			})
			.catch(err => {});
	},
	onShow() {	
	
		viewTouristAndPortList({portList:this.portList})
				.then(res => {
					this.tourList = res.data;
				})
				.catch(err => {});		
			},

	methods: {
		getLocation: function(item) {
			this.date = item.travelDate;
			this.planId = item.id
			this.locationList = [];
			this.checked = false;
			this.location = '';
			getLocation({ id: item.id })
				.then(res => {
					this.locationList = res.data;
					this.haveDate = true;
				})
				.catch(err => {});
			tourGetPort({ orderId: this.orderId,planId:this.planId })
				.then(res => {
					this.portList = res.data;
			viewTouristAndPortList({portList:this.portList})
					.then(res => {
						this.tourList = res.data;
					})
					.catch(err => {});						
				})
				.catch(err => {});	
		getPlanNum({planId:this.planId})
			.then(res => {
				this.numList = res.data;
			})
			.catch(err => {});	
				this.showTour = true			
		},
				bindchange:function(item,e){
				 item.identity = Number(this.portList[e.target.value].ticketTypeId)
				 item.index1 = e.target.value
				 console.log(item.name);
				savaIdentity({ identity: item.identity,touristId:item.id })
				.then(res => {
				})
				.catch(err => {});	
			},
		viewLocation: function(item) {
			this.location = item.id;
			console.log('this.location' + this.location);
			uni.navigateTo({
				url:
					'/pages/guider/viewLocation?locationName=' +
					item.locationName +
					'&locationContent=' +
					item.locationContent +
					'&locationLongitude=' +
					item.locationLongitude +
					'&locationLatitude=' +
					item.locationLatitude +
					' '
			});
		},
		viewLocation1: function(item) {
			this.location = item.id;
			console.log('this.location' + this.location);
		},
		gatherChange: function(e) {
			this.touristIds = e.target.value;
			
		},
		manageTourist: function() {
			uni.navigateTo({
				url: '/pages/tourist/manageTourist?productId='+this.productId+''
			});
		},
		submit :function(){
			addOrder({tourList:this.tourList,orderId:this.orderId, planId: this.planId,location:this.location,date:this.date,touristIds:this.touristIds })
				.then(res => {
					if(res.re==1){
	                   uni.navigateTo({
											url: './orderDetail?orderId='+this.orderId+'&tourList='+encodeURIComponent(JSON.stringify(this.tourList))+'&touristIds='+encodeURIComponent(JSON.stringify(this.touristIds))+'  '
										})	
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
				.catch(err => {});			
		}
	}
};
</script>

<style lang="scss">
.form-item {
	display: flex;
	flex-direction: column;
	font-size: 14px;
	align-items: left;
	height: auto;
	background-color: white;
	border: 4upx solid #D6D6D6;
	.item-title {
		margin-top: 10px;
	}

	.label-container {
		// border: 1px solid #007AFF;
		// width: 700px;
		align-items: left;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		// margin-left: 25rpx;
		// margin-right: 25rpx;
		margin-top: 10px;
		.question {
			display: flex;
			flex-direction: row;
			margin-left: 10upx;
			padding: 10upx;
			align-items: center;
			// border: 1px solid #007AFF;
		}
	}
	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 120upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after {
			border-radius: 100px;
		}
	}
}
</style>
