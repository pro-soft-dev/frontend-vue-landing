<script setup lang="ts">
import BasePopup from "../../../components/common/BasePopup.vue";

defineProps<{
  show: boolean;
}>();
</script>

<template>
  <BasePopup :show="show" title="Article Information" @close="$emit('close')">
    <div class="space-y-4">
      <div class="flex gap-4">
        <span class="font-medium w-24">Category:</span>
        <span>Food & Dining</span>
      </div>
      <div class="flex gap-4">
        <span class="font-medium w-24">Published:</span>
        <span>March 15, 2024</span>
      </div>
      <div class="flex gap-4">
        <span class="font-medium w-24">Views:</span>
        <span>15,135</span>
      </div>
      <div class="mt-6">
        <h4 class="font-medium mb-2">Description</h4>
        <p class="text-gray-600">
          Detailed article about food experiences and culinary adventures in the
          heart of the city...
        </p>
      </div>
    </div>
  </BasePopup>
</template>
