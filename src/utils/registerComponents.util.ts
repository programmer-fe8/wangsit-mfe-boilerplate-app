import { App } from 'vue';
import { Tooltip, TSToastService, LibConfig } from 'tsv2-library';

import router from '@/router';
import Presets from 'tsv2-library/src/presets';

import '@/assets/css/main.css';
import 'tsv2-library/dist/style.css';

const registerComponents = (app: App): void => {
  app.use(LibConfig, {
    unstyled: true,
    pt: Presets,
  });

  app.use(router);
  app.use(TSToastService);

  app.directive('Tooltip', Tooltip);
};

export default registerComponents;
