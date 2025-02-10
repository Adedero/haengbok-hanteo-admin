<script setup lang="ts">
import useAsyncData from '@/composables/use-async-data'
import type { FetchError } from '@/composables/use-fetch'
import type { Property } from '@/types'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  property?: null | Property
}

const { property = null } = defineProps<Props>()

const data = ref<Property | null>(property)

const pictures = ref({
  picture_1: data.value?.pictures?.[0] ?? '',
  picture_2: data.value?.pictures?.[1] ?? '',
  picture_3: data.value?.pictures?.[2] ?? '',
})

watch(
  () => property,
  (value) => {
    data.value = value
    pictures.value = {
      picture_1: data.value?.pictures?.[0] ?? '',
      picture_2: data.value?.pictures?.[1] ?? '',
      picture_3: data.value?.pictures?.[2] ?? '',
    }
  },
)

const emit = defineEmits(['update-property'])

const router = useRouter()

const visible = defineModel('visible', { default: false })

const loading = ref(false)
const error = ref<FetchError | null>(null)

const updateProperty = async () => {
  if (!data.value) return
  data.value.pictures = Object.values(pictures.value)
  await useAsyncData<{ message: string; property: Property }>(
    `api/properties/${data.value._id}`,
    { loading, error, config: { router, method: 'PUT', body: data.value } },
    () => {
      emit('update-property', data.value)
    },
  )
}
</script>

<template>
  <Drawer
    v-model:visible="visible"
    header="Edit Property"
    position="bottom"
    class="h-auto max-h-[80dvh]"
  >
    <div v-if="data">
      <div class="grid gap-4 md:grid-cols-4">
        <div class="form-control md:col-span-3">
          <label for="name">Name</label>
          <InputText v-model.trim="data.name" fluid />
        </div>

        <div class="form-control">
          <label for="price">Price</label>
          <InputNumber v-model="data.price" fluid />
        </div>

        <div class="form-control md:col-span-4">
          <label for="address">Address</label>
          <InputText v-model.trim="data.address" fluid />
        </div>

        <div class="form-control">
          <label for="type">Type</label>
          <Select v-model="data.type" :options="['rent', 'sale']" fluid />
        </div>

        <div class="form-control">
          <label for="area">Area (m<sup>2</sup>)</label>
          <InputNumber v-model="data.area" fluid />
        </div>

        <div class="form-control">
          <label for="bedrooms">Bedrooms</label>
          <Select v-model="data.bedrooms" :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" fluid />
        </div>

        <div class="form-control">
          <label for="bathrooms">Bathrooms</label>
          <Select v-model="data.bathrooms" :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" fluid />
        </div>

        <div class="form-control md:col-span-4">
          <label for="pictures">Pictures <small>Enter the picture url</small></label>
          <div class="grid gap-4">
            <InputText v-model.trim="pictures.picture_1" fluid />
            <InputText v-model.trim="pictures.picture_2" fluid />
            <InputText v-model.trim="pictures.picture_3" fluid />
          </div>
        </div>

        <div class="form-control md:col-span-4">
          <label for="description">Description</label>
          <Textarea v-model="data.description" rows="6" fluid class="resize-none" />
        </div>

        <div class="form-control md:col-span-4">
          <Button @click="updateProperty" :loading label="Save" icon="pi pi-check" class="md" />
        </div>
      </div>
    </div>
  </Drawer>
</template>
