<template>
  <main class="p-4 h-full">
    <div class="min-h-96 flex flex-col items-center justify-center">
      <h1 class="text-6xl md:text-[5rem] font-semibold">404</h1>
      <p class="text-lg uppercase font-medium">not found</p>

      <div class="mt-10">
        The page you're looking for does not exist or may have been deleted.

        <div class="flex items-center justify-center mt-5 gap-2">
          <Button label="Back" @click="$router.back()" icon="pi pi-arrow-left" severity="secondary" />
          <Button label="Home" @click="$router.push('/')" icon="pi pi-home" />
        </div>
      </div>
    </div>
  </main>
</template>
