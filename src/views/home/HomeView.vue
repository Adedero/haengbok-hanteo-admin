<script setup lang="ts">
import useAsyncData from '@/composables/use-async-data'
import type { FetchError } from '@/composables/use-fetch'
import type { Property, Settings, Transaction, User } from '@/types'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PageLoader from './PageLoader.vue'
import { daysAgo } from '@/utils'

interface DashboardData {
  settings: Settings
  transactionCount: number
  propertyCount: number
  user: User
  lastTransaction: Transaction
  lastProperty: Property
}

const router = useRouter()
const loading = ref(false)
const error = ref<FetchError | null>(null)
const data = ref<DashboardData | null>(null)

const getDashboard = async () => {
  await useAsyncData<DashboardData>(
    'api/admin-dashboard',
    { loading, error, config: { router, cache: true } },
    (payload) => {
      data.value = payload
      //sessionStorage.setItem('propertiesCount', payload.propertyCount.toString())
      //sessionStorage.setItem('transactionsCount', payload.transactionCount.toString())
    },
  )
}

const onUpdateSettings = (settings: Settings) => {
  data.value!.settings = settings
}

onMounted(async () => {
  await getDashboard()
})
</script>

<template>
  <main class="w-full p-4 lg:w-full min-w-0 lg:p-0 overflow-y-auto h-full md:h-[calc(100dvh-7rem)]">
    <PageLoader v-if="loading" />
    <div v-show="error" class="grid place-content-center h-full">
      <ErrorMessage :error show-retry-button @retry="getDashboard" show-header />
    </div>
    <section v-if="!loading && !error && data" class="h-full grid md:grid-cols-3 gap-4">
      <div class="md:col-span-2">
        <dashboard-header
          :available-balance="data.settings.availableBalance"
          :transactions="data.transactionCount"
          :properties="data.propertyCount"
        />

        <user-details :user="data.user" class="mt-4" />

        <div class="mt-4 bg-white rounded-lg p-4">
          <p class="font-medium">Recents</p>
          <Divider />
          <div class="mt-2 grid gap-3">
            <div class="text-sm">
              <span
                style="font-size: 0.8rem"
                class="bg-amber-100 text-amber-500 rounded-full px-3 py-1 pi pi-arrow-right-arrow-left"
              ></span>
              <span>
                Last transaction added
                <span style="font-size: 0.8rem" class="ml-2 pi pi-arrow-right"></span>
              </span>
              <span class="font-semibold ml-2">
                &#8361;{{ data.lastTransaction.amountPaid.toLocaleString() }}</span
              >
              <span class="text-slate-500 ml-2">
                {{
                  daysAgo(data.lastTransaction.createdAt ?? data.lastTransaction.transactionDate)
                }}</span
              >
            </div>

            <div class="text-sm">
              <span
                style="font-size: 0.8rem"
                class="bg-blue-100 text-blue-500 rounded-full px-3 py-1 pi pi-building-columns"
              ></span>
              <span>
                Last property added
                <span style="font-size: 0.8rem" class="ml-2 pi pi-arrow-right"></span>
              </span>
              <span class="font-semibold ml-2">
                {{ data.lastProperty.name ?? data.lastProperty.address }}</span
              >
              <span class="text-slate-500 ml-2">
                {{ daysAgo(data.lastProperty.createdAt ?? Date.now()) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="h-full md:col-span-1">
        <site-settings :settings="data.settings" @update-settings="onUpdateSettings" />
      </div>
    </section>
  </main>
</template>
