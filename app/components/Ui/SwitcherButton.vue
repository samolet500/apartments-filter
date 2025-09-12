<script setup lang="ts">
const props = defineProps<{
  room: number;
  isSelected: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle", room: number): void;
}>();

const handleClick = () => {
  emit("toggle", props.room);
};
</script>

<template>
  <button
    :class="['room-switcher', isSelected ? 'selected' : '']"
    @click="handleClick"
  >
    {{ room }}к
  </button>
</template>

<style lang="scss" scoped>
.room-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: $color-white;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  cursor: pointer;

  &.selected {
    background: $color-green;
    box-shadow: 0px 6px 20px 0px #95d0a1;
    color: $color-white;
  }

  &.default {
    background: $color-white;
    box-shadow: none;
    color: gray;
    pointer-events: none;
  }
}
</style>
