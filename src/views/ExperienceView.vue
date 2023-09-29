<template>
  <section v-if="experience">
    <h1>{{ experience.name }}</h1>
    <img :src="`/images/${experience.image}`" :alt="experience.name" />
    <p>{{ experience.description }}</p>
  </section>
</template>

<script setup lang="ts">
import { destinations } from '@/data/data.json'

const props = defineProps<{
  id: number
  experienceSlug: string
}>()

const destination = destinations.find((destination) => destination.id === props.id)
const experience = destination?.experiences.find((exp) => exp.slug === props.experienceSlug)
</script>
