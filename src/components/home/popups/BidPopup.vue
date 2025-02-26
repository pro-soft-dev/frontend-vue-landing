<script setup lang="ts">
import BasePopup from '../../../components/common/BasePopup.vue'
import { ref } from 'vue'

defineProps<{
  show: boolean
}>()

const bidAmount = ref(100)
</script>

<template>
  <BasePopup :show="show" title="Place a Bid" @close="$emit('close')">
    <div class="space-y-6">
      <div class="text-center">
        <div class="text-4xl font-bold mb-1">€{{ bidAmount }}</div>
        <div class="text-gray-600">Current Bid</div>
      </div>

      <input type="range" v-model="bidAmount" min="100" max="1000" step="50"
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">

      <button class="w-full py-3 bg-blue-600 text-white rounded-lg font-medium">
        Place Bid
      </button>
    </div>
  </BasePopup>
</template>