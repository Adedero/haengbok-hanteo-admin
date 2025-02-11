<script setup lang="ts">
import { type PageState } from 'primevue'
import { computed, onMounted, ref } from 'vue'
import type { FetchError } from '@/composables/use-fetch'
import type { User } from '@/types'
import useAsyncData from '@/composables/use-async-data'
import { useRouter } from 'vue-router'
import PageLoader from './PageLoader.vue'

const router = useRouter()

const first = ref(0)
const page = ref(0)
const updatePage = (event: PageState) => {
  page.value = event.page
  getUsers()
}
const limit = ref(10)
const skip = computed(() => limit.value * page.value)

const loading = ref(false)
const error = ref<FetchError | null>(null)
const users = ref<User[] | null>(null)

async function getUsers() {
  await useAsyncData<{ items: User[] }>(
    `api/users?skip=${skip.value}&limit=${limit.value}`,
    { loading, error, config: { router, cache: true } },
    (payload) => {
      users.value = payload.items
    },
  )
}

const userCount = ref<number | undefined>()
async function getUserCount() {
  await useAsyncData<{ count: number }>(
    'api/users-count',
    { loading, error, config: { router, cache: true } },
    (payload) => {
      userCount.value = payload.count
    },
  )
}

onMounted(async () => {
  await Promise.all([getUsers(), getUserCount()])
})
</script>

<template>
  <main class="p-4 lg:p-0 md:h-[calc(100dvh-7rem)]">
    <div class="fixed z-[100] top-2 right-16 lg:top-6 lg:right-8 flex items-center gap-2">
      <p v-if="userCount" class="font-bold text-[--p-primary-color]">
        ({{ userCount }})
      </p>
    </div>

    <PageLoader v-if="loading" />
    <ErrorMessage :error show-retry-button @retry="getUsers" show-header />

    <div v-if="!loading && !error && users" class="grid gap-2 mb-4">
      <div v-for="user, index in users" :key="user._id">
        <UserDetails :user :index />
      </div>
    </div>

    <div>
      <Paginator
        v-model:first="first"
        @page="updatePage"
        :rows="limit"
        :totalRecords="userCount"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      />
    </div>
  </main>
</template>
