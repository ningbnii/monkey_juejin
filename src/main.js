import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

if (import.meta.env.MODE == 'development') {
  window.Swal = Swal
}

createApp(App).mount(
  (() => {
    const app = document.createElement('div')
    document.body.append(app)
    return app
  })()
)
