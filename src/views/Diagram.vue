<template>
  <div class="min-h-screen p-8 overflow-hidden">
    <h3 class="text-4xl my-4 mb-12">Diagram</h3>
    <div class="max-w-6xl mx-auto">
      <!-- Horizontal Slider -->
      <div
        class="relative mb-16"
        role="slider"
        aria-label="Bid control slider"
        :aria-valuenow="sliderPosition"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <!-- Slider Track -->
        <div class="w-full h-2 bg-gray-200 rounded-full">
          <!-- Active Track -->
          <div
            class="h-full bg-orange-500 rounded-full"
            :style="{ width: `${sliderPosition}%` }"
          ></div>
        </div>

        <!-- Slider Handle -->
        <div
          ref="sliderHandle"
          class="absolute w-8 h-8 top-0 -mt-3 transform -translate-x-1/2 cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-orange-500 group transition-transform hover:scale-110"
          :style="{ left: `${sliderPosition}%` }"
          @mousedown="startDragging"
          @touchstart="startTouchDrag"
          tabindex="0"
        >
          <div class="w-full h-full bg-green-500 rounded-full shadow-lg">
            <!-- Tooltip -->
            <div
              class="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-2 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
            >
              {{ Math.round(sliderPosition) }}%
            </div>
          </div>
        </div>
      </div>

      <!-- Diagram -->
      <div class="relative h-[400px]">
        <!-- Center Bar -->
        <div
          class="absolute left-1/2 bottom-0 w-8 bg-gray-400 rounded-t transform -translate-x-1/2"
          :style="{ height: `${sliderPosition}%` }"
        >
          <!-- Control Buttons -->
          <div
            class="absolute -left-3 -right-3 bottom-full transform -translate-y-1 flex justify-between"
          >
            <button
              @click="moveBarLeft"
              class="relative w-4 h-4 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 items-center justify-center transition-all duration-300"
              aria-label="Move bar left"
              :class="{
                'opacity-0': sliderPosition === 0 || sliderPosition === 100,
              }"
            >
              <span
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                >&larr;</span
              >
            </button>
            <button
              @click="moveBarRight"
              class="relative w-4 h-4 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 items-center justify-center transition-all duration-300"
              aria-label="Move bar right"
              :class="{
                'opacity-0': sliderPosition === 0 || sliderPosition === 100,
              }"
            >
              <span
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                >&rarr;</span
              >
            </button>
          </div>
        </div>

        <!-- Wings -->
        <svg
          class="w-full h-full"
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
        >
          <path :d="leftWingPath" :fill="getWingColor('left')" />
          <path :d="rightWingPath" :fill="getWingColor('right')" />
        </svg>

        <!-- Base Line -->
        <div class="w-full h-4 bg-gray-400"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const sliderPosition = ref(0);
const sliderHandle = ref<HTMLElement | null>(null);
const isDragging = ref(false);

// Wing path calculations
const leftWingPath = computed(() => {
  const height = sliderPosition.value;
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
  const height = sliderPosition.value;
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

// Color calculations
const getWingColor = (side: "left" | "right") => {
  const opacity = 0.6 + sliderPosition.value / 250;
  return side === "left"
    ? `rgba(255, 184, 106, ${opacity})`
    : `rgba(251, 44, 54, ${opacity})`;
};

// Slider controls
const updateSliderPosition = (clientX: number) => {
  if (!sliderHandle.value) return;

  const slider = sliderHandle.value.parentElement;
  if (!slider) return;

  const rect = slider.getBoundingClientRect();
  const relativeX = clientX - rect.left;
  let newPosition = (relativeX / rect.width) * 100;
  newPosition = Math.max(0, Math.min(100, newPosition));

  sliderPosition.value = newPosition;
};

const startDragging = (e: MouseEvent) => {
  e.preventDefault();
  isDragging.value = true;
  document.addEventListener("mousemove", handleMouseDrag);
  document.addEventListener("mouseup", stopDragging);
};

const handleMouseDrag = (e: MouseEvent) => {
  if (!isDragging.value) return;
  updateSliderPosition(e.clientX);
};

const stopDragging = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", handleMouseDrag);
  document.removeEventListener("mouseup", stopDragging);
};

// Touch controls
const handleTouch = (e: TouchEvent) => {
  if (!isDragging.value) return;
  e.preventDefault();
  const touch = e.touches[0];
  updateSliderPosition(touch.clientX);
};

const startTouchDrag = (e: TouchEvent) => {
  isDragging.value = true;
  e.preventDefault();
  document.addEventListener("touchmove", handleTouch, { passive: false });
  document.addEventListener("touchend", stopTouchDrag);
};

const stopTouchDrag = () => {
  isDragging.value = false;
  document.removeEventListener("touchmove", handleTouch);
  document.removeEventListener("touchend", stopTouchDrag);
};

// Bar position controls
const moveStep = 1; // Amount to move the slider by

const moveBarLeft = (e?: MouseEvent) => {
  e?.preventDefault();
  sliderPosition.value = Math.max(0, sliderPosition.value - moveStep);
};

const moveBarRight = (e?: MouseEvent) => {
  e?.preventDefault();
  sliderPosition.value = Math.min(100, sliderPosition.value + moveStep);
};

onMounted(() => {
  // Add global keyboard listener
  document.addEventListener("keydown", (e) => {
    // Handle keyboard controls when slider handle is focused or no element is focused
    if (
      document.activeElement === sliderHandle.value ||
      document.activeElement === document.body
    ) {
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        moveBarLeft();
      }
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        moveBarRight();
      }
    }
  });
});

onUnmounted(() => {
  document.removeEventListener("mousemove", handleMouseDrag);
  document.removeEventListener("mouseup", stopDragging);
  document.removeEventListener("touchmove", handleTouch);
  document.removeEventListener("touchend", stopTouchDrag);
});
</script>
