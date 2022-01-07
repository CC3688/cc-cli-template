import { createApp } from 'vue'
import App from './App.vue'
import bootstrap from '@/plugins/bootstrap'
import router from '@/router'
import { store, key } from '@/store'

console.log('import::', import.meta.env)

const app = createApp(App)
app.use(router).use(store, key).use(bootstrap)
app.mount('#app')

export { app }
