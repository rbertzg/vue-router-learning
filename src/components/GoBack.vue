<template>
  <button @click="router.back()" class="go-back">Back</button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
