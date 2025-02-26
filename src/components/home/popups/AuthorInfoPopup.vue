<script setup lang="ts">
import BasePopup from '../../../components/common/BasePopup.vue'

defineProps<{
  show: boolean
}>()

</script>

<template>
  <BasePopup :show="show" title="About Author" @close="$emit('close')">
    <div class="flex gap-6">
      <div class="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-2xl">
        EE
      </div>
      <div class="flex-1">
        <h4 class="text-xl font-medium text-orange-500">Ellen Edwardo</h4>
        <p class="text-gray-600 mt-1">Writer & Director</p>
        <p class="mt-4 text-gray-700">
          Professional food critic and culinary expert with over 10 years of experience...
        </p>
      </div>
    </div>
  </BasePopup>
</template>