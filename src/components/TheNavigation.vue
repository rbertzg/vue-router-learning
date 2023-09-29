<template>
  <div id="nav">
    <AppLink id="logo" to="/">TravelApp</AppLink>
    <AppLink
      v-for="destination in destinations"
      :key="destination.id"
      :to="{ name: 'destination', params: { id: destination.id, slug: destination.slug } }"
    >
      {{ destination.name }}
    </AppLink>
    <AppLink :to="{ name: 'protected' }"> Protected Dashboard </AppLink>
    <AppLink to="https://vueschool.io/">Vue School</AppLink>
  </div>
</template>

<script setup lang="ts">
import { destinations } from '@/data/data.json'
</script>
