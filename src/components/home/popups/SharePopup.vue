<script setup lang="ts">
import BasePopup from "../../../components/common/BasePopup.vue";

defineProps<{
  show: boolean;
}>();

const socialLinks = [
  { name: "Facebook", color: "bg-blue-600" },
  { name: "Twitter", color: "bg-sky-500" },
  { name: "LinkedIn", color: "bg-blue-700" },
  { name: "Pinterest", color: "bg-red-600" },
  { name: "WhatsApp", color: "bg-green-500" },
];
</script>

<template>
  <BasePopup :show="show" title="Share Article" @close="$emit('close')">
    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="link in socialLinks"
        :key="link.name"
        :class="[
          link.color,
          'text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2',
        ]"
      >
        {{ link.name }}
      </button>
    </div>
  </BasePopup>
</template>
