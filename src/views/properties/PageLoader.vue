<template>
  <div class="grid gap-4">
    <div v-for="i in 3" :key="i" class="bg-white rounded-lg p-4 flex flex-col gap-2 md:flex-row">
      <div class="h-28 md:h-auto w-full md:max-w-44">
        <Skeleton height="100%" width="100%" />
      </div>

      <div class="flex-grow flex flex-col gap-2 justify-between">
        <Skeleton height="1.5rem" width="100%" />
        <Skeleton height="1rem" width="80%" />
        <Skeleton height="1.5rem" width="10rem" />
        <Skeleton height="0.8rem" width="4rem" />
        <div class="flex items-center gap-2 justify-end md:justify-normal">
          <Skeleton height="2rem" width="5rem" />
          <Skeleton height="2rem" width="5rem" />
        </div>
      </div>
    </div>
  </div>
</template>
