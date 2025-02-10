<script setup lang="ts">
import logo from '@/assets/img/logo.png'

const routes = [
  { name: 'Dashboard', pathName: 'dashboard', icon: 'pi pi-th-large' },
  { name: 'Properties', pathName: 'properties', icon: 'pi pi-building-columns' },
  { name: 'Transactions', pathName: 'transactions', icon: 'pi pi-money-bill' },
]
</script>

<template>
  <div class="w-full h-full p-4">
    <div class="flex items-center justify-center gap-2">
      <img :src="logo" alt="Logo" class="w-5 h-auto" />
      <p class="text-[--p-primary-color] font-medium text-xl">
        <span class="font-bold">Haengbok</span>
        <span>Hanteo</span>
      </p>
    </div>

    <Divider />

    <div class="flex flex-col gap-2">
      <router-link
        v-for="route in routes"
        :key="route.pathName"
        :to="{ name: route.pathName }"
        class="flex items-center gap-4 py-2 px-4 rounded-md hover:bg-slate-100 transition-colors"
      >
        <i :class="route.icon"></i>
        {{ route.name }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  background-color: var(--p-primary-500);
  color: white;
}
</style>
