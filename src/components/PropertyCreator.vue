<script setup lang="ts">
import useAsyncData from '@/composables/use-async-data'
import type { FetchError } from '@/composables/use-fetch'
import type { Property } from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const emit = defineEmits(['add-property'])

const loading = ref(false)
const error = ref<FetchError | null>(null)

const addProperty = async () => {
  await useAsyncData<{ property: Property }>(
    'api/properties',
    { loading, error, config: { router, method: 'POST' } },
    (payload) => {
      emit('add-property', payload.property)
    },
  )
}
</script>

<template>
  <div>
    <Button @click="addProperty" :loading label="Add" icon="pi pi-plus" />
    <ErrorMessage :error overlay show-header />
  </div>
</template>
