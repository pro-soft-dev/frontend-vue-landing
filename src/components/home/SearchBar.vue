<script setup lang="ts"></script>

<template>
  <nav class="bg-white py-4 mb-4">
    <div class="max-w-screen-2xl mx-auto px-4">
      <div
        class="flex justify-center items-center flex-col lg:flex-row gap-3 xl:gap-8"
      >
        <div class="flex items-center">
          <div class="relative flex items-center flex-1 max-w-3xl">
            <!-- Search Icon -->
            <div class="absolute left-3 text-gray-400">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <!-- Search Input -->
            <input
              type="text"
              placeholder="Find Favorite Category..."
              class="w-full pl-10 pr-24 py-2 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
            />

            <!-- Advanced Button -->
            <button
              class="absolute right-3 text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              Advanced
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
        <!-- Vertical Separator -->
        <div class="h-8 w-px bg-gray-200 hidden lg:block"></div>

        <!-- Navigation Links -->
        <div
          class="flex items-center gap-2 xl:gap-6 text-sm flex-wrap justify-center md:justify-start md:flex-nowrap"
        >
          <a href="#" class="text-black p-2 font-bold hidden lg:block"
            >Trending</a
          >
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-sm"
            >Nature</a
          >
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-sm"
            >Architecture</a
          >
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-sm"
            >Company</a
          >
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-sm"
            >Food</a
          >
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-sm"
            >Travel</a
          >
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-sm"
            >Fashion</a
          >
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-sm"
            >People</a
          >
          <a
            href="#"
            class="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-sm"
            >Art & Design</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>
