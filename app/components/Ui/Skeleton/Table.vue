<template>
  <div class="skeleton">
    <div v-for="i in 5" :key="'row-' + i" class="skeleton__row">
      <div v-for="j in 5" :key="'cell-' + i + '-' + j" class="skeleton__cell" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  width: 100%;

  &__row {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
  }

  &__cell {
    flex: 1;
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
