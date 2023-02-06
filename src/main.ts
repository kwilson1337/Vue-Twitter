import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initApp } from "@/firebase/init.js";
import { useCurrentUser } from "@/stores/CurrentUser"

import App from './App.vue'
import router from './router'

import './assets/styles/style.scss'

//init firebase
initApp()

// init vue app
const app = createApp(App)

// init pinia / routr
app.use(createPinia())
app.use(router)

// set up current user
const defineCurrentUser = useCurrentUser()
defineCurrentUser.getCurrentUser
    .then((user) => {
        console.log(user)
    }).catch((err) => {
        console.log('cannot connect', err)
    }) 

// mount app
app.mount('#app')