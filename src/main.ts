import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/store';
import { setupRouter } from '@/router';

import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';

function bootstrap() {
  const app = createApp(App);
  setupStore(app);
  setupRouter(app);
  app.mount('#app');
}
bootstrap();
