<script setup lang="ts">
import useAsyncData from '@/composables/use-async-data'
import { type FetchError } from '@/composables/use-fetch'
import type { Settings } from '@/types'
import { ToggleButton } from 'primevue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  settings: Settings
}
const { settings } = defineProps<Props>()

const emit = defineEmits(['update-settings'])

const router = useRouter()

const data = ref({
  ...settings,
  appDetails: {
    ...settings.appDetails,
    releaseDate: new Date(settings.appDetails.releaseDate),
  },
})

const isUpdating = ref(false)
const isEditing = ref(false)

const loading = ref(false)
const error = ref<FetchError | null>(null)
const success = ref(false)
const updateSettings = async () => {
  await useAsyncData(
    'api/settings',
    { loading, error, config: { router, method: 'PUT', body: data.value } },
    () => {
      isUpdating.value = false
      isEditing.value = false
      success.value = true
      emit('update-settings', data.value)
    },
  )
}
</script>

<template>
  <div class="bg-white rounded-lg p-4 w-full h-full">
    <SuccessMessage
      v-model:visible="success"
      show-okay-button
      overlay
      message="Settings has been updated successfully!"
    />

    <ErrorMessage :error overlay show-header />

    <div class="flex items-center justify-between">
      <p class="font-medium">Settings</p>
    </div>

    <hr class="my-2" />

    <div class="mt-4">
      <div>
        <span class="px-4 py-1 bg-green-100 text-green-500 rounded-full pi pi-money-bill"></span>
        <div class="mt-2">
          <div v-if="!isUpdating" class="flex items-center gap-2">
            <p @dblclick="isUpdating = true" class="cursor-pointer font-semibold text-2xl">
              &#8361;{{ settings.availableBalance.toLocaleString() }}
            </p>
            <Button v-if="!isUpdating" @click="isUpdating = true" size="small" label="Update" />
          </div>

          <InputGroup v-else>
            <InputGroupAddon>&#8361;</InputGroupAddon>
            <InputNumber
              v-model="data.availableBalance"
              placeholder="Available balance"
              class="text-xl font-semibold"
            />
          </InputGroup>

          <small>Available Balance</small>
          <div v-if="isUpdating" class="mt-2 flex items-center gap-2">
            <Button
              size="small"
              @click="updateSettings"
              :loading
              label="Done"
              fluid
              icon="pi pi-check"
            />
            <Button
              size="small"
              @click="isUpdating = false"
              severity="secondary"
              label="Cancel"
              fluid
              icon="pi pi-times"
            />
          </div>
        </div>

        <Divider />
      </div>

      <div class="flex items-center justify-between">
        <p class="font-medium">App Details</p>
        <Button
          @click="isEditing = !isEditing"
          size="small"
          :label="isEditing ? 'Cancel' : 'Edit'"
          :icon="isEditing ? 'pi pi-times' : 'pi pi-pencil'"
          :severity="isEditing ? 'secondary' : 'primary'"
        />
      </div>

      <div class="mt-4 grid gap-4">
        <div class="flex-col gap-1">
          <label for="lang" class="text-sm text-slate-500 font-medium">Language</label>
          <Select
            v-model="data.lang"
            input-id="lang"
            :options="['en', 'ko']"
            fluid
            :disabled="!isEditing"
          >
            <template #value="{ value }">
              {{ value === 'en' ? 'English' : 'Korean' }} ({{ value }})
            </template>
            <template #option="{ option }">
              {{ option === 'en' ? 'English' : 'Korean' }} ({{ option }})
            </template>
          </Select>
        </div>

        <div class="flex flex-col gap-1">
          <label for="app-name" class="text-sm text-slate-500 font-medium">App Name</label>
          <InputText v-model.trim="data.appDetails.name" id="app-name" fluid disabled />
        </div>

        <div class="flex flex-col gap-1">
          <label for="app-version" class="text-sm text-slate-500 font-medium">App Version</label>
          <InputText
            v-model.trim="data.appDetails.version"
            id="app-version"
            fluid
            :disabled="!isEditing"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="release-date" class="text-sm text-slate-500 font-medium"
            >App Release Date</label
          >
          <DatePicker
            v-model="data.appDetails.releaseDate"
            date-format="dd MM, yy"
            input-id="release-date"
            fluid
            :disabled="!isEditing"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="release-date" class="text-sm text-slate-500 font-medium"
            >Show New Version Alert</label
          >
          <small>Alert the user to download a new version of the app.</small>
          <ToggleButton
            v-model="data.appDetails.isNewVersionAvailable"
            on-label="Yes"
            off-label="No"
            :disabled="!isEditing"
            class="w-full"
          />
        </div>

        <Button v-if="isEditing" @click="updateSettings" :loading label="Save" fluid />
      </div>
    </div>
  </div>
</template>
