<script setup lang="ts">
import useAsyncData from '@/composables/use-async-data'
import { type FetchError } from '@/composables/use-fetch'
import type { Transaction } from '@/types'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const visible = ref(false)

const emit = defineEmits(['add-transaction'])

const data = ref<Partial<Transaction>>({
  type: 'deposit',
  status: 'successful',
})

const defaultTitle = computed(() => data.value.type === 'deposit' ? 'Property Sale' : 'Property Purchase')

const loading = ref(false)
const error = ref<FetchError | null>(null)
const noAmount = ref(false)
const addTransaction = async () => {
  noAmount.value = false
  if (!data.value.amountPaid) {
    noAmount.value = true
    return
  }
  const transaction = await createTransaction(data.value)
  await useAsyncData<{ item: Transaction, availableBalance: number }>(
    'api/transactions',
    { loading, error, config: { router, method: 'POST', body: transaction } },
    (payload) => {
      visible.value = false
      emit('add-transaction', payload.item)
    },
  )
}

async function createTransaction(value: Partial<Transaction>): Promise<Partial<Transaction>> {
  const title = value.title || defaultTitle.value;

  const amountPaid = value.amountPaid ?? 0

  // Random percentage from the array
  const percentages = [0.02, 0.05, 0.08, 0.1, 0.12, 0.15, 0.18, 0.2]
  const randomPercentage = percentages[Math.floor(Math.random() * percentages.length)]

  // Calculate charges and amount, rounding to ensure they are integers
  const charges = Math.round(amountPaid * randomPercentage)
  const amount = Math.max(Math.round(amountPaid - charges), 0)

  const [customers, locations] = await Promise.all([
    import('../data/customers'),
    import('../data/locations'),
  ])
  const randomIndexes = [
    Math.floor(Math.random() * customers.default.length),
    Math.floor(Math.random() * locations.default.length),
  ]
  const customer = customers.default[randomIndexes[0]]
  const location = locations.default[randomIndexes[1]]

  const description = value.description || `${value.type === 'deposit' ? 'Sale' : 'Purchase'} of property at ${location}`

  return {
    title,
    amount,
    charges,
    amountPaid,
    type: value.type ?? 'deposit',
    status: value.status ?? 'successful',
    recipientName: customer,
    transactionDate: new Date(Date.now()),
    transactionRef: generateTransactionRef(),
    description,
  }
}

function generateTransactionRef(): string {
  const prefix = 'TXN'
  const now = new Date()
  const datePart = `${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}`
  const timePart = `${now.getHours().toString().padStart(2, '0')}${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`
  const randomDigits = Math.floor(1000 + Math.random() * 9000)
  return `${prefix}${datePart}${timePart}${randomDigits}`
}
</script>

<template>
  <div>
    <Button @click="visible = true" label="Add" icon="pi pi-plus" />
    <Dialog header="New Transaction" v-model:visible="visible" modal class="md:w-96">
      <div class="grid gap-4">
        <div class="form-control">
          <label for="title">Title <small class="font-semibold">(optional)</small></label>
          <InputText v-model="data.title" id="title" placeholder="Transaction title" />
          <small class="mt-1">If you don't enter a title, the default will be: <b>{{ defaultTitle }}</b></small>
        </div>

        <div class="form-control">
          <label for="amount">Amount</label>
          <InputGroup>
            <InputGroupAddon>&#8361;</InputGroupAddon>
            <InputNumber v-model="data.amountPaid" placeholder="Amount" />
          </InputGroup>
          <small v-if="noAmount" class="text-red-500">Enter an amount</small>
        </div>

        <div class="form-control">
          <label for="type">Transaction Type</label>
          <Select v-model="data.type" input-id="type" :options="['deposit', 'withdrawal']" />
        </div>

        <div class="form-control">
          <label for="status">Transaction Status</label>
          <Select
            v-model="data.status"
            input-id="status"
            :options="['successful', 'pending', 'failed']"
          />
        </div>

        <div class="form-control">
          <label for="description">Description</label>
          <Textarea v-model="data.description" id="description" rows="4" />
        </div>

        <ErrorMessage :error show-header />

        <div class="form-control mt-2">
          <Button label="Add" icon="pi pi-plus" :loading="loading" @click="addTransaction" />
        </div>
      </div>
    </Dialog>
  </div>
</template>
