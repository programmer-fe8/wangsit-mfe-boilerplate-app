import { App } from 'vue';
import { Tooltip, WangsVue, ToastService } from 'wangsvue';
import { wangsvue } from 'wangsvue-presets';

import router from '@/router';

import '@/assets/css/main.css';
import 'wangsvue/style.css';
import 'wangsvue-presets/wangsvue/style.css';

const registerComponents = (app: App): void => {
  app.use(WangsVue, {
    unstyled: true,
    pt: wangsvue,
  });

  app.provide('preset', wangsvue);

  app.use(router);
  app.use(ToastService);

  app.directive('Tooltip', Tooltip);
};

export default registerComponents;
