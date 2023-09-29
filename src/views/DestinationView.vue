<template>
  <div>
    <!-- aby transition działał poprawnie Component musi być 1 tagiem -->
    <section v-if="destination" class="destination">
      <h1>{{ destination.name }}</h1>
      <GoBack />
      <div class="destination-details">
        <img :src="destinationImageUrl" :alt="destination.name" />
        <p>{{ destination.description }}</p>
      </div>
    </section>
    <section v-if="destination" class="experiences">
      <h2>TOP Experiences in {{ destination.name }}</h2>
      <div class="cards">
        <RouterLink
          v-for="experience in destination.experiences"
          :key="experience.slug"
          :to="{
            name: 'experience',
            params: { id: destination.id, experienceSlug: experience.slug }
          }"
        >
          <ExperienceCard :="experience" />
        </RouterLink>
      </div>
      <RouterView />
    </section>
  </div>
</template>

<script setup lang="ts">
import ExperienceCard, { type ExperienceType } from '@/components/ExperienceCard.vue'
import GoBack from '@/components/GoBack.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export interface DestinationType {
  name: string
  slug: string
  image: string
  id: number
  description: string
  experiences: ExperienceType[]
}
// --- route params defined as a component props
// const props = defineProps<{
//   id: string
//   slug: string
// }>()
// console.log(props)

const route = useRoute()
const destination = ref<DestinationType>()
const destinationImageUrl = computed(() => {
  if (destination.value) {
    return `/images/${destination.value?.image}`
  }
  return ''
})

const fetchDestination = async () => {
  try {
    const res = await fetch(`https://travel-dummy-api.netlify.app/${route.params.slug}.json`)

    if (res.ok) {
      const data: DestinationType = await res.json()
      destination.value = data
    } else {
      throw new Error('Something went wrong')
    }
  } catch (error) {
    console.error('Error fetching destination', error)
  }
}
onMounted(() => fetchDestination())
</script>
