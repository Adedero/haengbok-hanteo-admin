<template>
  <div class="grid gap-4">
    <div v-for="i in 3" :key="i" class="bg-white rounded-lg p-4 grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-2">
        <Skeleton height="1rem" width="70%" />
        <Skeleton height="1.3rem" width="10rem" />
        <Skeleton height="2rem" width="5rem" />
      </div>

      <div class="flex flex-col items-end gap-1 justify-between">
        <Skeleton height="0.8rem" width="8rem" />
        <Skeleton height="1rem" width="70%" />
        <Skeleton height="2rem" width="3rem" />
      </div>
    </div>
  </div>
</template>
