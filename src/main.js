import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import '@/styles/test.scss'

import App from './App'
import store from './store'
import router from './router'
import * as directives from '@/directive'
import '@/icons' // icon
import '@/permission' // permission control

// mock假数据
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 注册element ui
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// dev: development 开发
// test: 测试
// production 生产
Vue.config.productionTip = false
for (let key in directives) {
  Vue.directive(key, directives[key])
}
// 参数1: 自定义指令的名字: 不需要+v-
// 参数2: 是配置对象
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
