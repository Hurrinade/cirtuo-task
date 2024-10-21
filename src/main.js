import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Noir from './presets/Noir.js';
import 'primeicons/primeicons.css';

import DataView from 'primevue/dataview';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputGroup from 'primevue/inputgroup';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Textarea from 'primevue/textarea';
import Menu from 'primevue/menu';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      prefix: 'p',
      darkModeSelector: '.p-dark',
      cssLayer: false,
    },
  },
});

app.use(createPinia());
app.use(router);
app.use(ConfirmationService);

// PrimeVue Components
app.component('InputGroupAddon', InputGroupAddon);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Textarea', Textarea);
app.component('Menu', Menu);
app.component('InputGroup', InputGroup);
app.component('DataView', DataView);
app.component('FloatLabel', FloatLabel);
app.component('InputText', InputText);
app.component('Card', Card);
app.component('Button', Button);
app.component('Tabs', Tabs);
app.component('TabList', TabList);
app.component('Tab', Tab);
app.component('TabPanels', TabPanels);
app.component('TabPanel', TabPanel);

app.mount('#app');
