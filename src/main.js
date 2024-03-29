import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/index.css'

import Vant from 'vant';
import 'vant/lib/index.css';



const app = createApp(App)

app.use(store)
app.use(router)
app.use(Vant)
app.mount('#app')

