<script setup lang="ts">
import logo from '@/assets/img/logo.png'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

sessionStorage.clear()

const user = ref<{ username: string; password: string}>({
  username: '',
  password: ''
})

const error = ref<string | null>(null)

const login = () => {
  error.value = null

  const username = import.meta.env.VITE_ADMIN_USERNAME
  const password = import.meta.env.VITE_ADMIN_PASSWORD

  if (user.value.username !== username || user.value.password !== password) {
    error.value = 'Invalid username or password'
    return
  }
  sessionStorage.setItem('isAuthenticated', 'true')
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <main class="p-4 h-full">
    <div class="flex flex-col items-center justify-center gap-4 h-dvh">
      <div class="flex flex-col items-center">
        <img :src="logo" alt="logo" width="28">
        <p class="mt-2 text-center uppercase font-medium">Haengbok Hanteo Admin Panel</p>
      </div>

      <div class="grid gap-4 p-5 border rounded-lg shadow">
        <Message v-if="error" severity="error" size="small" icon="pi pi-info-circle">
          {{ error }}
        </Message>

        <div class="grid gap-1">
          <label for="username" class="text-sm font-semibold">Username</label>
          <InputText v-model.trim="user.username" id="username" fluid />
        </div>

        <div class="grid gap-1">
          <label for="password" class="text-sm font-semibold">Password</label>
          <Password v-model.trim="user.password" input-id="password" toggle-mask :feedback="false" fluid />
        </div>

        <div class="mt-2">
          <Button @click="login" :disabled="!user.username || !user.password" label="Submit" icon="pi pi-check-circle" fluid />
        </div>
      </div>
    </div>
  </main>
</template>
