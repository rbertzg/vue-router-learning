<template>
  <article class="card">
    <img :src="`/images/${experience.image}`" :alt="experience.name" />
    <p class="card__text">
      {{ experience.name }}
    </p>
  </article>
</template>

<script setup lang="ts">
export interface ExperienceType {
  name: string
  image: string
  slug: string
  description: string
}
const experience = defineProps<ExperienceType>()
</script>
