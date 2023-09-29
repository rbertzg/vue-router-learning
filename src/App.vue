<template>
  <TheNavigation />

  <div class="container">
    <!-- #="{ Component }" shorthand -->
    <RouterView v-slot="{ Component }">
      <!-- css class name = fade -->
      <Transition name="fade" mode="out-in">
        <!-- key for destroy and recreate page on route change -->
        <Component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import TheNavigation from './components/TheNavigation.vue'

const route = useRoute()
</script>

<style lang="css">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
