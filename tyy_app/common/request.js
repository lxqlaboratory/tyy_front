
import Request from '@/request/index.js'

// 切换baseUrl 
const config = {
	// baseUrl: 'https://enroll.sdu.edu.cn/func',
    baseUrl: 'http://localhost:8080/func',
	header: {"Content-Type": "application/json",
	},
	cancelReject: {
		text: '请求未通过验证,检查是否登录或者数据正确',
		type: 'warning'
	},
	failReject: {
		type: 'error',
		text: "网络异常，请求发送失败，请检查网络"
	}
}

const reqInterceptor = async (options) => {
	//options.url = options.url+'?vueSessionId='+getApp().globalData.vueSessionId+''
	// console.log(getApp().globalData.vueSessionId)
    //    if(!options.data){
	// 	options.data={}
	// }
	if(options.url != 'http://localhost:8080/func/auth/webLogin')
	// if(options.url != 'https://enroll.sdu.edu.cn/func/auth/webLogin')
    {options.header= {"Content-Type": "application/json",
	"Cookie":"JSESSIONID="+getApp().globalData.vueSessionId}

	var date1 = new Date()
	if(getApp().globalData.dateTime > date1){
		var date = new Date()
		date.setMinutes (date.getMinutes () + 8);
		getApp().globalData.dateTime = date;
		
		}else{
					  uni.showModal({
					  	title: '提示',
					  	showCancel: false,
					  	confirmColor: "#000000",
					  	content: '您长时间未操作',
					  	success: function(res) {
					  		if (res.confirm) {
				           getApp().globalData.vueSessionId = ''
						   uni.navigateTo({
						   	url: '../index/index'
						   })
							   
					  		}
					  	}
					  });
		}

	
	
	}
	return options
}


const resInterceptor = (response, conf={}) => {
	// console.log(response.statusCode)
	// if(response.statusCode === 302){
			
	// 		  uni.showModal({
	// 		  	title: '提示',
	// 		  	showCancel: false,
	// 		  	confirmColor: "#000000",
	// 		  	content: '您长时间未操作',
	// 		  	success: function(res) {
	// 		  		if (res.confirm) {
	// 	           getApp().globalData.vueSessionId = ''
	// 			   uni.navigateTo({
	// 			   	url: '../index/index'
	// 			   })
					   
	// 		  		}
	// 		  	}
	// 		  });
				  
		 
			
	// }else{
	//      return response.data	
	// }
	return response.data
}

const req = new Request(config, reqInterceptor, resInterceptor)

export default req
