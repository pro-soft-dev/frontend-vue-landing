<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import ImageSwiper from "./ImageSwiper.vue";

const currentImageIndex = ref(2);
let slideshowIntervalId: number | undefined;

const orderedSlides = computed(() => {
  const slides = [1, 2, 3, 4, 5];
  const reorderedSlides = [...slides];

  slides.forEach((_, index) => {
    const diff = Math.abs(index - currentImageIndex.value);
    if (diff > 2) {
      const item = reorderedSlides.splice(index, 1)[0];
      if (currentImageIndex.value > 2) {
        reorderedSlides.push(item); // append to end
      } else {
        reorderedSlides.unshift(item); // prepend to start
      }
    }
  });

  return reorderedSlides;
});

const startSlideshow = () => {
  slideshowIntervalId = window.setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % 5;
  }, 5000);
};

onMounted(() => {
  startSlideshow();
});

onUnmounted(() => {
  if (slideshowIntervalId) {
    clearInterval(slideshowIntervalId);
  }
});
</script>

<template>
  <section
    class="hero relative h-[calc(100vh-theme('spacing.16')-theme('spacing.4')-theme('spacing.4')-theme('spacing.16'))]"
  >
    <img
      src="/images/hero-image.jpg"
      alt="Welcome"
      class="w-full h-full object-cover object-center"
    />
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100%] flex flex-col items-center justify-center text-white"
    >
      <h1 class="text-4xl lg:text-5xl font-medium mb-6 text-center">
        Welcome Home
      </h1>
      <div class="play-button cursor-pointer">
        <svg
          class="w-16 h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" stroke-width="1" />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M10 8l6 4-6 4V8z"
          />
        </svg>
      </div>
    </div>

    <!-- Image Slider -->
    <div
      class="absolute bottom-[50px] left-0 right-0 justify-center items-center h-32 my-8 overflow-hidden hidden md:flex"
    >
      <!-- <div class="flex items-center gap-4 transition-all duration-500">
        <div
          v-for="slideNum in orderedSlides"
          :key="`slide-${slideNum}-${currentImageIndex}`"
          @click="currentImageIndex = slideNum - 1"
          class="relative transition-all duration-500 cursor-pointer"
          :class="{
            'w-48 h-32': currentImageIndex === slideNum - 1,
            'w-32 h-24': currentImageIndex !== slideNum - 1,
          }"
        >
          <img
            :src="`/thumbnails/bottom-${slideNum}.jpg`"
            :alt="`Slide ${slideNum}`"
            class="rounded-lg object-cover w-full h-full transition-all duration-500"
            :class="{
              'opacity-100': currentImageIndex === slideNum - 1,
              'opacity-60': currentImageIndex !== slideNum - 1,
            }"
          />
        </div>
      </div> -->
      <ImageSwiper />
    </div>
    <div
      class="absolute bottom-0 right-0 w-full h-5 bg-gradient-to-r from-orange-500 to-gray-500 overflow-visible"
      style="background: linear-gradient(to right, #ff6900 70%, #ffffff 70%)"
    >
      <div
        class="relative left-[70%] top-[-10px] transform -translate-y-full bg-white w-max p-2 font-bold"
      >
        10 Days Left
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
