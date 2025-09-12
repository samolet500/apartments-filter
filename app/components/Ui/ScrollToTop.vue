<script setup lang="ts">
const isVisible = ref(false);

const checkScroll = () => {
  isVisible.value = window.scrollY > 100;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
  checkScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<template>
  <transition name="fade-slide">
    <button
      v-if="isVisible"
      class="scroll-to-top"
      @click="scrollToTop"
      aria-label="Scroll to top"
    >
      <Icon class="arrow-up-long" name="icon:arrow-up-long" size="16" />
    </button>
  </transition>
</template>

<style lang="scss" scoped>
.scroll-to-top {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 40px;
  height: 40px;
  z-index: 999;
  background-color: $color-green-2;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
}

/* Hover */
.scroll-to-top:hover {
  background-color: $color-green;
}

/* Анимация fade + slide */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
