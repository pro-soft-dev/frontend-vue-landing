<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import Chart from 'chart.js/auto'

// Chart refs
const barChartRef = ref<HTMLCanvasElement | null>(null)
const lineChartRef = ref<HTMLCanvasElement | null>(null)

// Carousel data
const carouselItems = [
  'Office',
  'Nature',
  'Company Staff',
  'Architecture',
  'Food',
  'Travel',
  'Fashion',
  'People',
  'Art & Design',
  'Office',
  'Nature',
  'Company Staff',
  'Architecture',
  'Food',
  'Travel',
  'Fashion',
  'People',
  'Art & Design'
]

// Carousel logic
const currentOffset = ref(0)
let intervalId: number | undefined

const startCarousel = () => {
  intervalId = window.setInterval(() => {
    currentOffset.value = (currentOffset.value + 100 / 6) % 100
  }, 3000)
}

// Image slider logic
const currentImageIndex = ref(0)
let slideshowIntervalId: number | undefined

const startSlideshow = () => {
  slideshowIntervalId = window.setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % 6
  }, 3000)
}

onMounted(() => {
  startCarousel()
  startSlideshow()

  if (barChartRef.value && lineChartRef.value) {
    // Initialize charts...
    // Your existing chart initialization code
  }
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  if (slideshowIntervalId) {
    clearInterval(slideshowIntervalId)
  }
})
</script>

