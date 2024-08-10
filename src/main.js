
// 重写控制台方法为空函数
console.log = () => {};
console.warn = () => {};
console.error = () => {};
console.info = () => {};
console.debug = () => {};

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import 'animate.css';
import './utils/rem'
import Vant from 'vant';
import 'vant/lib/index.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.use(Vant);
// import './assets/Icons/iconfont/iconfont.css';
Vue.config.productionTip = false
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: 'en',
    messages: {
        'zh': require('./language/zh.js').lang,
        'en': require('./language/en.js').lang,
    }
})
new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')