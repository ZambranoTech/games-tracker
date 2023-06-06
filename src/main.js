import { createApp } from 'vue'
import App from './App.vue'
import router from '../src/routes/routes'
import "../src/assets/css/styles.css"
import VueSplide from '@splidejs/vue-splide';
import api from './servicios/api';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import VueSelect from "vue-select";


// Add all icons to the library so you can use it in your page -->
library.add(fas, far, fab)


// Importa los componentes de Flowbite que necesitas
import { Datepicker, Modal } from 'flowbite';

// Crea una función para inicializar los componentes de Flowbite
function initializeFlowbiteComponents() {
  // Inicializa los componentes de Flowbite necesarios
  Datepicker.initialize();
  Modal.initialize();
}
//instancia de vue
const app = createApp(App)

app.use(router, VueSplide)

app.provide('$http', api)
app.config.globalProperties.initializeFlowbiteComponents = initializeFlowbiteComponents;
app.component('font-awesome-icon', FontAwesomeIcon);
app.component("v-select", VueSelect);
app.mount('#app')