<template>
  <div class="home">
    <div class="h-[100vh]">
      <!-- <div class="h-[calc(100vh-100px)]"> -->

      <!-- Search Bar -->
      <nav class="bg-white py-4 mb-4">
        <div class="max-w-screen-2xl mx-auto px-4">
          <div class="flex justify-center items-center flex-col lg:flex-row gap-3 xl:gap-8">
            <div class="flex items-center">
              <div class="relative flex items-center flex-1 max-w-3xl">
                <!-- Search Icon -->
                <div class="absolute left-3 text-gray-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <!-- Search Input -->
                <input type="text" placeholder="Find Favorite Category..."
                  class="w-full pl-10 pr-24 py-2 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200">

                <!-- Advanced Button -->
                <button class="absolute right-3 text-gray-500 hover:text-gray-700 flex items-center gap-1">
                  Advanced
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
            <!-- Vertical Separator -->
            <div class="h-8 w-px bg-gray-200 hidden lg:block"></div>

            <!-- Navigation Links -->
            <div
              class="flex items-center gap-2 xl:gap-6 text-sm flex-wrap justify-center md:justify-start md:flex-nowrap">
              <a href="#" class="text-black p-2 font-bold hidden lg:block">Trending</a>
              <a href="#" class="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-sm">Nature</a>
              <a href="#" class="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-sm">Architecture</a>
              <a href="#" class="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-sm">Company</a>
              <a href="#" class="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-sm">Food</a>
              <a href="#" class="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-sm">Travel</a>
              <a href="#" class="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-sm">Fashion</a>
              <a href="#" class="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-sm">People</a>
              <a href="#" class="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-sm">Art & Design</a>
            </div>
          </div>
        </div>
      </nav>
      <!-- Carousel Section -->
      <div class="carousel-container relative overflow-hidden h-16 mb-4">
        <div class="carousel-track flex transition-transform duration-1000 gap-3"
          :style="{ transform: `translateX(-${currentOffset}%)` }">
          <div v-for="(item, index) in carouselItems" :key="index" class="carousel-item relative flex-none w-60">
            <img :src="`/thumbnails/thumb-${(index % 6) + 1}.jpg`" alt="" class="w-full h-16 object-cover rounded-lg">
            <div class="absolute inset-0 rounded-lg bg-opacity-30 flex items-center justify-center">
              <span class="text-white font-medium text-lg">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Hero Section -->
      <section class="hero relative">
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
      </section>
    </div>
    <!-- Image Slider -->
    <div class="relative flex justify-center items-center h-32 my-8 overflow-hidden">
      <div class="flex items-center gap-4 transition-all duration-500"
        :style="{ transform: `translateX(-${currentImageIndex * 20}%)` }">
        <div v-for="i in 6" :key="i" class="relative transition-all duration-500" :class="{
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

    <!-- Bottom Thumbnails -->
    <div class="bottom-thumbnails grid grid-cols-6 gap-1 h-24">
      <div v-for="i in 6" :key="i" class="relative overflow-hidden cursor-pointer">
        <img :src="`/thumbnails/bottom-${i}.jpg`" alt="" class="w-full h-full object-cover">
      </div>
    </div>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Header with Location -->
      <div class="flex items-center gap-3 mb-8">
        <h2 class="text-xl font-bold text-blue-600">Leckerschmecker</h2>
        <span class="text-gray-500">: Food</span>
        <div class="ml-2 flex items-center">
          <span class="text-green-500">●</span>
          <span class="ml-1 text-gray-600">Overview</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-4 mb-8">
        <div class="flex gap-2">
          <button class="px-4 py-2 bg-gray-100 rounded-md flex items-center gap-2">
            <span>Share</span>
          </button>
          <button class="px-4 py-2 bg-gray-100 rounded-md flex items-center gap-2">
            <span>Save</span>
          </button>
        </div>
        <div class="ml-auto flex items-center gap-4">
          <button class="flex items-center gap-1">
            <span>Direction</span>
          </button>
          <button class="flex items-center gap-1">
            <span>Map</span>
          </button>
        </div>
      </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget risus at nibh pulvinar tempus in sit
        amet elit. Nam maximus, dolor in aliquam malesuada, odio orci dapibus ipsum, at ullamcorper lacus quam ut
        quam.
        Donec ultricies sapien libero, a rhoncus magna volutpat in. Mauris at dolor vestibulum, commodo erat non,
        bibendum tellus. Nam nec dolor tortor. Curabitur ligula nulla, dignissim ut nulla ac, blandit aliquet urna.
        Vestibulum turpis tortor, placerat vulputate libero quis, placerat varius mauris. Ut ac efficitur tellus,
        iaculis rhoncus metus. Aenean condimentum pellentesque neque vitae dictum. Donec rhoncus mi orci, eget blandit
        risus eleifend nec. Duis porttitor augue non malesuada pharetra. Nam consequat consequat ullamcorper.
        Fusce commodo vitae neque a aliquet. Duis gravida diam in fringilla pharetra. Sed ipsum ex, dapibus eget augue
        sed, tristique dignissim ante. In ornare vulputate elit non auctor. Ut id sagittis est. Duis feugiat pulvinar
        laoreet. Nam ex arcu, pretium vestibulum nunc vel, porta viverra lacus. Quisque mauris diam, dignissim gravida
        velit ac, cursus bibendum risus. Nulla dictum tincidunt ligula nec iaculis. Vestibulum ullamcorper urna
        sodales,
        ullamcorper libero non, laoreet felis. Nunc mattis tortor a sem varius pharetra. Proin sodales elementum elit
        eget commodo. Quisque accumsan, sapien elementum condimentum elementum, libero turpis tincidunt purus, at
        iaculis velit risus eu sapien. Nam id magna pulvinar, dapibus quam ut, bibendum lectus. Vivamus aliquam mi
        molestie nunc consequat, eu dapibus augue gravida</p>
      <!-- Map Section -->
      <div class="map-section mb-12">
        <div class="rounded-full overflow-hidden w-full aspect-square max-w-xl mx-auto">
          <!-- Replace with actual map component -->
          <div class="w-full h-full bg-gray-200"></div>
        </div>
      </div>

      <!-- Analytics Section -->
      <section class="analytics mb-12">
        <h3 class="text-2xl font-bold mb-6">Analytics</h3>
        <div class="stats grid grid-cols-3 gap-8 mb-8">
          <div>
            <div class="text-4xl font-bold">15135</div>
            <div class="text-gray-500">Total Views</div>
          </div>
          <div>
            <div class="text-4xl font-bold">8650</div>
            <div class="text-gray-500">Unique Views</div>
          </div>
          <div>
            <div class="text-4xl font-bold">234</div>
            <div class="text-gray-500">Shares</div>
          </div>
        </div>

        <!-- Charts -->
        <div class="charts grid grid-cols-2 gap-8">
          <div class="chart-container">
            <canvas ref="barChartRef"></canvas>
          </div>
          <div class="chart-container">
            <canvas ref="lineChartRef"></canvas>
          </div>
        </div>
      </section>

      <!-- Make an Offer Section -->
      <section class="offer-section border rounded-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Make an Offer</h3>
          <div class="text-right">
            <div class="text-sm text-gray-500">Recommended</div>
            <div class="text-lg font-bold">$75</div>
          </div>
        </div>
        <div class="flex gap-4">
          <input type="text" placeholder="Enter amount" class="flex-1 border rounded-md px-4 py-2">
          <button class="bg-orange-500 text-white px-8 py-2 rounded-md">
            Make an Offer
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.carousel-container {
  width: 100%;
}

.carousel-track {
  width: calc(100% * 1.5);
  /* Ensure enough width for smooth scrolling */
}

.hero {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chart-container {
  height: 300px;
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
}

.scroll-indicator {
  animation: bounce 2s infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(10px);
  }
}
</style>