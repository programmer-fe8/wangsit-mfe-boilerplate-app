<script setup lang="ts">
import { onMounted, onBeforeMount } from 'vue';
import { TSToast, TSLoading, useLoadingStore } from 'tsv2-library';

const { setLoading } = useLoadingStore();

onBeforeMount(() => {
  setLoading(true); // Start Loading
});

onMounted(() => {
  /**
   * This is an example only. You may remove this.
   */
  setTimeout(() => {
    setLoading(false); // Stop Loading
  }, 3000);
});
</script>

<template>
  <router-view />
  <TSToast />
  <TSLoading />
</template>
