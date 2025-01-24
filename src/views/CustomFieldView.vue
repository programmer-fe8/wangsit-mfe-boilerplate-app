<script setup lang="ts">
import { watch, shallowRef, computed } from 'vue';
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
  // TODO: baseRoute jadiin array aja, terus kalau ada currentTypeRoute, dipush ke baseRoute
  const baseRoute = { name: 'Custom Field', route: '/customfield' };
  const currentTypeRoute = fieldMenu.find((item) => item.route === route.path);

  return currentTypeRoute
    ? [baseRoute, { name: currentTypeRoute.label as string }]
    : [baseRoute];
});

// TODO: Ini jadi computed aja
const tabMessage = (): string => {
  if (route.path === '/customfield/global') {
    return 'This field is applied at the SKU item level and is valid globally for all stocks under that SKU.';
  }
  return 'This field is applied at the individual stock level, allowing the management of unique information for each stock unit, such as serial numbers.';
};

watch(
  () => route.path,
  () => {
    setBreadcrumbs(getBreadcrumb.value);
  },
  { immediate: true },
);

// TODO: Ini hapus aja
const subTabActiveIndex = shallowRef(0);
</script>

<template>
  <TabMenu v-model:active-index="subTabActiveIndex" :menu="fieldMenu" />
  {{ tabMessage() }}
  <router-view />
</template>
