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
          class="absolute w-8 h-4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing group transition-transform hover:scale-110 rounded-r-xl rounded-l-xl"
          :style="{ left: `${sliderPosition}%` }"
          @mousedown="startDragging"
          @touchstart="startTouchDrag"
        >
          <div
            class="w-full h-full bg-white rounded-full shadow-xl text-center"
          >
            <span class="handle-icon"></span>
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
          class="absolute left-1/2 bottom-0 w-10 bg-white rounded-t transform -translate-x-1/2 border border-gray-300 border-b-0 flex flex-col items-center justify-between"
          :style="{ height: `${sliderPosition}%` }"
        >
          <!-- Control Buttons -->
          <div
            class="absolute -left-2 -right-2 bottom-full transform translate-y-1/2 flex justify-between"
            ref="controlButtons"
          >
            <button
              @click="moveBarLeft"
              class="relative w-4 h-4 bg-white rounded-full shadow shadow-gray-300 hover:bg-gray-300 items-center justify-center transition-all duration-300"
              aria-label="Move bar left"
              :class="{
                'opacity-0': sliderPosition === 0,
              }"
              @mousedown="startButtonDragging"
              @touchstart="startButtonTouchDrag"
            >
              <span
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                >&larr;</span
              >
            </button>
            <button
              @click="moveBarRight"
              class="relative w-4 h-4 bg-white rounded-full shadow shadow-gray-300 hover:bg-gray-300 items-center justify-center transition-all duration-300"
              aria-label="Move bar right"
              :class="{
                'opacity-0': sliderPosition === 0,
              }"
              @mousedown="startButtonDragging"
              @touchstart="startButtonTouchDrag"
            >
              <span
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                >&rarr;</span
              >
            </button>
          </div>
          <div
            class="flex flex-col items-center justify-center -rotate-90 w-max mt-4"
            :style="{
              display: sliderPosition < 15 ? 'none' : 'flex',
            }"
          >
            <div class="text-sm">now</div>
            <div class="text-sm">for free</div>
          </div>
          <div class="flex justify-center items-center">
            <svg width="100" height="100" viewBox="0 0 100 100" class="w-5 h-5">
              <circle cx="35" cy="35" r="4" fill="gray" />
              <circle cx="65" cy="35" r="4" fill="gray" />
              <path
                d="M30 60 Q50 80, 70 60"
                stroke="gray"
                stroke-width="4"
                fill="none"
                stroke-linecap="round"
              />
            </svg>
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
        <div class="w-full h-6 flex relative">
          <div
            :class="`h-full w-1/2`"
            :style="{
              background: getWingColor('left'),
            }"
          ></div>
          <div
            :class="`h-full w-1/2`"
            :style="{
              background: getWingColor('right'),
            }"
          ></div>
          <div
            class="absolute left-1/2 -translate-x-1/2 w-10 h-full border border-gray-300 border-b-0 text-center flex items-center justify-center"
            :style="{
              background: 'white',
            }"
          >
            <svg width="100" height="100" viewBox="0 0 100 100" class="w-5 h-5">
              <circle cx="35" cy="35" r="4" fill="gray" />
              <circle cx="65" cy="35" r="4" fill="gray" />
              <path
                d="M30 60 Q50 80, 70 60"
                stroke="gray"
                stroke-width="4"
                fill="none"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const sliderPosition = ref(0);
const sliderHandle = ref<HTMLElement | null>(null);
const controlButtons = ref<HTMLElement | null>(null);

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
  const opacity = Math.max(0.7 + sliderPosition.value / 250, 1) * 0.8;
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

const startButtonDragging = (e: MouseEvent) => {
  e.preventDefault();
  isDragging.value = true;
  document.addEventListener("mousemove", handleButtonDrag);
  document.addEventListener("mouseup", stopButtonDrag);
};

const handleButtonDrag = (e: MouseEvent) => {
  if (!isDragging.value) return;
  if (!controlButtons.value) return;

  const diagram = controlButtons.value.parentElement?.parentElement;
  if (!diagram) return;

  const rect = diagram.getBoundingClientRect();
  const relativeY = rect.bottom - e.clientY;

  let newPosition = (relativeY / rect.height) * 100;
  newPosition = Math.max(0, Math.min(100, newPosition));

  sliderPosition.value = newPosition;
};

const stopButtonDrag = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", handleButtonDrag);
  document.removeEventListener("mouseup", stopButtonDrag);
};

// Touch controls
const handleButtonTouch = (e: TouchEvent) => {
  if (!isDragging.value) return;
  e.preventDefault();
  const touch = e.touches[0];
  const diagram = controlButtons.value?.parentElement?.parentElement;
  if (!diagram) return;

  const rect = diagram.getBoundingClientRect();
  const relativeY = rect.bottom - touch.clientY;

  let newPosition = (relativeY / rect.height) * 100;
  newPosition = Math.max(0, Math.min(100, newPosition));

  sliderPosition.value = newPosition;
};

const startButtonTouchDrag = (e: TouchEvent) => {
  isDragging.value = true;
  e.preventDefault();
  document.addEventListener("touchmove", handleButtonTouch, {
    passive: false,
  });
  document.addEventListener("touchend", stopButtonTouchDrag);
};

const stopButtonTouchDrag = () => {
  isDragging.value = false;
  document.removeEventListener("touchmove", handleButtonTouch);
  document.removeEventListener("touchend", stopButtonTouchDrag);
};

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
<style scoped>
.handle-icon {
  position: relative;
  width: 0;
}
.handle-icon::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  height: 8px;
  border-left: 1px solid #ff6900;
  border-right: 1px solid #ff6900;
  width: 15px;
}
.handle-icon::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  height: 8px;
  border-left: 1px solid #ff6900;
  width: 0px;
}
</style>
