<script setup lang="ts">
import { ref, watch } from 'vue'
import type { FetchError } from '@/composables/use-fetch'

interface Props {
  error?: FetchError | Error | null
  overlay?: boolean
  showRetryButton?: boolean
  closable?: boolean
  showHeader?: boolean
}
const {
  error,
  overlay = false,
  showRetryButton = false,
  closable,
  showHeader = false,
} = defineProps<Props>()

defineEmits(['retry'])

const visible = ref(false)

watch(
  () => error,
  (value) => {
    if (value) visible.value = true
    else visible.value = false
  },
)
</script>

<template>
  <div v-if="visible">
    <div v-if="!overlay" class="mt-2">
      <Message severity="error" :closable class="w-fit">
        <div class="flex flex-col gap-2 text-red-600">
          <div v-if="showHeader" class="flex items-center gap-2 w-full">
            <span class="pi pi-info-circle"></span>
            <p class="font-semibold">Something went wrong!</p>
          </div>

          <div v-if="error" class="text-sm w-full text-center">
            <p v-if="error.name === 'AbortError'" class="text-sm w-full text-center">
              That took too long. Check your internet connection and try again later.
            </p>
            <p v-else class="text-sm w-full text-center">{{ error.message }}</p>
          </div>

          <Button
            size="small"
            severity="danger"
            v-if="showRetryButton"
            label="Retry"
            icon="pi pi-refresh"
            @click="$emit('retry')"
          />
        </div>
      </Message>
    </div>

    <Drawer
      v-else
      v-model:visible="visible"
      position="bottom"
      style="height: auto"
      :show-close-icon="closable"
    >
      <template #header>
        <div class="flex items-center gap-2 text-red-500">
          <span class="pi pi-info-circle"></span>
          <p class="font-semibold">Something went wrong!</p>
        </div>
      </template>
      <div v-if="error" class="text-sm">
        <p v-if="error.name === 'AbortError'" class="text-sm">
          That took too long. Check your internet connection and try again later.
        </p>
        <p v-else class="text-sm">{{ error?.message }}</p>
      </div>

      <div class="flex justify-end mt-2">
        <Button
          v-if="showRetryButton"
          size="small"
          severity="danger"
          label="Retry"
          icon="pi pi-refresh"
          @click="$emit('retry')"
        />
      </div>
    </Drawer>
  </div>
</template>
