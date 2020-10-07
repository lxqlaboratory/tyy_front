import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import '@/icons' // icon
import infoRow from '@/components/easing/infoRow'
import VDistpicker from 'v-distpicker' // 引入省市选择器
import BaiduMap from 'vue-baidu-map'
import Print from '@/plugs/print'

import './directives'
import priceInput from "@/views/com/priceInput"
import priceShow from "@/views/com/priceShow"
Vue.component('v-distpicker', VDistpicker) // 注册组件

Vue.component('price-input',priceInput)
Vue.component('price-show',priceShow)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

// set ElementUI lang to EN
Vue.use(ElementUI, {})
Vue.use(Print)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'YcdPbTAzeXWHhWCOFAy9l0fUFevTg7Gc'
})

Vue.prototype.$delItem = function (arr, item) {
  arr.splice(arr.indexOf(item), 1)
}

Vue.prototype.$rules = {'required': {required: true, message: '该项不可为空',trigger: 'blur'},
  'number':{ type: 'number', message: '该项必须为数字',trigger: 'blur'}

}

Vue.config.productionTip = false
Vue.component('infoRow', infoRow)

// commonjs require
// NOTE: default needed after require

new Vue({
  el: '#app',
  router,

  render: h => h(App)
})
