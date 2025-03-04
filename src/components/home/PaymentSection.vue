<script setup lang="ts">
import { ref, computed } from "vue";
import BasePopup from "../common/BasePopup.vue";

const selectedPaymentMethod = ref("paypal");
const activeTab = ref("buy");
const fixedPrice = 54.0;
const offerAmount = ref(21);
const minOffer = 1;
const maxOffer = 65;

const showPaymentModal = ref(false);
const includeFees = ref(false);
const amount = ref(122);
const paymentFees = ref(3.47);

const totalAmount = computed(() => {
  return includeFees.value ? amount.value + paymentFees.value : amount.value;
});

const openPaymentModal = () => {
  showPaymentModal.value = true;
};

const closePaymentModal = () => {
  showPaymentModal.value = false;
};

const offerCount = ref(0);
const maxOffers = 3;
const offerStatus = ref<"pending" | "accepted" | "rejected" | null>(null);

const submitOffer = () => {
  offerCount.value++;
  offerStatus.value = "pending";
  showPaymentModal.value = true;
};

const canMakeOffer = computed(() => offerCount.value < maxOffers);

const rangeBackground = computed(() => {
  const percentage =
    ((offerAmount.value - minOffer) / (maxOffer - minOffer)) * 100;
  return `background: linear-gradient(to right, #f97316 ${percentage}%, #e5e7eb ${percentage}%)`;
});
</script>

