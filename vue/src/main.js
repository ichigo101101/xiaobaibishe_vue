import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/global.css'

// 完整引入 Element
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(ElementUI, { size: "small" });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


