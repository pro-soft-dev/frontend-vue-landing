<script setup lang="ts">
import BasePopup from "../../../components/common/BasePopup.vue";

defineProps<{
  show: boolean;
}>();

const stats = [
  { label: "Views", value: "15,135" },
  { label: "Likes", value: "2,847" },
  { label: "Comments", value: "456" },
  { label: "Shares", value: "129" },
];
</script>

<template>
  <BasePopup :show="show" title="Analytics" @close="$emit('close')">
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-gray-50 p-4 rounded-lg text-center"
      >
        <div class="text-2xl font-bold text-blue-600">{{ stat.value }}</div>
        <div class="text-gray-600">{{ stat.label }}</div>
      </div>
    </div>
  </BasePopup>
</template>
