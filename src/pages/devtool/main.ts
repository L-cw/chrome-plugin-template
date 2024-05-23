import { createApp } from 'vue'
import '../../assets/style/reset.less'
import './style.less'
import App from './App.vue'
// import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'

const app = createApp(App)

// app.use(router)
app.use(ElementPlus)
app.mount('#app')

export {}
