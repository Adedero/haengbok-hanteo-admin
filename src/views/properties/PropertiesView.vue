<script setup lang="ts">
import useAsyncData from '@/composables/use-async-data'
import type { FetchError } from '@/composables/use-fetch'
import type { Property } from '@/types'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import PageLoader from './PageLoader.vue'
import { useConfirm, type PageState } from 'primevue'

const router = useRouter()
const confirm = useConfirm()

const loading = ref(false)
const error = ref<FetchError | null>(null)
const properties = ref<Property[] | null>(null)

const first = ref(0)
const page = ref(0)

const limit = ref(20)
const skip = computed(() => limit.value * page.value)

const propertiesCount = ref<number | null>(null)

const getProperties = async () => {
  await useAsyncData<{ items: Property[] }>(
    `api/properties?skip=${skip.value}&limit=${limit.value}`,
    { loading, error, config: { router, cache: true } },
    (payload) => {
      properties.value = payload.items
    },
  )
}

const updatePage = (event: PageState) => {
  page.value = event.page
  getProperties()
}

const getPropertiesCount = async () => {
  await useAsyncData<{ count: number }>(
    'api/properties-count',
    { loading, error, config: { router, cache: true } },
    (payload) => {
      propertiesCount.value = payload.count
      sessionStorage.setItem('propertiesCount', payload.count.toString())
    },
  )
}

const deleting = ref(false)
const errorDeleting = ref<FetchError | null>(null)

const deleteProperty = async (id: string) => {
  await useAsyncData(
    `api/properties/${id}`,
    { loading: deleting, error: errorDeleting, config: { router, method: 'DELETE' } },
    () => {
      if (properties.value) {
        properties.value = properties.value.filter((property) => property._id !== id)
      }
    },
  )
}

const confirmDelete = (id: string) => {
  confirm.require({
    message: 'Do you want to delete this property?',
    header: 'Delete Property',
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
      deleteProperty(id)
    },
  })
}

onMounted(async () => {
  await Promise.all([getPropertiesCount(), getProperties()])
})

const propertyToEdit = ref<Property | null>(null)
const visible = ref(false)

const editProperty = (property: Property) => {
  propertyToEdit.value = property
  visible.value = true
}

const handleUpdateProperty = (property: Property) => {
  if (properties.value) {
    const index = properties.value.findIndex((p) => p._id === property._id)
    properties.value[index] = property
  }
  visible.value = false
}

const onAddProperty = (property: Property) => {
  if (properties.value) {
    properties.value.unshift(property)
  }
}
</script>

<template>
  <main
    class="w-full p-4 lg:w-full min-w-0 lg:p-0 overflow-y-auto h-full md:h-[calc(100vh-6rem)] lg:h-[calc(100vh-7rem)]"
  >
    <div class="fixed z-[100] top-2 right-16 lg:top-6 lg:right-8 flex items-center gap-2">
      <p v-if="propertiesCount" class="font-bold text-[--p-primary-color]">
        ({{ propertiesCount }})
      </p>

      <PropertyCreator @add-property="onAddProperty" />
    </div>

    <PropertyEditor
      v-model:visible="visible"
      :property="propertyToEdit"
      @update-property="handleUpdateProperty"
    />

    <PageLoader v-if="loading" />
    <div v-show="error" class="grid place-content-center h-60">
      <ErrorMessage :error="error" show-retry-button @retry="getProperties" />
    </div>

    <section v-if="!loading && !error && properties">
      <div class="grid gap-2 mb-4">
        <div
          v-for="property in properties"
          :key="property._id"
          class="flex gap-2 flex-col md:flex-row bg-white rounded-lg p-4"
        >
          <div
            class="w-full h-28 md:h-36 md:w-[40%] md:max-w-44 bg-slate-200 rounded-lg overflow-hidden"
          >
            <img
              v-if="property.pictures"
              :src="property.pictures[0] || property.pictures[1] || property.pictures[2]"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="flex flex-col justify-between">
            <h1 class="text-lg font-semibold">
              {{ property.name ?? property.address }}
            </h1>
            <p v-if="property.name" class="text-slate-500 font-medium">{{ property.address }}</p>
            <h1 class="md:text-lg font-semibold">&#8361;{{ property.price.toLocaleString() }}</h1>
            <div class="text-sm text-slate-500">
              <span>For: </span>
              <span class="font-semibold">{{ property.type }}</span>
            </div>
            <div class="flex items-center mt-2 md:mt-0 gap-2 justify-end md:justify-normal">
              <Button
                @click="editProperty(property)"
                size="small"
                severity="secondary"
                label="Update"
                icon="pi pi-pencil"
              />
              <Button
                @click="confirmDelete(property._id)"
                :loading="deleting"
                size="small"
                severity="danger"
                label="Delete"
                icon="pi pi-trash"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="propertiesCount">
        <Paginator
          v-model:first="first"
          @page="updatePage"
          :rows="limit"
          :totalRecords="propertiesCount"
          template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        />
      </div>
      <ErrorMessage :error="errorDeleting" showHeader overlay />
    </section>
  </main>
</template>

<!-- class="fixed w-full z-10 bottom-0 left-1/2 -translate-x-1/2 md:w-fit md:top-0 lg:top-5 lg:right-5 lg:left-[unset] lg:-translate-x-0" -->
