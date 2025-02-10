<script setup lang="ts">
import { watch } from 'vue'

interface Props {
  message?: string
  overlay?: boolean
  closable?: boolean
  life?: number
  showOkButton?: boolean
}
const { overlay = false, closable = true, life = 4000, showOkButton = false } = defineProps<Props>()

defineEmits(['hide', 'after-hide'])

const visible = defineModel('visible', { default: false })

const closeDrawer = (duration: number) => {
  setTimeout(() => {
    visible.value = false
  }, duration)
}

watch(
  () => life,
  (value) => {
    if (!value || value <= 0) {
      return
    }
    closeDrawer(life)
  },
)
</script>

<template>
  <div v-if="visible">
    <div v-if="!overlay" class="mt-2">
      <Message severity="success" :closable :life>
        <div class="grid gap-2 text-green-600 text-center">
          <div class="flex items-center gap-2 w-full">
            <span class="pi pi-check-circle"></span>
            <p class="font-semibold">Done!</p>
          </div>

          <p v-if="message" class="text-sm w-full text-center">{{ message }}</p>

          <slot />

          <Button
            @click="visible = false"
            size="small"
            severity="success"
            v-if="showOkButton"
            label="Okay"
            icon="pi pi-check-circle"
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
      @hide="$emit('hide')"
      @after-hide="$emit('after-hide')"
    >
      <template #header>
        <div class="flex items-center gap-2 text-green-500">
          <span class="pi pi-check-circle"></span>
          <p class="font-semibold">Done!</p>
        </div>
      </template>

      <p v-if="message" class="text-sm">
        {{ message }}
      </p>
      <slot />

      <div class="flex justify-end mt-2">
        <Button
          v-if="showOkButton"
          size="small"
          severity="success"
          label="Okay"
          icon="pi pi-check-circle"
          @click="visible = false"
        />
      </div>
    </Drawer>
  </div>
</template>
