<script setup lang="ts">
import useAsyncData from '@/composables/use-async-data'
import { type FetchError } from '@/composables/use-fetch'
import type { Transaction } from '@/types'
import { formatDate } from '@/utils'
import { useConfirm } from 'primevue'
import { computed, defineAsyncComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const confirm = useConfirm()

const TransactionEditor = defineAsyncComponent({
  loader: () => import('../components/TransactionEditor.vue'),
})

interface Props {
  transaction: Transaction
}
const { transaction } = defineProps<Props>()

const severity = ref({
  successful: 'success',
  pending: 'warn',
  failed: 'danger',
})
const tagSeverity = computed(() => severity.value[transaction.status])

const emit = defineEmits(['delete-transaction', 'update-transaction'])

const loading = ref(false)
const error = ref<FetchError | null>(null)

const deleteTransaction = async () => {
  await useAsyncData(
    `api/transactions/${transaction._id}`,
    { loading, error, config: { router, method: 'DELETE' } },
    () => {
      emit('delete-transaction', transaction)
    },
  )
}

const confirmDelete = () => {
  confirm.require({
    message: 'Do you want to delete this transaction?',
    header: 'Delete Transaction',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    accept: () => {
      deleteTransaction()
    },
  })
}

const visible = ref(false)
</script>

<template>
  <div class="bg-white rounded-lg p-3 flex gap-2">
    <Suspense>
      <template #default>
        <TransactionEditor
          @update-transaction="(t: Transaction) => $emit('update-transaction', t)"
          v-model:visible="visible"
          :transaction="transaction"
        />
      </template>
      <template #fallback>
        <Dialog header="Edit Transaction" v-model:visible="visible">
          <div class="h-60 flex items-center justify-center">Loading...</div>
        </Dialog>
      </template>
    </Suspense>

    <div class="bg-slate-100 p-2 rounded-full flex-shrink-0 flex">
      <span
        v-if="transaction.type === 'deposit'"
        class="text-[--p-primary-500] pi pi-arrow-circle-up"
      ></span>
      <span v-else class="text-red-500 self-end pi pi-arrow-circle-down"></span>
    </div>

    <div class="w-full">
      <div class="flex items-center gap-2 justify-between w-full min-w-0">
        <h1 class="truncate">{{ transaction.title }}</h1>
        <Tag :value="transaction.status" :severity="tagSeverity" class="py-1 px-2 text-xs" />
      </div>

      <div class="flex items-end gap-2 justify-between w-full min-w-0">
        <h1 class="md:text-lg font-semibold">
          {{ transaction.type === 'deposit' ? '+' : '-' }}&#8361;{{
            transaction.amountPaid.toLocaleString()
          }}
        </h1>
        <p class="text-xs text-slate-500">
          {{ formatDate(transaction.transactionDate, 'dd MM, yyyy T') }}
        </p>
      </div>

      <div class="mt-2 flex items-center gap-2 justify-between">
        <Button
          @click="visible = true"
          size="small"
          severity="secondary"
          label="Edit"
          icon="pi pi-file-edit"
          class="py-1 px-2"
        />
        <Button
          @click="confirmDelete"
          :loading
          size="small"
          severity="danger"
          icon="pi pi-trash"
          class="py-1 px-2"
        />
      </div>
    </div>
  </div>
</template>