<template>
  <section class="payment-section bg-white rounded-lg p-6 md:p-10 mb-6">
    <h3 class="text-xl mb-4 hidden md:block">Payment Method</h3>

    <!-- Mobile Payment Method Select -->
    <div class="mb-4 md:hidden">
      <div class="flex gap-8 mb-6">
        <button
          @click="activeTab = 'buy'"
          :class="[
            'flex-1 py-2 font-medium',
            activeTab === 'buy'
              ? 'border-b-2 border-orange-500 text-black'
              : 'text-gray-500',
          ]"
        >
          Buy
        </button>
        <button
          @click="activeTab = 'offer'"
          :class="[
            'flex-1 py-2 font-medium',
            activeTab === 'offer'
              ? 'border-b-2 border-orange-500 text-black'
              : 'text-gray-500',
          ]"
        >
          Make an Offer
        </button>
      </div>
      <button
        class="bg-orange-500 text-white w-full py-3"
        @click="openPaymentModal"
      >
        Buy Now
      </button>
    </div>

    <!-- Payment Method Select -->
    <div class="relative mb-6">
      <select
        v-model="selectedPaymentMethod"
        class="w-full p-3 pl-10 border appearance-none"
      >
        <option value="paypal">PayPal</option>
        <option value="credit">Credit Card</option>
      </select>
      <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          v-if="selectedPaymentMethod === 'paypal'"
          class="w-5 h-5"
          viewBox="0 0 24 24"
          fill="#00457C"
        >
          <path
            d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.771.771 0 0 1 .761-.641h7.803c3.676 0 6.347 2.524 6.147 6.123-.21 3.813-3.463 6.273-7.15 6.273H9.424a.77.77 0 0 0-.761.641l-1.587 5.22zm12.89-14.576c-.008-.114-.013-.23-.02-.345-.494-7.083-6.37-6.332-8.184-6.332H4.33a.893.893 0 0 0-.882.744L.007 21.407a.642.642 0 0 0 .633.739h4.606l1.587-5.22a1.932 1.932 0 0 1 1.901-1.602h3.081c3.687 0 6.94-2.46 7.15-6.273.096-1.751-.36-3.32-1.311-4.389"
          />
        </svg>
        <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"
          />
        </svg>
      </div>
    </div>

    <div class="hidden gap-8 mb-6 md:flex">
      <button
        @click="activeTab = 'buy'"
        :class="[
          'flex-1 py-2 font-medium',
          activeTab === 'buy'
            ? 'border-b-2 border-orange-500 text-black'
            : 'text-gray-500',
        ]"
      >
        Buy
      </button>
      <button
        @click="activeTab = 'offer'"
        :class="[
          'flex-1 py-2 font-medium',
          activeTab === 'offer'
            ? 'border-b-2 border-orange-500 text-black'
            : 'text-gray-500',
        ]"
      >
        Make an Offer
      </button>
    </div>
    <div class="my-4 md:hidden">
      <span class="text-lg">MAKE A BID</span>
    </div>

    <div class="flex">
      <div class="mb-6 hidden md:block w-1/2">
        <div class="text-gray-600 mb-2">Price</div>
        <div class="text-xl font-bold">EUR {{ fixedPrice.toFixed(2) }}</div>
        <div class="text-sm text-gray-500">
          <span class="font-bold text-black">+ Fees</span> Approximately EUR
          {{ paymentFees.toFixed(2) }}
        </div>
      </div>
      <div class="my-6 md:w-1/2 w-full">
        <input
          type="range"
          v-model="offerAmount"
          :min="minOffer"
          :max="maxOffer"
          :style="rangeBackground"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <!-- <div class="flex justify-between mt-2">
          <span class="text-sm text-gray-500">{{ minOffer }}$</span>
          <span class="text-sm text-gray-500">{{ maxOffer }}$</span>
        </div> -->

        <div class="flex justify-between items-center mb-6">
          <div class="text-center">
            <div class="font-bold">{{ offerAmount }}$</div>
            <div class="text-sm text-gray-500">Your Bid</div>
          </div>
          <div class="text-center">
            <div class="font-bold">{{ maxOffer }}$</div>
            <div class="text-sm text-gray-500">Total Fee</div>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden md:flex gap-4">
      <button
        @click="openPaymentModal"
        class="w-full py-3 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50"
      >
        DEAL!
      </button>
      <button
        :disabled="!canMakeOffer"
        @click="submitOffer"
        class="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300"
      >
        {{ canMakeOffer ? "MAKE AN OFFER" : "Maximum offers reached" }}
        <!-- <span v-if="canMakeOffer" class="text-sm"
          >({{ maxOffers - offerCount }} attempts left)</span
        > -->
      </button>
    </div>

    <!-- Payment Modal -->
    <BasePopup :show="showPaymentModal" @close="closePaymentModal">
      <div class="bg-white rounded-lg p-6 w-96 max-w-full">
        <div class="text-center mb-6">
          <div class="text-4xl font-bold mb-1">
            €{{ totalAmount.toFixed(2) }}
          </div>
          <div class="text-gray-600">EUR</div>
        </div>

        <label class="flex items-center gap-2 mb-6 cursor-pointer">
          <input
            type="checkbox"
            v-model="includeFees"
            class="rounded border-gray-300"
          />
          <span class="text-gray-600"
            >Add {{ paymentFees.toFixed(2) }} € EUR to help cover the
            fees.</span
          >
        </label>

        <button class="w-full mb-3 py-3 bg-[#FFC439] rounded-full font-medium">
          <div class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="#00457C">
              <path
                d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.771.771 0 0 1 .761-.641h7.803c3.676 0 6.347 2.524 6.147 6.123-.21 3.813-3.463 6.273-7.15 6.273H9.424a.77.77 0 0 0-.761.641l-1.587 5.22zm12.89-14.576c-.008-.114-.013-.23-.02-.345-.494-7.083-6.37-6.332-8.184-6.332H4.33a.893.893 0 0 0-.882.744L.007 21.407a.642.642 0 0 0 .633.739h4.606l1.587-5.22a1.932 1.932 0 0 1 1.901-1.602h3.081c3.687 0 6.94-2.46 7.15-6.273.096-1.751-.36-3.32-1.311-4.389"
              />
            </svg>
            Pay with PayPal
          </div>
        </button>

        <button
          class="w-full py-3 border border-[#2C2E2F] rounded-full text-[#2C2E2F] font-medium"
        >
          Pay with Debit or Credit Card
        </button>
      </div>
    </BasePopup>
  </section>
</template>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: white;
  border: 2px solid #f97316;
  border-radius: 50%;
  cursor: pointer;
}
</style>
