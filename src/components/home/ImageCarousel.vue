<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const carouselItems = [
  "Office",
  "Nature",
  "Company Staff",
  "Architecture",
  "Food",
  "Travel",
  "Fashion",
  "People",
  "Art & Design",
  "Office",
  "Nature",
  "Company Staff",
  "Architecture",
  "Food",
  "Travel",
  "Fashion",
  "People",
  "Art & Design",
];

const currentOffset = ref(0);
let intervalId: number | undefined;

const startCarousel = () => {
  intervalId = window.setInterval(() => {
    currentOffset.value = (currentOffset.value + 100 / 6) % 100;
  }, 3000);
};

onMounted(() => {
  startCarousel();
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div class="carousel-container relative overflow-hidden h-16 mb-4">
    <div
      class="carousel-track flex transition-transform duration-1000 gap-3"
      :style="{ transform: `translateX(-${currentOffset}%)` }"
    >
      <div
        v-for="(item, index) in carouselItems"
        :key="index"
        class="carousel-item relative flex-none w-60"
      >
        <img
          :src="`/thumbnails/thumb-${(index % 6) + 1}.jpg`"
          alt=""
          class="w-full h-16 object-cover rounded-lg"
        />
        <div
          class="absolute inset-0 rounded-lg bg-opacity-30 flex items-center justify-center"
        >
          <span class="text-white font-medium text-lg">{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  width: 100%;
}

.carousel-track {
  width: calc(100% * 1.5);
}
</style>
