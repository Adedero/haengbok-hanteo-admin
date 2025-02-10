<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <main class="md:h-dvh pb-10 flex lg:gap-4 lg:pb-4 lg:p-4 bg-slate-100">
    <div
      :class="[
        isOpen ? 'w-dvw' : 'w-0',
        'overlay z-50 fixed h-full overflow-hidden top-0 left-0 bg-black/20 backdrop-blur-sm flex-shrink-0',
        'lg:relative lg:w-60 xl:w-72 lg:rounded-lg',
      ]"
      @click="isOpen = false"
    >
      <nav
        :class="[
          isOpen ? 'w-[80dvw] max-w-72' : 'w-0',
          'transition-all duration-300',
          'h-full bg-white overflow-hidden lg:w-full',
        ]"
      >
        <nav-bar />
      </nav>
    </div>

    <section class="relative min-h-0 h-full flex-grow flex flex-col gap-4 *:flex-shrink-0">
      <header
        class="sticky z-50 shadow-sm md:shadow-none top-0 p-2 lg:p-4 flex items-center justify-between gap-5 bg-white lg:rounded-lg"
      >
        <h1 v-if="$route && $route.name" class="text-lg font-semibold">
          {{ ($route.name as string)[0].toUpperCase() + ($route.name as string).slice(1) }}
        </h1>
        <Button @click="isOpen = !isOpen" icon="pi pi-bars" outlined class="lg:hidden" />
      </header>

      <div class="flex-grow w-full min-w-0 overflow-y-auto min-h-0">
        <router-view />
      </div>
    </section>
  </main>
</template>
