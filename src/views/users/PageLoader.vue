<script setup lang="ts">
//
</script>

<template>
  <div class="grid gap-4">
    <div v-for="i in 3" :key="i" class="bg-white rounded-lg p-4 grid grid-cols-2 gap-4">
      <Skeleton height="2.5rem" class="col-span-1" />
      <Skeleton height="2.5rem" class="col-span-1" />
      <Skeleton height="2.5rem" class="col-span-2" />
      <Skeleton height="2.5rem" class="col-span-1" />
      <Skeleton height="2.5rem" class="col-span-1" />
    </div>
  </div>
</template>
