<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'

import SearchBar from '../components/home/SearchBar.vue'
import ImageCarousel from '../components/home/ImageCarousel.vue'
import HeroSection from '../components/home/HeroSection.vue'
import ChartSection from '../components/home/ChartSection.vue'
import VisitorsTable from '../components/home/VisitorsTable.vue'
import PaymentSection from '../components/home/PaymentSection.vue'

const showPaymentModal = ref(false)
const includeFees = ref(false)
const amount = ref(122)
const paymentFees = ref(3.47)

const totalAmount = computed(() => {
  return includeFees.value ? amount.value + paymentFees.value : amount.value
})

const closePaymentModal = () => {
  showPaymentModal.value = false
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
      <!-- Header with Location -->
      <div class="flex items-center justify-between gap-3 mb-8 flex-wrap">
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
      <div class="flex items-center gap-4 mb-8 flex-wrap">
        <button class="flex items-center gap-2 px-4 py-2 bg-transparent rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span class="hidden md:block">Mark</span>
        </button>

        <div class="h-8 w-px bg-gray-300"></div>

        <button class="flex items-center gap-2 px-4 py-2 bg-tran rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span class="hidden md:block">Share</span>
        </button>

        <div class="h-8 w-px bg-gray-300"></div>

        <button class="flex items-center gap-2 px-4 py-2 bg-tran rounded-lg">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span class="hidden md:block">Print</span>
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
        <div class="gap-3 items-center hidden md:flex">
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
  </div>

  <!-- Payment Modal -->
  <div v-if="showPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
      <!-- Amount -->
      <div class="text-center mb-6">
        <div class="text-4xl font-bold mb-1">€{{ totalAmount.toFixed(2) }}</div>
        <div class="text-gray-600">EUR</div>
      </div>

      <!-- Fees Checkbox -->
      <label class="flex items-center gap-2 mb-6 cursor-pointer">
        <input type="checkbox" v-model="includeFees" class="rounded border-gray-300">
        <span class="text-gray-600">Add {{ paymentFees.toFixed(2) }} € EUR to help cover the fees.</span>
      </label>

      <!-- Payment Buttons -->
      <button class="w-full mb-3 py-3 bg-[#FFC439] rounded-full font-medium">
        <div class="flex items-center justify-center gap-2">
          <!-- PayPal button icon -->
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="#00457C">
            <path
              d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.771.771 0 0 1 .761-.641h7.803c3.676 0 6.347 2.524 6.147 6.123-.21 3.813-3.463 6.273-7.15 6.273H9.424a.77.77 0 0 0-.761.641l-1.587 5.22zm12.89-14.576c-.008-.114-.013-.23-.02-.345-.494-7.083-6.37-6.332-8.184-6.332H4.33a.893.893 0 0 0-.882.744L.007 21.407a.642.642 0 0 0 .633.739h4.606l1.587-5.22a1.932 1.932 0 0 1 1.901-1.602h3.081c3.687 0 6.94-2.46 7.15-6.273.096-1.751-.36-3.32-1.311-4.389" />
          </svg>
          Pay with PayPal
        </div>
      </button>

      <button class="w-full py-3 border border-[#2C2E2F] rounded-full text-[#2C2E2F] font-medium">
        Pay with Debit or Credit Card
      </button>

      <!-- Close Button -->
      <button @click="closePaymentModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
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
</style>