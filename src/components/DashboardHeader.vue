<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  availableBalance?: number
  transactions?: number
  properties?: number
  users?: number
}

const { availableBalance, transactions, properties, users } = defineProps<Props>()

const data = computed(() => {
  return [
    {
      name: 'Available Balance',
      value: `${availableBalance?.toLocaleString()}`,
      bgColor: 'bg-[--p-primary-100]',
      textColor: 'text-[--p-primary-color]',
    },
    {
      name: 'Users',
      value: users,
      bgColor: 'bg-amber-100',
      textColor: 'text-amber-500'
    },
    {
      name: 'Transactions',
      value: transactions,
      bgColor: 'bg-green-100',
      textColor: 'text-green-500',
    },
    {
      name: 'Properties',
      value: properties,
      bgColor: 'bg-red-100',
      textColor: 'text-red-500',
    },
  ]
})
</script>

<template>
  <header class="flex flex-wrap items-center gap-2 justify-between bg-white rounded-lg p-4">
    <div v-for="item in data" :key="item.name" class="flex items-center gap-2">
      <div
        :class="[
          item.bgColor,
          item.textColor,
          'rounded-full h-12 aspect-square grid place-items-center',
        ]"
      >
        <span class="pi pi-money-bill"></span>
      </div>
      <div class="text-sm">
        <p class="font-bold text-xl">
          <span v-if="item.name === 'Available Balance'">&#8361;</span>
          <span>{{ item.value }}</span>
        </p>
        <p class="text-xs text-slate-500">{{ item.name }}</p>
      </div>
    </div>
  </header>
</template>
