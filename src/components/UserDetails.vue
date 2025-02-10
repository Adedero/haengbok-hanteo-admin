<script setup lang="ts">
import useAsyncData from '@/composables/use-async-data'
import { type FetchError } from '@/composables/use-fetch'
import type { User } from '@/types'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Props {
  user: User
}
const { user } = defineProps<Props>()

const customer = ref({
  ...user,
  birthday: new Date(user.birthday),
})

const isEditing = ref(false)

const disabled = computed(() => {
  return (
    Object.values(customer.value).some(
      (value) => value === '' || value === null || value === undefined,
    ) || !customer.value.location.country
  )
})

const loading = ref(false)
const error = ref<FetchError | null>(null)

const updateUser = async () => {
  await useAsyncData(
    `api/users/${customer.value._id}`,
    { loading, error, config: { router, method: 'PUT', body: customer.value } },
    () => {
      isEditing.value = false
    },
  )
}
</script>

<template>
  <div class="bg-white rounded-lg p-4 w-full">
    <div class="flex items-center justify-between">
      <p class="font-medium">Customer</p>
      <Button
        v-if="!isEditing"
        @click="isEditing = true"
        size="small"
        label="Edit"
        icon="pi pi-user-edit"
      />

      <div v-if="isEditing" class="flex items-center gap-2">
        <Button
          @click="updateUser"
          :disabled
          :loading
          size="small"
          label="Save"
          icon="pi pi-check"
        />
        <Button
          @click="isEditing = false"
          size="small"
          severity="secondary"
          label="Cancel"
          icon="pi pi-times"
        />
      </div>
    </div>

    <hr class="my-2" />

    <div class="mt-4 grid md:grid-cols-2 gap-4">
      <div>
        <label for="name" class="text-sm text-slate-500 font-medium">Name</label>
        <InputText v-model.trim="customer.name" id="name" fluid :disabled="!isEditing" />
      </div>

      <div>
        <label for="gender" class="text-sm text-slate-500 font-medium">Gender</label>
        <Select
          v-model="customer.gender"
          :options="['female', 'male', 'other']"
          input-id="gender"
          fluid
          :disabled="!isEditing"
        />
      </div>

      <div class="md:col-span-2">
        <label for="email" class="text-sm text-slate-500 font-medium">Email</label>
        <InputText v-model="customer.email" type="email" id="email" fluid :disabled="!isEditing" />
      </div>

      <div>
        <label for="birthday" class="text-sm text-slate-500 font-medium">Birthday</label>
        <DatePicker
          v-model="customer.birthday"
          input-id="birthday"
          dateFormat="dd MM, yy"
          fluid
          :disabled="!isEditing"
        />
      </div>

      <div>
        <label for="location" class="text-sm text-slate-500 font-medium">Location</label>
        <InputText v-model="customer.location.country" id="location" fluid :disabled="!isEditing" />
      </div>

      <PasswordReset v-if="isEditing" :user="customer" @password-reset="isEditing = false" />
    </div>
  </div>
</template>
