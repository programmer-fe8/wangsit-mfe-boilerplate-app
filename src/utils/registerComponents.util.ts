import { App } from 'vue';
import { Tooltip, WangsVue, Preset, ToastService } from 'wangsvue';

import router from '@/router';

import '@/assets/css/main.css';
import 'wangsvue/style.css';

const registerComponents = (app: App): void => {
  app.use(WangsVue, {
    unstyled: true,
    pt: Preset,
  });

  app.use(router);
  app.use(ToastService);

  app.directive('Tooltip', Tooltip);
};

export default registerComponents;
