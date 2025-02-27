<template>
  <div class="w-1/2 h-full">
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="5"
      :spaceBetween="20"
      :initialSlide="2"
      :freeMode="true"
      :allowTouchMove="true"
      :loop="true"
      :loopedSlides="10"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :coverflowEffect="{
        rotate: 0,
        stretch: 0,
        depth: 0,
        modifier: 2,
        fade: true,
        slideShadows: false,
      }"
      :modules="modules"
      class="mySwiper"
      @swiper="onSwiper"
      @slideChange="handleSlideChange"
    >
      <swiper-slide
        v-for="item in 10"
        :key="item"
        :class="['rounded-lg', 'opacity-transition']"
      >
        <img
          :src="`/thumbnails/bottom-${(item % 5) + 1}.jpg`"
          alt="slide image"
          class="rounded-lg w-full h-full"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
  padding: 10px 0;
}

.swiper-wrapper {
  border-radius: 20px !important;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: transparent;
  transform: scale(0.7);
  transition: all 0.35s ease-in-out;
  border-radius: 20px;
  overflow: visible;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  opacity: 0.5;
  transition: all 0.35s ease-in-out;
}

.swiper-slide-active {
  transform: scale(1.3);
  z-index: 2;
}

.swiper-slide-active img {
  opacity: 1;
  transform: scale(1.1);
}

.opacity-transition {
  transition: opacity 0.35s ease-in-out;
}
</style>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { ref } from "vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const swiperInstance = ref(null);

    return {
      modules: [Autoplay, EffectCoverflow],
      swiperInstance,
    };
  },
};
</script>
