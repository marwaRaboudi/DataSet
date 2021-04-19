import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import DataTable from "primevue/datatable";
import DataView from 'primevue/dataview';
import Column from "primevue/column";
import Dialog from 'primevue/dialog';
import InputText from "primevue/inputtext";
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(PrimeVue)
Vue.component('Button', Button);
Vue.component('DataTable', DataTable);
Vue.component('DataView', DataView);
Vue.component('Column', Column);
Vue.component('Dialog', Dialog);
Vue.component('InputText', InputText);
Vue.component('Dropdown', Dropdown);
Vue.component('Calendar', Calendar);
Vue.component('Checkbox', Checkbox);


new Vue({
  render: h => h(App),
}).$mount('#app')
