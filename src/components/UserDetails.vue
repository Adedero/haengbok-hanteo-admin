<script setup lang="ts">
import useAsyncData from '@/composables/use-async-data'
import { type FetchError } from '@/composables/use-fetch'
import type { User } from '@/types'
import { useConfirm } from 'primevue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const confirm = useConfirm()

interface Props {
  user: User
  index: number
}
const { user, index } = defineProps<Props>()

const emit = defineEmits<{
  deleteUser: [id: string]
}>()

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
  if (customer.value.kyc?.status === 'successful') {
    customer.value.kyc = {
      ...(customer.value.kyc ?? {}),
      verifiedAt: new Date(Date.now())
    }
  }

  if (customer.value.kyc?.status !== 'successful') {
    delete customer.value.kyc?.verifiedAt
  }
  await useAsyncData(
    `api/users/${customer.value._id}`,
    { loading, error, config: { router, method: 'PUT', body: customer.value } },
    () => {
      isEditing.value = false
    },
  )
}

const deleting = ref<boolean>(false)
const errorDeleting = ref<FetchError | null>(null)

const deleteUser = async () => {
  await useAsyncData(
    `api/users/${customer.value._id}`,
    {
      loading: deleting,
      error: errorDeleting,
      config: { router, method: 'DELETE' }
    },
    () => {
      emit('deleteUser', customer.value._id)
    }
  )
}


const confirmDelete = () => {
  confirm.require({
    message: 'Do you want to delete this user? This action cannot be reversed.',
    header: 'Delete User',
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
      deleteUser()
    },
  })
}
</script>

<template>
  <div class="bg-white rounded-lg p-4 w-full">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-1">
        <p>{{ index + 1 }}.</p>
        <p class="font-medium">{{ customer.name }}</p>
      </div>

      <div class="flex items-center gap-1">
        <Button
          v-if="!isEditing"
          @click="isEditing = true"
          size="small"
          label="Edit"
          icon="pi pi-user-edit"
        />

        <Button
          v-if="!isEditing"
          @click="confirmDelete"
          size="small"
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          :loading="deleting"
        />
      </div>


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

    <ErrorMessage :error="errorDeleting" closable />

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


      <div class="md:col-span-2">
        <p class="text-sm text-slate-500 font-medium">ID Verification</p>
        <div v-if="!customer.kyc?.document" class="text-sm">
          No ID has been submitted by this user for verification.
        </div>

        <div v-else class="grid md:grid-cols-2 gap-4">
          <div class="grid">
            <p class="text-sm text-slate-500 font-medium">Document</p>
            <a :href="`${customer.kyc.document}`" :download="`ID-${customer.name}.${customer.kyc.ext}`">
              <Button label="Download document" icon="pi pi-file" fluid />
            </a>
          </div>

          <div class="grid">
            <label for="kyc-status" class="text-sm text-slate-500 font-medium">Status</label>
            <Select
              v-model="customer.kyc.status"
              :options="['pending', 'successful', 'failed']"
              input-id="kyc-status"
              fluid
              :disabled="!isEditing"
            />
          </div>
        </div>
      </div>

      <PasswordReset v-if="isEditing" :user="customer" @password-reset="isEditing = false" />
    </div>
  </div>
</template>
