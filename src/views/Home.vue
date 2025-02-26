<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import Chart from 'chart.js/auto'
import { api } from '../services/api'

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

// Add these
interface Visitor {
  id: string;
  username: string;
  onlineTime: string;
  country: string;
  city: string;
}

const visitors = ref<Visitor[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const sortBy = ref('default')

const fetchVisitors = async () => {
  try {
    isLoading.value = true
    const response = await api.getVisitors()
    visitors.value = response.visitors
  } catch (err) {
    error.value = 'Failed to load visitors data'
    console.error('Error fetching visitors:', err)
  } finally {
    isLoading.value = false
  }
}

const handleSort = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  sortBy.value = value
  if (value !== 'id') {
    visitors.value.sort((a, b) => {
      if (value === 'online') return a.onlineTime.localeCompare(b.onlineTime)
      if (value === 'country') return a.country.localeCompare(b.country)
      if (value === 'city') return a.city.localeCompare(b.city)
      return a.username.localeCompare(b.username)
    })
  }
}

onMounted(() => {
  startCarousel()
  startSlideshow()
  fetchVisitors()

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
    <div class="h-[100vh] overflow-hidden">
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
        <div class="absolute bottom-[50px] left-0 right-0 flex justify-center items-center h-32 my-8 overflow-hidden">
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
    </div>


    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 py-8">
      <!-- Header with Location -->
      <div class="flex items-center justify-between gap-3 mb-8">
        <h2 class="text-3xl font-medium ">
          <span class="text-blue-600 underline">Leckerschmecker</span>
          <span class="text-blue-600">: </span>
          <span class="text-red-500">Food</span>
        </h2>
        <div class="ml-2 flex items-center">
          <button class="flex items-center gap-2 mr-2 bg-white rounded-lg p-2">
            <svg class="h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div class="h-5 w-px mx-0 bg-gray-300"></div>
            <span class="text-gray-600">Experience</span>
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-4 mb-8">
        <button class="flex items-center gap-2 px-4 py-2 bg-transparent rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          Mark
        </button>

        <div class="h-8 w-px bg-gray-300"></div>

        <button class="flex items-center gap-2 px-4 py-2 bg-tran rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>

        <div class="h-8 w-px bg-gray-300"></div>

        <button class="flex items-center gap-2 px-4 py-2 bg-tran rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print
        </button>

        <div class="h-8 w-px bg-gray-300"></div>

        <button class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full">
          Visit Website
        </button>
      </div>
      <div class="mb-16">
        <p class="break-all whitespace-pre-wrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget
          risus at
          nibh pulvinar tempus in sit
          amet elit. Nam maximus, dolor in aliquam malesuada, odio orci dapibus ipsum, at ullamcorper lacus quam ut
          quam.
          Donec ultricies sapien libero, a rhoncus magna volutpat in. Mauris at dolor vestibulum, commodo erat non,
          bibendum tellus. Nam nec dolor tortor. Curabitur ligula nulla, dignissim ut nulla ac, blandit aliquet urna.
          Vestibulum turpis tortor, placerat vulputate libero quis, placerat varius mauris. Ut ac efficitur tellus,
          iaculis rhoncus metus. Aenean condimentum pellentesque neque vitae dictum. Donec rhoncus mi orci, eget blandit
          risus eleifend nec. Duis porttitor augue non malesuada pharetra. Nam consequat consequat ullamcorper.
          <br>
          <br>
          Fusce commodo vitae neque a aliquet. Duis gravida diam in fringilla pharetra. Sed ipsum ex, dapibus eget augue
          sed, tristique dignissim ante. In ornare vulputate elit non auctor. Ut id sagittis est. Duis feugiat pulvinar
          laoreet. Nam ex arcu, pretium vestibulum nunc vel, porta viverra lacus. Quisque mauris diam, dignissim gravida
          velit ac, cursus bibendum risus. Nulla dictum tincidunt ligula nec iaculis. Vestibulum ullamcorper urna
          sodales,
          ullamcorper libero non, laoreet felis. Nunc mattis tortor a sem varius pharetra. Proin sodales elementum elit
          eget commodo. Quisque accumsan, sapien elementum condimentum elementum, libero turpis tincidunt purus, at
          iaculis velit risus eu sapien. Nam id magna pulvinar, dapibus quam ut, bibendum lectus. Vivamus aliquam mi
          molestie nunc consequat, eu dapibus augue gravida
        </p>
        <!-- Map Section -->

        <div class="map-section w-full">
          <div class=" w-full mx-auto">
            <!-- Replace with actual map component -->
            <div class="w-full h-full bg-gray-200">
              <img src="/images/map.png" alt="Map" class="w-full h-full object-cover">
            </div>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget risus at nibh pulvinar tempus in sit
          amet elit. Nam maximus, dolor in aliquam malesuada, odio orci dapibus ipsum, at ullamcorper lacus quam ut
          quam.
          Donec ultricies sapien libero, a rhoncus magna volutpat in. Mauris at dolor vestibulum, commodo erat non,
          bibendum tellus. Nam nec dolor tortor. Curabitur ligula nulla, dignissim ut nulla ac, blandit aliquet urna.
          Vestibulum turpis tortor, placerat vulputate libero quis, placerat varius mauris. Ut ac efficitur tellus,
          iaculis rhoncus metus. Aenean condimentum pellentesque neque vitae dictum. Donec rhoncus mi orci, eget blandit
          risus eleifend nec. Duis porttitor augue non malesuada pharetra. Nam consequat consequat ullamcorper.
          <br>
          <br>
          Fusce commodo vitae neque a aliquet. Duis gravida diam in fringilla pharetra. Sed ipsum ex, dapibus eget augue
          sed, tristique dignissim ante. In ornare vulputate elit non auctor. Ut id sagittis est. Duis feugiat pulvinar
          laoreet. Nam ex arcu, pretium vestibulum nunc vel, porta viverra lacus. Quisque mauris diam, dignissim gravida
          velit ac, cursus bibendum risus. Nulla dictum tincidunt ligula nec iaculis. Vestibulum ullamcorper urna
          sodales,
          ullamcorper libero non, laoreet felis. Nunc mattis tortor a sem varius pharetra. Proin sodales elementum elit
          eget commodo. Quisque accumsan, sapien elementum condimentum elementum, libero turpis tincidunt purus, at
          iaculis velit risus eu sapien. Nam id magna pulvinar, dapibus quam ut, bibendum lectus. Vivamus aliquam mi
          molestie nunc consequat, eu dapibus augue gravida.
        </p>
      </div>
      <!-- Analytics Section -->
      <section class="analytics mb-12">
        <h3 class="text-xl font-bold mb-6">
          <span class="text-gray-400 text-lg">"Leckerschmecker : Food-Events"</span> Analytics :
        </h3>
        <div class="flex gap-3 items-center">
          <div class="analytics-grid flex flex-col gap-3 w-1/3">
            <div
              class="stat-card bg-white p-6 rounded-lg shadow flex items-center justify-between flex-col gap-8 py-12">
              <div class="text-6xl font-bold">15135</div>
              <div class="text-gray-500">Current Visitors</div>
            </div>
            <div class="stat-card bg-white p-6 rounded-lg shadow flex items-center justify-between text-lg">
              <div class="text-gray-500">Total Views</div>
              <div class="font-bold">15135</div>
            </div>
            <div class="stat-card bg-white p-6 rounded-lg shadow flex items-center justify-between text-lg">
              <div class="text-gray-500">Average Bid</div>
              <div class="font-bold">45.5$</div>
            </div>
          </div>
          <div class="visitors-list bg-white rounded-lg shadow p-6 w-2/3">
            <div class="flex justify-between items-center mb-3">
              <div class="flex gap-1">
                <div class="text-lg text-black">Today</div>/
                <div class="text-lg text-gray-500">Week</div>/
                <div class="text-lg text-gray-500">Month</div>
              </div>
              <div class="flex gap-2">
                <button class="text-gray-500">Sort by</button>
                <select v-model="sortBy" @change="handleSort"
                  class="text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500">
                  <option value="id">Default</option>
                  <option value="onlineTime">Online Time</option>
                  <option value="country">Country</option>
                  <option value="city">City</option>
                  <option value="username">User</option>
                </select>
              </div>
            </div>

            <!-- Add loading and error states -->
            <div v-if="isLoading" class="text-center py-4">
              Loading visitors...
            </div>

            <div v-else-if="error" class="text-red-500 text-center py-4">
              {{ error }}
            </div>

            <div v-else class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="text-left text-gray-500">
                    <th class="font-medium">User List</th>
                    <th class="font-medium">Online Time</th>
                    <th class="font-medium">Country</th>
                    <th class="font-medium">City</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 text-black">
                  <tr v-for="visitor in visitors" :key="visitor.id">
                    <td class="py-3" :class="visitor.username === 'Unknown' ? 'text-gray-500' : 'text-blue-500'">
                      <span class="text-gray-500">{{ visitor.id }}.</span> {{ visitor.username }}
                    </td>
                    <td>{{ visitor.onlineTime }}</td>
                    <td>{{ visitor.country }}</td>
                    <td>{{ visitor.city }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
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