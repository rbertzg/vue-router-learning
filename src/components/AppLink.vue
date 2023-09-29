<template>
  <a v-if="isExternal" :href="props.to" target="_blank" rel="noopener" class="external-link">
    <slot />
  </a>
  <RouterLink v-else :="props" class="internal-link">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  // @ts-ignore
  ...RouterLink.props
})

const isExternal = computed(() =>
  typeof props.to === 'string' && props.to.startsWith('http') ? true : false
)
</script>
