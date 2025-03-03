<template>
  <div class="min-h-screen p-8 overflow-hidden">
    <div class="max-w-6xl mx-auto">
      <h3 class="text-lg sm:text-2xl xl:text-5xl font-bold mb-3 md:mb-10">
        Diagram Page
      </h3>

      <!-- Horizontal Slider with Tooltip -->
      <div class="relative mb-16">
        <div class="w-full h-2 bg-gray-200 rounded-full">
          <div class="absolute w-8 h-8 -mt-3 transform -translate-x-1/2 cursor-grab active:cursor-grabbing  group"
            :style="{ left: `${sliderPosition}%` }" @mousedown="startDragging" ref="sliderHandle">
            <!-- Tooltip -->
            <div
              class="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-2 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Value: {{ Math.round(sliderPosition) }}%
            </div>
            <div class="w-full h-full bg-green-500 rounded-full shadow-lg transition-transform hover:scale-110" />
          </div>
        </div>
      </div>

      <!-- Diagram -->
      <div class="relative h-[400px]">
        <div class="absolute top-0 left-0 bg-red-500 flex flex-col">
          <div class=""></div>
        </div>
        <!-- Center Bar -->
        <div class="absolute left-1/2 bottom-0 w-4 bg-indigo-400 rounded-t transform -translate-x-1/2 .center-bar"
          :style="{ height: `${centerBarHeight}%` }"></div>

        <!-- Wings -->
        <svg class="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
          <!-- Left Wing -->
          <path :d="leftWingPath" fill="#ffb86aa0" />

          <!-- Right Wing -->
          <path :d="rightWingPath" fill="#fb2c36a8" />
        </svg>
        <div class="bg-indigo-400 w-full h-4"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const sliderPosition = ref(0);
const isDragging = ref(false);
const sliderHandle = ref<HTMLElement | null>(null);
const dragStartX = ref(0);
const dragStartPosition = ref(0);

const animationFrameId = ref<number | null>(null);
const touchX = ref<number | null>(null);

// Computed values based on slider position
const centerBarHeight = computed(() => sliderPosition.value);

// Calculate wing paths based on slider position
const leftWingPath = computed(() => {
  const height = centerBarHeight.value;
  const tipHeight = height * 4;
  const controlY1 = 400 - tipHeight * 0.1;
  const controlY2 = 400 - tipHeight * 0.1;
  return `
    M 400,400
    C 300,${controlY2} 150,${controlY1} 0,${400 - tipHeight}
    L 0,400 
    Z
  `;
});

const rightWingPath = computed(() => {
  const height = centerBarHeight.value;
  const tipHeight = height * 4;
  const controlY1 = 400 - tipHeight * 0.1;
  const controlY2 = 400 - tipHeight * 0.1;
  return `
    M 400,400
    C 500,${controlY2} 650,${controlY1} 800,${400 - tipHeight}
    L 800,400 
    Z
  `;
});

// Updated slider drag functionality
const startDragging = (e: MouseEvent) => {
  isDragging.value = true;
  dragStartX.value = e.clientX;
  dragStartPosition.value = sliderPosition.value;

  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("mouseup", stopDragging);

  // Add cursor styles to indicate dragging
  document.body.style.cursor = "grabbing";
  document.body.style.userSelect = "none";
};

const handleDrag = (e: MouseEvent) => {
  if (!isDragging.value || !sliderHandle.value) return;

  const slider = sliderHandle.value.parentElement;
  if (!slider) return;

  const rect = slider.getBoundingClientRect();
  const deltaX = e.clientX - dragStartX.value;
  const percentageDelta = (deltaX / rect.width) * 100;

  let newPosition = dragStartPosition.value + percentageDelta;
  newPosition = Math.max(0, Math.min(100, newPosition));

  sliderPosition.value = newPosition;
};

const stopDragging = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", stopDragging);

  // Reset cursor styles
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
};

const updateSliderPosition = () => {
  if (!isDragging.value || !sliderHandle.value || touchX.value === null) return;

  const slider = sliderHandle.value.parentElement;
  if (!slider) return;

  const rect = slider.getBoundingClientRect();
  const relativeX = touchX.value - rect.left;
  let newPosition = (relativeX / rect.width) * 100;
  newPosition = Math.max(0, Math.min(100, newPosition));

  sliderPosition.value = newPosition;

  animationFrameId.value = requestAnimationFrame(updateSliderPosition);
};

const handleTouch = (e: TouchEvent) => {
  if (!isDragging.value) return;
  e.preventDefault();

  const touch = e.touches[0];
  touchX.value = touch.clientX;

  if (animationFrameId.value === null) {
    animationFrameId.value = requestAnimationFrame(updateSliderPosition);
  }
};

const startTouchDrag = (e: TouchEvent) => {
  isDragging.value = true;
  const touch = e.touches[0];
  touchX.value = touch.clientX;
  e.preventDefault();

  animationFrameId.value = requestAnimationFrame(updateSliderPosition);
};

const stopTouchDrag = () => {
  isDragging.value = false;
  touchX.value = null;

  if (animationFrameId.value !== null) {
    cancelAnimationFrame(animationFrameId.value);
    animationFrameId.value = null;
  }
};

const globalKeyDownHandler = (e: KeyboardEvent) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
    e.preventDefault();
    sliderPosition.value -= 1;
    if (sliderPosition.value < 0) {
      sliderPosition.value = 0;
    }
  }
  if (e.key === "ArrowRight" || e.key === "ArrowUp") {
    e.preventDefault();
    sliderPosition.value += 1;
    if (sliderPosition.value > 100) {
      sliderPosition.value = 100;
    }
  }
};

onMounted(() => {
  if (sliderHandle.value) {
    sliderHandle.value.addEventListener("touchmove", handleTouch, { passive: false });
    sliderHandle.value.addEventListener("touchstart", startTouchDrag, { passive: false });
    sliderHandle.value.addEventListener("touchend", stopTouchDrag);
    sliderHandle.value.addEventListener("touchcancel", stopTouchDrag);
    window.addEventListener("keydown", globalKeyDownHandler);
  }
});

onUnmounted(() => {
  if (sliderHandle.value) {
    sliderHandle.value.removeEventListener("touchmove", handleTouch);
    sliderHandle.value.removeEventListener("touchstart", startTouchDrag);
    sliderHandle.value.removeEventListener("touchend", stopTouchDrag);
    sliderHandle.value.removeEventListener("touchcancel", stopTouchDrag);
    window.removeEventListener("keydown", globalKeyDownHandler);
  }

  if (animationFrameId.value !== null) {
    cancelAnimationFrame(animationFrameId.value);
  }
});
</script>

<style scoped>
/* path,
.center-bar {
  transition: d 0.1s linear;
} */
</style>
