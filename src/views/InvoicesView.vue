<template>
  <h1>Invoices</h1>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router'

onBeforeRouteLeave((to, from) => {
  const answer = window.confirm('Do you want to leave?')
  if (!answer) return false
})
</script>
