<script setup lang="ts">
import BasePopup from "../../../components/common/BasePopup.vue";

defineProps<{
  show: boolean;
}>();
</script>

<template>
  <BasePopup :show="show" title="Location" @close="$emit('close')">
    <div class="aspect-video bg-gray-100 rounded-lg overflow-hidden">
      <img
        src="/images/map.png"
        alt="Location Map"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="mt-4 flex items-center gap-2 text-gray-600">
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
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
      </svg>
      <span>123 Main Street, City, Country</span>
    </div>
  </BasePopup>
</template>
