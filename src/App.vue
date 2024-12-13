<script setup lang="ts">
import { inject } from 'vue';
import { Toast } from 'wangsvue';

const preset = inject('preset');

// eslint-disable-next-line
console.log(preset.tabmenu);
</script>

<template>
  <router-view />
  <Toast />
</template>
