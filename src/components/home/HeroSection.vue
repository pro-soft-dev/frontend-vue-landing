<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentImageIndex = ref(0)
let slideshowIntervalId: number | undefined

const startSlideshow = () => {
  slideshowIntervalId = window.setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % 5
  }, 5000)
}

onMounted(() => {
  startSlideshow()
})

onUnmounted(() => {
  if (slideshowIntervalId) {
    clearInterval(slideshowIntervalId)
  }
})
</script>

<template>
  <section
    class="hero relative h-[calc(100vh-theme('spacing.16')-theme('spacing.4')-theme('spacing.4')-theme('spacing.16'))]">
    <img src="/images/hero-image.jpg" alt="Welcome" class="w-full h-full object-cover">
    <div class="absolute inset-0 flex flex-col items-center justify-center text-white">
      <h1 class="text-4xl lg:text-5xl font-medium mb-6 text-center">Welcome Home</h1>
      <div class="play-button cursor-pointer">
        <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke-width="1" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 8l6 4-6 4V8z" />
        </svg>
      </div>
    </div>

    <!-- Image Slider -->
    <div
      class="absolute bottom-[50px] left-0 right-0 justify-center items-center h-32 my-8 overflow-hidden hidden md:flex">
      <div class="flex items-center gap-4 transition-all duration-500"
        :style="{ transform: `translateX(${(2 - currentImageIndex) * 160}px)` }">
        <div v-for="i in 5" :key="i" @click="currentImageIndex = i - 1"
          class="relative transition-all duration-500 cursor-pointer" :class="{
            'w-48 h-32': currentImageIndex === i - 1,
            'w-32 h-24': currentImageIndex !== i - 1
          }">
          <img :src="`/thumbnails/bottom-${i}.jpg`" :alt="`Slide ${i}`"
            class="rounded-lg object-cover w-full h-full transition-all duration-500" :class="{
              'opacity-100': currentImageIndex === i - 1,
              'opacity-60': currentImageIndex !== i - 1
            }">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>