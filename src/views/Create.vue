<script setup lang="ts">
import { ref } from 'vue'

const title = ref('')
const category = ref('')
const description = ref('')
const minPrice = ref(80)
const selectedPayment = ref('paypal')
const experience = ref('2-5')
const reason = ref('')
const isChecked = ref(false)
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-semibold mb-8">Post an Article</h1>

    <form class="space-y-6">
      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input type="text" v-model="title" placeholder="Leckerschmecker"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
      </div>

      <!-- Category -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <input type="text" v-model="category" placeholder="Type at least 4 first few it words"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
      </div>

      <!-- Rich Text Editor -->
      <div>
        <div class="flex items-center gap-2 mb-2">
          <button type="button" class="p-2 hover:bg-gray-100 rounded">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 11h4.5a2.5 2.5 0 0 0 0-5H8v5zm10 4.5a2.5 2.5 0 0 0-2.5-2.5H8v5h7.5a2.5 2.5 0 0 0 2.5-2.5z" />
              <path d="M8 3h4.5C15.43 3 18 5.57 18 8.5s-2.57 5.5-5.5 5.5H8v7H6V3h2z" />
            </svg>
          </button>
          <button type="button" class="p-2 hover:bg-gray-100 rounded">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15 8.25H9v1.5h6v-1.5zm0 3H9v1.5h6v-1.5zM9 17h6v-1.5H9V17zm10-12v14H5V5h14zm-2 2H7v10h10V7z" />
            </svg>
          </button>
          <button type="button" class="p-2 hover:bg-gray-100 rounded">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 9h16v2H4V9zm0 4h16v2H4v-2z" />
            </svg>
          </button>
        </div>
        <textarea v-model="description" rows="4" placeholder="Enter description here..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <!-- Location & Photos -->
      <div class="flex gap-4">
        <button type="button" class="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          Set Location
        </button>
        <button type="button" class="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Add Photos
        </button>
      </div>

      <!-- Price Range -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-4">Money Year Bid</label>
        <div class="flex items-center gap-4">
          <span>80 $</span>
          <input type="range" v-model="minPrice" min="80" max="160" step="10"
            class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
          <span>160 $</span>
        </div>
      </div>

      <!-- Payment Method -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Select Payment Method</label>
        <div class="grid grid-cols-2 gap-4">
          <button type="button" @click="selectedPayment = 'paypal'" :class="['flex items-center justify-center gap-2 p-4 border rounded-lg hover:bg-gray-50',
            selectedPayment === 'paypal' ? 'border-blue-500' : 'border-gray-300']">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="#00457C">
              <path
                d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.771.771 0 0 1 .761-.641h7.803c3.676 0 6.347 2.524 6.147 6.123-.21 3.813-3.463 6.273-7.15 6.273H9.424a.77.77 0 0 0-.761.641l-1.587 5.22zm12.89-14.576c-.008-.114-.013-.23-.02-.345-.494-7.083-6.37-6.332-8.184-6.332H4.33a.893.893 0 0 0-.882.744L.007 21.407a.642.642 0 0 0 .633.739h4.606l1.587-5.22a1.932 1.932 0 0 1 1.901-1.602h3.081c3.687 0 6.94-2.46 7.15-6.273.096-1.751-.36-3.32-1.311-4.389" />
            </svg>
            PayPal
          </button>
          <button type="button" @click="selectedPayment = 'card'" :class="['flex items-center justify-center gap-2 p-4 border rounded-lg hover:bg-gray-50',
            selectedPayment === 'card' ? 'border-blue-500' : 'border-gray-300']">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 10h18M7 15h.01M11 15h.01M15 15h.01M19 15h.01M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            </svg>
            Credit Card
          </button>
        </div>
      </div>

      <!-- Experience Level -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">How many years of experience do you have?</label>
        <div class="space-y-2">
          <label class="flex items-center gap-2">
            <input type="radio" v-model="experience" value="0-2" class="text-blue-600">
            <span>0-2 Years</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="radio" v-model="experience" value="2-5" class="text-blue-600">
            <span>2-5 Years</span>
          </label>
        </div>
      </div>

      <!-- Reason -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Why are you making this article?</label>
        <div class="space-y-2">
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="isChecked" class="text-blue-600 rounded">
            <span>I want to share my article to public</span>
          </label>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-3">
        <button type="submit" class="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          Publish
        </button>
        <button type="button" class="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
          Preview
        </button>
        <button type="button" class="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
          Save & Post it Later
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
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
