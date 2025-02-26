<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  show: boolean
  amount: number
  paymentFees: number
  includeFees: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update:includeFees', value: boolean): void
}>()

const totalAmount = computed(() => {
  return props.includeFees ? props.amount + props.paymentFees : props.amount
})
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
      <!-- Amount -->
      <div class="text-center mb-6">
        <div class="text-4xl font-bold mb-1">€{{ totalAmount.toFixed(2) }}</div>
        <div class="text-gray-600">EUR</div>
      </div>

      <!-- Fees Checkbox -->
      <label class="flex items-center gap-2 mb-6 cursor-pointer">
        <input type="checkbox" :checked="includeFees" @change="$emit('update:includeFees', !includeFees)"
          class="rounded border-gray-300">
        <span class="text-gray-600">Add {{ paymentFees.toFixed(2) }} € EUR to help cover the fees.</span>
      </label>

      <!-- Payment Buttons -->
      <button class="w-full mb-3 py-3 bg-[#FFC439] rounded-full font-medium">
        <div class="flex items-center justify-center gap-2">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="#00457C">
            <path
              d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.771.771 0 0 1 .761-.641h7.803c3.676 0 6.347 2.524 6.147 6.123-.21 3.813-3.463 6.273-7.15 6.273H9.424a.77.77 0 0 0-.761.641l-1.587 5.22zm12.89-14.576c-.008-.114-.013-.23-.02-.345-.494-7.083-6.37-6.332-8.184-6.332H4.33a.893.893 0 0 0-.882.744L.007 21.407a.642.642 0 0 0 .633.739h4.606l1.587-5.22a1.932 1.932 0 0 1 1.901-1.602h3.081c3.687 0 6.94-2.46 7.15-6.273.096-1.751-.36-3.32-1.311-4.389" />
          </svg>
          Pay with PayPal
        </div>
      </button>

      <button class="w-full py-3 border border-[#2C2E2F] rounded-full text-[#2C2E2F] font-medium">
        Pay with Debit or Credit Card
      </button>

      <!-- Close Button -->
      <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>