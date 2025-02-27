<script setup lang="ts">
import { ref, computed } from 'vue'
import QuillEditor from '../components/QuillEditor.vue'
import { useRouter } from 'vue-router'
import { EllipsisHorizontalIcon } from '@heroicons/vue/16/solid'

const tags = [{
  label: "Nature", value: 'nature'
}, {
  label: "Architecture", value: 'architecture'
}, {
  label: "Company", value: 'company'
}, {
  label: "Food", value: 'food'
}, {
  label: "Travel", value: 'travel'
}, {
  label: "Fasion", value: 'fashion'
}]

const title = ref('')
const category = ref('')
const description = ref('')
const minPrice = ref(0)
const selectedPayment = ref('')
const articleType = ref('')
const reason = ref('')
const router = useRouter()

const rangeBackground = computed(() => {
  const min = 80
  const max = 160
  const value = minPrice.value
  const percentage = ((value - min) / (max - min)) * 100
  return `background: linear-gradient(to right, #ff6900 ${percentage}%, #d1d5dc ${percentage}%)`
})

const submitForm = (e: Event) => {
  e.preventDefault()
  console.log({
    title: title.value,
    category: category.value,
    description: description.value,
    minPrice: minPrice.value,
    selectedPayment: selectedPayment.value,
    articleType: articleType.value,
    reason: reason.value,
  })
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-semibold mb-8">Post an Article</h1>

    <form class="space-y-6" @submit="submitForm">
      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input type="text" v-model="title" name="title" placeholder="Leckerschmecker"
          class="w-full px-3 border border-gray-300 focus:outline-orange-500 focus:placeholder-orange-500 p-4">
      </div>

      <!-- Category -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <input type="text" v-model="category" name="category" placeholder="Type at least 4 first few it words"
          class="w-full px-3 border border-gray-300 focus:outline-orange-500 focus:placeholder-orange-500 p-4">
      </div>

      <!-- Tags -->
      <div class="mt-4">
        <!-- <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label> -->
        <div class="flex flex-wrap gap-2">
          <button type="button" v-for="tag in tags" :key="tag.value"
            :class="['px-2 py-1 bg-gray-50', tag.value === category.toLowerCase() ? 'bg-orange-500 text-white' : '']"
            @click="category = tag.value.charAt(0).toUpperCase() + tag.value.slice(1)">
            {{ tag.label }}
          </button>
        </div>
      </div>

      <!-- Rich Text Editor -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <QuillEditor v-model="description" />
      </div>

      <!-- Location & Photos -->
      <div class="flex gap-4">
        <button type="button"
          class="flex flex-col items-center gap-2 px-4 py-5 border border-gray-300 hover:bg-gray-50">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span>
            Set Location
          </span>
        </button>
        <button type="button"
          class="flex flex-col items-center gap-2 px-4 py-5 border border-gray-300 hover:bg-gray-50">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>
            Add Photos
          </span>
        </button>
      </div>

      <!-- Price Range -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-4">Money Year Bid</label>
        <div class="text-sm text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget risus at nibh pulvinar tempus in sit
          amet elit
        </div>
        <div class="flex items-center justify-between gap-4">
          <span>{{ minPrice }} $</span>
          <span>160 $</span>
        </div>
        <div class="w-full">
          <input type="range" v-model="minPrice" min="80" max="160" step="1" :style="rangeBackground"
            class="flex-1 h-2 w-full bg-gray-200 rounded-lg appearance-none cursor-pointer">
        </div>
      </div>

      <!-- Payment Method -->
      <div>
        <label class="block text-sm font-medium text-gray-700 my-6 mt-10">Select Payment Method</label>
        <div class="flex flex-wrap gap-4">
          <button type="button" @click="selectedPayment = 'paypal'" :class="['flex flex-col items-center justify-center gap-1 p-4 border hover:bg-gray-50 w-30',
            selectedPayment === 'paypal' ? 'border-orange-500 text-orange-500' : 'border-gray-300']">
            <svg class="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.771.771 0 0 1 .761-.641h7.803c3.676 0 6.347 2.524 6.147 6.123-.21 3.813-3.463 6.273-7.15 6.273H9.424a.77.77 0 0 0-.761.641l-1.587 5.22zm12.89-14.576c-.008-.114-.013-.23-.02-.345-.494-7.083-6.37-6.332-8.184-6.332H4.33a.893.893 0 0 0-.882.744L.007 21.407a.642.642 0 0 0 .633.739h4.606l1.587-5.22a1.932 1.932 0 0 1 1.901-1.602h3.081c3.687 0 6.94-2.46 7.15-6.273.096-1.751-.36-3.32-1.311-4.389" />
            </svg>
            PayPal
          </button>
          <button type="button" @click="selectedPayment = 'card'" :class="['flex items-center flex-col justify-center gap-1 p-4 border hover:bg-gray-50 w-30',
            selectedPayment === 'card' ? 'border-orange-500 text-orange-500' : 'border-gray-300']">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M16.539 9.186a4.155 4.155 0 0 0-1.451-.251c-1.6 0-2.73.806-2.738 1.963-.01.85.803 1.329 1.418 1.613.631.292.842.476.84.737-.004.397-.504.577-.969.577-.639 0-.988-.089-1.525-.312l-.199-.093-.227 1.332c.389.162 1.09.301 1.814.313 1.701 0 2.813-.801 2.826-2.032.014-.679-.426-1.192-1.352-1.616-.563-.275-.912-.459-.912-.738 0-.247.299-.511.924-.511a2.95 2.95 0 0 1 1.213.229l.15.067.227-1.287-.039.009zm4.152-.143h-1.25c-.389 0-.682.107-.852.493l-2.404 5.446h1.701l.34-.893 2.076.002c.049.209.199.891.199.891h1.5l-1.31-5.939zm-10.642-.05h1.621l-1.014 5.942H9.037l1.012-5.944v.002zm-4.115 3.275.168.825 1.584-4.05h1.717l-2.551 5.931H5.139l-1.4-5.022a.339.339 0 0 0-.149-.199 6.948 6.948 0 0 0-1.592-.589l.022-.125h2.609c.354.014.639.125.734.503l.57 2.729v-.003zm12.757.606.646-1.662c-.008.018.133-.343.215-.566l.111.513.375 1.714H18.69v.001h.001z" />
            </svg>
            Credit Card
          </button>
          <button type="button" @click="selectedPayment = 'other'" :class="['flex items-center flex-col justify-center gap-1 p-4 border hover:bg-gray-50 w-30',
            selectedPayment === 'other' ? 'border-orange-500 text-orange-500' : 'border-gray-300']">
            <EllipsisHorizontalIcon class="w-12 h-12" />
            More
          </button>
        </div>
      </div>

      <!-- Receive Email -->
      <div class="">
        <input type="text"
          class="border-gray-300 border p-4 w-full  focus:outline-orange-500 focus:placeholder-orange-500"
          placeholder="Enter your email address">
      </div>

      <!-- More Options -->
      <div>
        <label class="block text-sm font-medium text-gray-500 mb-2">More Options</label>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
          <div class="flex flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <input type="radio" name="articleType" id="offer-article" value="offer" v-model="articleType"
                class="text-orange-600 rounded">
              <label for="offer-article">Offer</label>
            </div>
            <div class="flex items-center gap-2">
              <input type="radio" name="articleType" id="exp-article" value="exp" class="text-orange-600 rounded"
                v-model="articleType">
              <label for="exp-article">Experience</label>
            </div>
          </div>
        </div>
      </div>

      <!-- Reason -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Why are you making this article?</label>
        <div class="space-y-2">
          <label class="flex items-center gap-2">
            <input type="radio" name="reason" value="share" class="text-orange-600 rounded" v-model="reason">
            <span>I want to share my article to public</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="radio" name="reason" value="test" class="text-orange-600 rounded" v-model="reason">
            <span>I'm just testing the article.</span>
          </label>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-3">
        <button type="submit" class="w-full py-3  text-white rounded-lg bg-orange-600">
          Publish
        </button>
        <button type="button" class="w-full py-3 border-orange-500 border text-orange-500 rounded-lg hover:bg-gray-50">
          Preview
        </button>
        <button type="button" class="w-full py-3 border border-black text-black rounded-lg hover:bg-gray-50">
          Save & Post it Later
        </button>
        <button @click="router.push('/')" type="button"
          class="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
          Cancel
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
