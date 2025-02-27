<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import SearchBar from '../components/home/SearchBar.vue'
import ImageCarousel from '../components/home/ImageCarousel.vue'
import HeroSection from '../components/home/HeroSection.vue'
import LocationHeader from '../components/home/LocationHeader.vue'
import ActionButtons from '../components/home/ActionButtons.vue'
import ChartSection from '../components/home/ChartSection.vue'
import VisitorsTable from '../components/home/VisitorsTable.vue'
import PaymentSection from '../components/home/PaymentSection.vue'
import SpeedDial from '../components/home/SpeedDial.vue'
import BidPopup from '../components/home/popups/BidPopup.vue'
import AnalyticsPopup from '../components/home/popups/AnalyticsPopup.vue'
import MapPopup from '../components/home/popups/MapPopup.vue'
import CreateAuctionPopup from '../components/home/popups/CreateAuctionPopup.vue'
import AuthorInfoPopup from '../components/home/popups/AuthorInfoPopup.vue'
import ArticleInfoPopup from '../components/home/popups/ArticleInfoPopup.vue'
import SharePopup from '../components/home/popups/SharePopup.vue'

// Popup states   
const showArticleInfo = ref(false)
const showAuthorInfo = ref(false)
const showSharePopup = ref(false)
const showAnalytics = ref(false)
const showMap = ref(false)
const showBidPopup = ref(false)
const showCreateAuction = ref(false)

const router = useRouter()

// Handlers

const handleSpeedDialAction = (action: string) => {
  switch (action) {
    case 'info':
      showArticleInfo.value = true
      break
    case 'author':
      showAuthorInfo.value = true
      break
    case 'share':
      showSharePopup.value = true
      break
    case 'bid':
      showBidPopup.value = true
      break
    case 'stats':
      showAnalytics.value = true
      break
    case 'map':
      showMap.value = true
      break
    case 'post':
      router.push('/create')
      break
  }
}

onMounted(() => {
  // Additional setup code if needed
})

onUnmounted(() => {
  // Cleanup code if needed
})
</script>

