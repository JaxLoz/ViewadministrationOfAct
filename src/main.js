import './assets/main.css'

import { createApp } from 'vue' // importamos createApp para crear la instancia de Vue
import { createPinia } from 'pinia'

import App from './App.vue' // importamos el componente raiz llamado app
import router from './router'

const app = createApp(App) // creamos la instancia de Vue con el componente raiz

app.use(createPinia())
app.use(router)

app.mount('#app')
