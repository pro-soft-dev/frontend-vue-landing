<template>
  <div class="flex items-center mb-8 md:flex-row-reverse md:gap-4 md:justify-end gap-2 flex-wrap">
    <div class="">
      <button class="flex items-center gap-2 px-2 md:px-4 py-2 bg-blue-600 text-white rounded-full">
        Visit Website
      </button>
    </div>
    <div class="flex items-center md:gap-4 gap-2 flex-wrap">
      <button class="flex items-center gap-2 px-2 md:px-4 py-2 bg-transparent rounded-lg">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        <span class="hidden md:block">Mark</span>
      </button>

      <div class="h-8 w-px bg-gray-300 hidden md:block"></div>

      <button class="flex items-center gap-2 px-2 md:px-4 py-2 bg-tran rounded-lg">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        <span class="hidden md:block">Share</span>
      </button>

      <div class="h-8 w-px bg-gray-300 hidden md:block"></div>

      <button class="flex items-center gap-2 px-2 md:px-4 py-2 bg-tran rounded-lg">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        <span class="hidden md:block">Print</span>
      </button>

      <div class="h-8 w-px bg-gray-300 hidden md:block"></div>
    </div>
  </div>
</template>