<template>
  <div class="home">
    <h1>All Destinations</h1>
    <button @click="triggerRouterError" class="btn">Trigger Router Error</button>
    <div class="destinations">
      <RouterLink
        v-for="destination in destinations"
        :key="destination.id"
        :to="{ name: 'destination', params: { id: destination.id, slug: destination.slug } }"
      >
        <h2>{{ destination.name }}</h2>
        <img :src="`/images/${destination.image}`" :alt="destination.name" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { destinations } from '@/data/data.json'
import { NavigationFailureType, isNavigationFailure, useRouter } from 'vue-router'

const router = useRouter()

const triggerRouterError = async () => {
  const navigationFailure = await router.push('/')

  if (isNavigationFailure(navigationFailure, NavigationFailureType.duplicated)) {
    console.log(navigationFailure.to)
  }
}
</script>
