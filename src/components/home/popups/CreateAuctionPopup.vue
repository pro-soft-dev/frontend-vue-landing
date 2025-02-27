<script setup lang="ts">
import BasePopup from "../../../components/common/BasePopup.vue";
import { ref } from "vue";

defineProps<{
  show: boolean;
}>();

const startingPrice = ref(100);
const duration = ref(7);
</script>

<template>
  <BasePopup :show="show" title="Create Auction" @close="$emit('close')">
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Starting Price (€)</label
        >
        <input
          type="number"
          v-model="startingPrice"
          min="1"
          class="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Duration (Days)</label
        >
        <select v-model="duration" class="w-full px-3 py-2 border rounded-lg">
          <option value="1">1 Day</option>
          <option value="3">3 Days</option>
          <option value="7">7 Days</option>
          <option value="14">14 Days</option>
        </select>
      </div>

      <button
        class="w-full py-3 bg-blue-600 text-white rounded-lg font-medium mt-6"
      >
        Create Auction
      </button>
    </div>
  </BasePopup>
</template>
