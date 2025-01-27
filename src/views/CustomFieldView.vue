<script setup lang="ts">
import { watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { BreadcrumbMenu } from 'wangsvue/components/breadcrumb/Breadcrumb.vue';
import { useBreadcrumbStore } from '@/store';
import { MenuItem } from 'wangsvue/components/menuitem';
import { TabMenu } from 'wangsvue';

const { setBreadcrumbs } = useBreadcrumbStore();
const route = useRoute();

const fieldMenu: MenuItem[] = [
  { label: 'Global', route: '/customfield/global' },
  { label: 'Specific', route: '/customfield/specific' },
];

const getBreadcrumb = computed<BreadcrumbMenu[]>(() => {
  const baseRoute = [{ name: 'Custom Field', route: '/customfield' }];
  const currentTypeRoute = fieldMenu.find((item) => item.route === route.path);

  if (currentTypeRoute) {
    baseRoute.push({
      name: currentTypeRoute.label as string,
      route: currentTypeRoute.route as string,
    });
  }

  return baseRoute;
});

const tabMessage = computed((): string => {
  if (route.path === '/customfield/global') {
    return 'This field is applied at the SKU item level and is valid globally for all stocks under that SKU.';
  }
  return 'This field is applied at the individual stock level, allowing the management of unique information for each stock unit, such as serial numbers.';
});

watch(
  () => route.path,
  () => {
    setBreadcrumbs(getBreadcrumb.value);
  },
  { immediate: true },
);
</script>

<template>
  <TabMenu :menu="fieldMenu" />
  {{ tabMessage }}
  <router-view />
</template>
