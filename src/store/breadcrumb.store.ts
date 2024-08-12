import { Ref, ref } from 'vue';
import { BreadcrumbMenu } from 'wangsvue/components/breadcrumb/Breadcrumb.vue';

export interface BreadcrumbStore {
  breadcrumbs: Ref<BreadcrumbMenu[]>;
  setBreadcrumbs: (breadrumb: BreadcrumbMenu[]) => void;
}

const breadcrumbs = ref<BreadcrumbMenu[]>([]);

const useBreadcrumbStore = (): BreadcrumbStore => {
  const setBreadcrumbs = (newbreadrumb: BreadcrumbMenu[]): void => {
    breadcrumbs.value = newbreadrumb;
  };

  return {
    breadcrumbs,
    setBreadcrumbs,
  };
};

export default useBreadcrumbStore;
