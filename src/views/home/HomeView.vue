<script setup lang="ts">
import useAsyncData from '@/composables/use-async-data'
import type { FetchError } from '@/composables/use-fetch'
import type { Property, Settings, Transaction } from '@/types'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PageLoader from './PageLoader.vue'
import { daysAgo } from '@/utils'

interface DashboardData {
  settings: Settings
  transactionCount: number
  propertyCount: number
  userCount: number
  lastTransactions: Transaction[]
  lastProperties: Property[]
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
    <section v-if="!loading && !error && data" class="h-full grid md:grid-cols-5 gap-4">
      <div class="md:col-span-5">
        <dashboard-header
          :available-balance="data.settings.availableBalance"
          :transactions="data.transactionCount"
          :properties="data.propertyCount"
          :users="data.userCount"
        />
      </div>

      <div class="bg-white rounded-lg p-4 md:col-span-3">
        <p class="font-medium">Recents</p>
        <Divider />

        <div class="mt-2 grid gap-20">

          <div class="text-sm">
            <div class="flex items-center gap-2">
              <span style="font-size: 0.8rem" class="bg-amber-100 text-amber-500 rounded-full px-3 py-1 pi pi-arrow-right-arrow-left" />
              <span class="font-semibold">Recent Transactions</span>
            </div>

            <div class="overflow-x-auto">
              <DataTable :value="data.lastTransactions">
                <Column field="type" header="Type"></Column>

                <Column header="Amount">
                  <template #body="{ data }">
                    <span class="font-semibold ml-2">
                      &#8361;{{ data.amountPaid.toLocaleString() }}
                    </span>
                  </template>
                </Column>

                <Column header="Date">
                  <template #body="{ data }">
                    <span class="text-slate-500 ml-2">
                      {{ daysAgo(data.createdAt ?? data.transactionDate) }}
                    </span>
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>


          <div class="text-sm">
            <div class="flex items-center gap-2">
              <span style="font-size: 0.8rem" class="bg-blue-100 text-blue-500 rounded-full px-3 py-1 pi pi-building" />
              <span class="font-semibold">Recent Properties</span>
            </div>

            <div class="overflow-x-auto">
              <DataTable :value="data.lastProperties">
                <Column field="name" header="Name"></Column>

                <Column header="Date">
                  <template #body="{ data }">
                    <span class="text-slate-500 ml-2">
                      {{ daysAgo(data.createdAt ?? Date.now()) }}
                    </span>
                  </template>
                </Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>

      <div class="h-full md:col-span-2">
        <site-settings :settings="data.settings" @update-settings="onUpdateSettings" />
      </div>
    </section>
  </main>
</template>
