<template>
  <div>
    <h1>Hello, {{ user }}</h1>
    <button @click="handleLogout" class="btn">Logout</button>
    <RouterLink :to="{ name: 'invoices' }"><span class="btn">Invoices</span></RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const user = window.user
const router = useRouter()

const handleLogout = () => {
  window.user = null
  router.push({ name: 'home' })
}
</script>
