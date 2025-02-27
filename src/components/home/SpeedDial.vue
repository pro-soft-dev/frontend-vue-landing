<script setup lang="ts">
import { EllipsisHorizontalIcon, XMarkIcon } from '@heroicons/vue/16/solid'
import { ref, onMounted, onUnmounted } from 'vue'

const actions = [
  { name: 'Post', icon: 'post', event: 'post' },
  { name: 'Map', icon: 'map', event: 'map' },
  { name: 'Statistics', icon: 'stats', event: 'stats' },
  { name: 'Share', icon: 'share', event: 'share' },
  { name: 'Bid', icon: 'bid', event: 'bid' },
  { name: 'Author', icon: 'author', event: 'author' },
  { name: 'Info', icon: 'info', event: 'info' }
]

const isOpen = ref(true)

const checkScreenSize = () => {
  if (window.innerWidth >= 768) { // 48rem = 768px
    isOpen.value = true
  }
}

onMounted(() => {
  window.addEventListener('resize', checkScreenSize)
  checkScreenSize() // Check on initial mount
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

defineEmits<{
  (e: 'action', action: string): void
}>()
</script>

<template>
  <div class="fixed right-4 bottom-7 md:bottom-[50%] flex flex-col-reverse gap-2 md:transform md:translate-y-1/2">
    <!-- Toggle Button -->
    <button @click="isOpen = !isOpen"
      :class="['w-12 h-12 bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:text-orange-600 transition-colors md:hidden']">

      <XMarkIcon v-if="isOpen === true" class="w-6 h-6" />
      <EllipsisHorizontalIcon v-else class="w-6 h-6" />
    </button>

    <!-- Action Buttons -->
    <div class="flex flex-col-reverse gap-2 transition-all duration-200 origin-bottom mb-2"
      :class="isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 invisible'">
      <button v-for="action in actions" :key="action.name" @click="$emit('action', action.event)"
        class="w-12 h-12  rounded-full shadow-lg flex items-center justify-center group relative"
        :class="action.name === 'Post' ? 'bg-orange-500 text-white hover:text-orange-white' : 'bg-white hover:bg-gray-50'">
        <span class="sr-only">{{ action.name }}</span>

        <!-- Icon -->
        <svg v-if="action.icon === 'info'" class="w-6 h-6 transition-transform group-hover:scale-110" fill="none"
          stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <!-- Add other icons based on action.icon -->
        <svg v-if="action.icon === 'author'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>

        <svg v-if="action.icon === 'bid'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

        <svg v-if="action.icon === 'share'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>

        <svg v-if="action.icon === 'stats'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>

        <svg v-if="action.icon === 'map'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>

        <svg v-if="action.icon === 'post'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>

        <!-- Label -->
        <span
          class="absolute right-full mr-2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          {{ action.name }}
        </span>
      </button>
    </div>
  </div>
</template>