<script setup lang="ts">
defineProps<{
  show: boolean
  title: string,
  width?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <transition name="modal">
    <div v-if="show" class="fixed inset-0 bg-[#00000090] bg-opacity-50 flex items-center justify-center z-50">
      <div :class="['bg-white rounded-lg p-6 max-w-2xl mx-4 relative', width || 'w-96']">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold">{{ title }}</h3>
          <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.modal-enter-active {
  animation: fadeIn 0.3s;
}

.modal-leave-active {
  animation: fadeOut 0.3s;
}
</style>