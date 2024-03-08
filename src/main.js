import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/main.css'
import 'ant-design-vue/dist/antd.css'
import router from './router'

// import Antd from 'ant-design-vue'

// Vue.use(Antd)
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
