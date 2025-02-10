<script setup lang="ts">
import useAsyncData from '@/composables/use-async-data'
import { type FetchError } from '@/composables/use-fetch'
import type { Transaction } from '@/types'
import { computed } from 'vue'
import { ref } from 'vue'

interface Props {
  transaction: Transaction | null
}

const { transaction } = defineProps<Props>()

const emit = defineEmits(['update-transaction'])

const data = ref({
  ...transaction,
  transactionDate: new Date(transaction?.transactionDate ?? Date.now()),
})

const disabled = computed(() => {
  if (!data.value) return true
  return (
    Object.values(data.value).some(
      (value) => value === '' || value === null || value === undefined,
    ) || !data.value.amount
  )
})

const visible = defineModel('visible', { default: false })

const loading = ref(false)
const error = ref<FetchError | null>(null)

const update = async () => {
  if (!data.value) return
  data.value.amountPaid = (data.value.amount || 0) + (data.value.charges || 0)
  delete data.value.createdAt
  delete data.value.updatedAt

  await useAsyncData<{ item: Transaction }>(
    `api/transactions/${data.value._id}`,
    { loading, error, config: { method: 'PUT', body: data.value } },
    (payload) => {
      visible.value = false
      emit('update-transaction', payload.item)
      visible.value = false
    },
  )
}
</script>

<template>
  <Dialog v-model:visible="visible" header="Edit Transaction" modal>
    <div v-if="data" class="grid gap-4 md:grid-cols-2 md:w-96">
      <div class="form-control md:col-span-2">
        <label for="title">Transaction Title</label>
        <InputText v-model.trim="data.title" id="title" fluid />
      </div>

      <div class="form-control">
        <label for="amount">Amount</label>
        <InputNumber v-model="data.amount" input-id="amount" fluid />
      </div>

      <div class="form-control">
        <label for="charges">Charges</label>
        <InputNumber v-model="data.charges" input-id="charges" fluid />
      </div>

      <div class="form-control">
        <label for="type">Transaction Type</label>
        <Select
          v-model.trim="data.type"
          input-id="type"
          :options="['deposit', 'withdrawal']"
          fluid
        />
      </div>

      <div class="form-control">
        <label for="status">Transaction Status</label>
        <Select
          v-model.trim="data.status"
          input-id="status"
          :options="['successful', 'pending', 'failed']"
          fluid
        />
      </div>

      <div class="form-control md:col-span-2">
        <label for="recipientName">Recipient Name</label>
        <InputText v-model.trim="data.recipientName" id="recipientName" fluid />
      </div>

      <div class="form-control md:col-span-2">
        <label for="transactionDate">Transaction Date</label>
        <DatePicker
          v-model="data.transactionDate"
          date-format="dd MM, yy"
          input-id="transactionDate"
          fluid
        />
      </div>

      <div class="form-control md:col-span-2">
        <label for="description">Description</label>
        <Textarea v-model="data.description" id="description" fluid rows="3" class="resize-none" />
      </div>

      <ErrorMessage :error="error" />

      <div class="form-control md:col-span-2">
        <Button
          @click="update"
          label="Done"
          :loading
          :disabled="disabled || loading"
          icon="pi pi-check"
          fluid
        />
      </div>
    </div>
  </Dialog>
</template>
