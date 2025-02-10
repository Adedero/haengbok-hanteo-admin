<script setup lang="ts">
import useAsyncData from '@/composables/use-async-data'
import { type FetchError } from '@/composables/use-fetch'
import type { User } from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useConfirm } from 'primevue/useconfirm'

interface Props {
  user: User
}

const { user } = defineProps<Props>()

defineEmits(['password-reset'])

const router = useRouter()
const confirm = useConfirm()

const loading = ref(false)
const error = ref<FetchError | null>(null)
const success = ref(false)

const resetPassword = async () => {
  await useAsyncData(
    `api/user-password-reset/${user._id}`,
    { loading, error, config: { router, method: 'PUT' } },
    () => {
      success.value = true
    },
  )
}

const confirmDelete = () => {
  confirm.require({
    message: "Do you want to reset the user's password?",
    header: 'Reset Password',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Reset',
      severity: 'danger',
    },
    accept: () => {
      resetPassword()
    },
  })
}
</script>

<template>
  <div>
    <Button
      @click="confirmDelete"
      :loading
      severity="danger"
      label="Reset Password"
      icon="pi pi-key"
      fluid
    />
    <small class="text-red-500">
      Reset the user's password to
      <span class="font-semibold">000000</span>
    </small>

    <ErrorMessage :error overlay show-header />

    <SuccessMessage
      @hide="$emit('password-reset')"
      v-model:visible="success"
      show-okay-button
      overlay
      message="Password has been reset successfully to 000000"
    />
  </div>
</template>