<template>
  <div class="home pb-24">
    <div class="h-[100vh] overflow-hidden">
      <SearchBar />
      <ImageCarousel />
      <HeroSection />
    </div>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-6 py-8">
      <LocationHeader />
      <ActionButtons />

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
        <div class="gap-3 items-center hidden md:flex">
          <div class="analytics-grid flex flex-col gap-4 w-1/3">
            <div
              class="stat-card bg-white p-6 rounded-lg shadow flex items-center justify-between flex-col gap-8 py-16">
              <div class="text-7xl font-bold">15135</div>
              <div class="text-gray-500">Current Visitors</div>
            </div>
            <div class="stat-card bg-white p-6 rounded-lg shadow flex items-center justify-between text-lg">
              <div class="text-gray-500">Total Views</div>
              <div class="font-bold">15135</div>
            </div>
            <div class="stat-card bg-white p-6 rounded-lg shadow flex items-center justify-between text-lg">
              <div class="text-gray-500">Total Bidders</div>
              <div class="font-bold">654</div>
            </div>
            <div class="stat-card bg-white p-6 rounded-lg shadow flex items-center justify-between text-lg">
              <div class="text-gray-500">Average Bid</div>
              <div class="font-bold">45.5$</div>
            </div>
          </div>
          <VisitorsTable />
        </div>

        <!-- New chart section -->
        <ChartSection />

        <div class="md:hidden flex flex-col gap-4 mt-6">
          <div class="analytics-grid flex flex-col gap-3 ">
            <div class="stat-card bg-white p-4 rounded-lg shadow flex items-center justify-between text-lg">
              <div class="text-gray-500">Total Views</div>
              <div class="font-bold">15135</div>
            </div>
            <div class="stat-card bg-white p-4 rounded-lg shadow flex items-center justify-between text-lg">
              <div class="text-gray-500">Total Bidders</div>
              <div class="font-bold">15135</div>
            </div>
            <div class="stat-card bg-white p-4 rounded-lg shadow flex items-center justify-between text-lg">
              <div class="text-gray-500">Average Bid</div>
              <div class="font-bold">45.5$</div>
            </div>
          </div>
        </div>
        <div class="mt-12 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget risus at nibh pulvinar tempus in sit
          amet elit. Nam maximus, dolor in aliquam malesuada, odio orci dapibus ipsum, at ullamcorper lacus quam ut
          quam. Donec ultricies sapien libero, a rhoncus magna volutpat in. Mauris at dolor vestibulum, commodo erat
          non, bibendum tellus. Nam nec dolor tortor. Curabitur ligula nulla, dignissim ut nulla ac, blandit aliquet
          urnies.
        </div>
      </section>

      <!-- Payment Section -->
      <PaymentSection />

      <!-- Author and tags section -->
      <div class="mt-12 space-y-6">
        <!-- Tagged With Section -->
        <div class="flex gap-4">
          <span class=" font-medium w-28">TAGGED WITH</span>
          <div class="flex flex-wrap gap-2">
            <span>Auckland,</span>
            <span>Beaches,</span>
            <span>New Zealands</span>
          </div>
        </div>

        <!-- Field Under Section -->
        <div class="flex gap-4">
          <span class=" font-medium w-28">FIELD UNDER</span>
          <div class="flex flex-wrap gap-2">
            <span>Food,</span>
            <span>Landscape,</span>
            <span>Nature,</span>
            <span>Travels</span>
          </div>
        </div>

        <!-- Author Section -->
        <div class="flex items-center gap-4 mt-8 mb-12 border-b border-gray-300 pb-12">
          <div
            class="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xl font-medium">
            EE
          </div>
          <div>
            <div class="text-orange-500 font-medium flex items-center gap-3">
              <div>Ellen EdwardoEllen Edwardo</div> <svg class="w-5 h-5 " fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div class="text-gray-600">Writer & Director</div>
          </div>
        </div>

        <!-- After the Author Section -->
        <div class="mt-8">
          <h3 class="text-xl font-bold mb-6">Recent Posts</h3>
          <div class="space-y-2">
            <div class="flex items-center justify-between py-5 hover:bg-gray-50 p-2 rounded cursor-pointer">
              <span>Best Pictures of All Time</span>
              <svg class="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <div class="flex items-center justify-between py-5 hover:bg-gray-50 p-2 rounded cursor-pointer">
              <span>Recent Changes in the Design Trends</span>
              <svg class="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <div class="flex items-center justify-between py-5 hover:bg-gray-50 p-2 rounded cursor-pointer">
              <span>2019 Design Trends</span>
              <svg class="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <div class="flex items-center justify-between py-5 hover:bg-gray-50 p-2 rounded cursor-pointer">
              <span>Color Theory is Important, Believe me !</span>
              <svg class="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

    </main>

    <!-- Popups -->
    <SpeedDial @action="handleSpeedDialAction" />

    <!-- Popups -->
    <AuthorInfoPopup :show="showAuthorInfo" @close="showAuthorInfo = false"
      v-bind:class="{ 'modal-enter-active': showAuthorInfo }" />
    <ArticleInfoPopup :show="showArticleInfo" @close="showArticleInfo = false"
      v-bind:class="{ 'modal-enter-active': showArticleInfo }" />
    <SharePopup :show="showSharePopup" @close="showSharePopup = false"
      v-bind:class="{ 'modal-enter-active': showSharePopup }" />
    <BidPopup :show="showBidPopup" @close="showBidPopup = false"
      v-bind:class="{ 'modal-enter-active': showBidPopup }" />
    <AnalyticsPopup :show="showAnalytics" @close="showAnalytics = false"
      v-bind:class="{ 'modal-enter-active': showAnalytics }" />
    <MapPopup :show="showMap" @close="showMap = false" v-bind:class="{ 'modal-enter-active': showMap }" />
    <CreateAuctionPopup :show="showCreateAuction" @close="showCreateAuction = false"
      v-bind:class="{ 'modal-enter-active': showCreateAuction }" />

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

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: white;
  border: 2px solid #f97316;
  border-radius: 50%;
  cursor: pointer;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.modal-enter-active {
  animation: fadeIn 0.2s;
}
</style>