<template>
  <button class="ui-button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.ui-button {
  padding: 8px 24px;
  background: transparent;
  border-radius: 25px;
  border: 1px solid $color-gray;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}
</style>
