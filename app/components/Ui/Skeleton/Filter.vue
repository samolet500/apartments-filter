<template>
  <div class="skeleton">
    <div v-for="i in 3" :key="'filter-' + i" class="skeleton__filter" />
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  background: #c6c6c6;
  padding: 40px;
  border-radius: 10px;

  &__filter {
    margin-top: 20px;
    height: 40px;
    border-radius: 6px;
    background: #e0e0e0;
    animation: pulse 1.5s infinite ease-in-out;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
