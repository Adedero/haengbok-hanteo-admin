import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import { MyPreset } from './theme'
import ConfirmationService from 'primevue/confirmationservice'

const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: MyPreset,
    options: {
      prefix: 'p',
      darkModeSelector: 'class',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
    },
  },
})

app.use(ConfirmationService)

app.mount('#app')
