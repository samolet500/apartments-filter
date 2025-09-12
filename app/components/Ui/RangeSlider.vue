<script setup lang="ts">
import Slider from "@vueform/slider";
import { useHasHiddenChild } from "~/composables/useHasHiddenChild";

defineProps<{
  modelValue: [number, number];
  label: string;
  min: number;
  max: number;
  step?: number;
  merge?: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: [number, number]): void;
}>();

const sliderRef = ref<HTMLElement | null>(null);
const { hasHiddenChild: isUnited } = useHasHiddenChild(sliderRef);

function formatTooltip(value: number) {
  return value.toLocaleString("ru-RU");
}

function updateValue(val: [number, number]) {
  emit("update:modelValue", val);
}
</script>

<template>
  <div
    ref="sliderRef"
    class="ui-range"
    :class="{ 'ui-range--is-united': isUnited }"
  >
    <label class="ui-range__label">{{ label }}</label>
    <Slider
      :model-value="modelValue"
      :min="min"
      class="ui-range__slider"
      :max="max"
      :step="step"
      :merge="merge"
      :format="formatTooltip"
      :lazy="true"
      @update:model-value="updateValue"
    />
  </div>
</template>

<style lang="scss" scoped>
.ui-range {
  &__label {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0px;
  }

  &--is-united {
    &:deep(.slider-base) {
      .slider-origin {
        .slider-handle-upper + .slider-tooltip {
          transform: translateX(50%) !important;
        }

        .slider-tooltip::before {
          display: none !important;
        }
      }
    }
  }

  &:deep(.slider-base) {
    margin-top: 50px;

    .slider-tooltip {
      white-space: nowrap;
      display: inline-block;
      background: none;
      border: none;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: $color-black;
    }

    .slider-origin {
      [data-handle="0"] + .slider-tooltip {
        margin-top: 50px;
      }

      .slider-handle-lower + .slider-tooltip,
      [data-handle="0"] + .slider-tooltip {
        transform: translateX(calc(100% + -13px));
      }

      .slider-handle-lower + .slider-tooltip::before,
      [data-handle="0"] + .slider-tooltip::before {
        position: static;
        width: auto;
        height: auto;
        content: "от\00a0";
        color: $color-black;
        opacity: 0.5;
        font-size: 16px;
        line-height: 24px;
        margin-right: 6px;
        display: inline-block;
        vertical-align: middle;
        font-weight: 500;
        border: none;
        transform: none;
      }

      .slider-handle-upper + .slider-tooltip,
      [data-handle="1"] + .slider-tooltip {
        transform: translateX(0);
      }
      .slider-handle-upper + .slider-tooltip::before,
      [data-handle="1"] + .slider-tooltip::before {
        position: static;
        width: auto;
        height: auto;
        content: "до\00a0";
        color: $color-black;
        opacity: 0.5;
        font-size: 16px;
        line-height: 24px;
        margin-right: 6px;
        display: inline-block;
        vertical-align: middle;
        font-weight: 500;
        border: none;
        transform: none;
      }
    }
  }
  &:deep(.slider-horizontal) {
    height: 3px;
  }
  &:deep(.slider-handle) {
    width: 14px;
    height: 14px;
    background: $color-green;
    border: none;
    box-shadow: none;
  }
}
</style>
