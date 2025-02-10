<script setup lang="ts">
import { type PageState } from 'primevue'
import { computed, onMounted, ref } from 'vue'
import type { FetchError } from '@/composables/use-fetch'
import type { Transaction } from '@/types'
import useAsyncData from '@/composables/use-async-data'
import { useRouter } from 'vue-router'
import PageLoader from './PageLoader.vue'

const router = useRouter()

const first = ref(0)
const page = ref(0)
const updatePage = (event: PageState) => {
  page.value = event.page
  getTransactions()
}
const limit = ref(10)
const skip = computed(() => limit.value * page.value)

const loading = ref(false)
const error = ref<FetchError | null>(null)
const transactions = ref<Transaction[] | null>(null)

async function getTransactions() {
  await useAsyncData<{ items: Transaction[] }>(
    `api/transactions?skip=${skip.value}&limit=${limit.value}&sort=transactionDate,desc`,
    { loading, error, config: { router, cache: true } },
    (payload) => {
      transactions.value = payload.items
    },
  )
}

const transactionsCount = ref<number | undefined>()
async function getTransactionsCount() {
  await useAsyncData<{ count: number }>(
    'api/transactions-count',
    { loading, error, config: { router, cache: true } },
    (payload) => {
      transactionsCount.value = payload.count
    },
  )
}

onMounted(async () => {
  await Promise.all([getTransactionsCount(), getTransactions()])
})

const onAddTransaction = (transaction: Transaction) => {
  transactions.value = transactions.value ? [transaction, ...transactions.value] : [transaction]
  transactionsCount.value = (transactionsCount.value ?? 0) + 1
}

const onDeleteTransaction = (transaction: Transaction) => {
  if (!transactions.value) return
  transactions.value = transactions.value?.filter((t: Transaction) => t._id !== transaction._id)
  transactionsCount.value = Math.max((transactionsCount.value ?? 0) - 1, 0)
}

const onUpdateTransaction = (transaction: Transaction) => {
  if (!transactions.value) return
  const index = transactions.value.findIndex((t) => t._id === transaction._id)
  transactions.value[index] = transaction
}
</script>

<template>
  <main class="p-4 lg:p-0 md:h-[calc(100dvh-7rem)]">
    <div class="fixed z-[100] top-2 right-16 lg:top-6 lg:right-8 flex items-center gap-2">
      <p v-if="transactionsCount" class="font-bold text-[--p-primary-color]">
        ({{ transactionsCount }})
      </p>

      <TransactionCreator @add-transaction="onAddTransaction" />
    </div>

    <PageLoader v-if="loading" />
    <ErrorMessage :error show-retry-button @retry="getTransactions" show-header />

    <div v-if="!loading && !error && transactions" class="grid gap-2 mb-4">
      <TransactionItem
        v-for="transaction in transactions"
        :key="transaction._id"
        :transaction
        @delete-transaction="onDeleteTransaction"
        @update-transaction="onUpdateTransaction"
      />
    </div>

    <div>
      <Paginator
        v-model:first="first"
        @page="updatePage"
        :rows="limit"
        :totalRecords="transactionsCount"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      />
    </div>
  </main>
</template>
