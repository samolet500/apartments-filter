<script setup lang="ts">
import { useApartmentsStore } from "~/stores/apartments.store";
import Slider from "@vueform/slider";

const store = useApartmentsStore();

const priceSlider = ref<HTMLElement | null>(null);
const squareSlider = ref<HTMLElement | null>(null);
const { hasHiddenChild: isUnitedPriceSlider } = useHasHiddenChild(priceSlider);
const { hasHiddenChild: isUnitedSquareSlider } =
  useHasHiddenChild(squareSlider);

// 🔹 комнаты из данных (динамически)
const rooms = computed(() => store.defaultFilterRooms);

// 🔹 проверка, выбрана ли комната
const isRoomSelected = (room: number) => store.filterRooms.includes(room);

// 🔹 переключение комнат
const toggleRoom = (room: number) => {
  store.filterRooms = isRoomSelected(room)
    ? store.filterRooms.filter((r) => r !== room)
    : [...store.filterRooms, room];
};

// 🔹 сброс фильтров
const resetFilters = () => store.resetFilters();

function formatTooltip(value: number) {
  return value.toLocaleString("ru-RU");
}
</script>

<template>
  <div class="filters-panel">
    <!-- Кол-во комнат -->
    <div class="filters-panel__room-switcher room-switcher">
      <div class="room-switcher__buttons">
        <button
          v-for="room in rooms"
          :key="room"
          :class="[
            'room-switcher__button',
            isRoomSelected(room) ? 'selected' : '',
          ]"
          @click="toggleRoom(room)"
        >
          {{ room }}к
        </button>
      </div>
    </div>

    <!-- Цена -->
    <div
      ref="priceSlider"
      class="filters-panel__slider ui-range"
      :class="{ 'ui-range--is-united': isUnitedPriceSlider }"
    >
      <label class="ui-range__label"> Стоимость квартиры, ₽ </label>
      <Slider
        v-model="store.filterPrice"
        class="ui-range__slider price-slider"
        :min="store.defaultFilterPrice[0]"
        :max="store.defaultFilterPrice[1]"
        :merge="3000000"
        :step="100000"
        :lazy="true"
        :format="formatTooltip"
      />
    </div>

    <!-- Площадь -->
    <div
      ref="squareSlider"
      class="filters-panel__slider ui-range"
      :class="{ 'ui-range--is-united': isUnitedSquareSlider }"
    >
      <label class="ui-range__label"> Площадь, м<sup>2</sup> </label>
      <Slider
        v-model="store.filterSquare"
        class="ui-range__slider square-slider"
        :min="store.defaultFilterSquare[0]"
        :max="store.defaultFilterSquare[1]"
        :merge="20"
        :step="1"
        :lazy="true"
        :format="formatTooltip"
      />
    </div>

    <!-- Сброс -->
    <div>
      <button class="filters-panel__reset" @click="resetFilters">
        <span> Сбросить параметры </span>
        <Icon class="arrow-up" name="icon:close" size="16" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filters-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  border-radius: 10px;
  padding: 40px;

  background: linear-gradient(
    135deg,
    rgba(174, 228, 178, 0.3) 0%,
    rgba(149, 208, 161, 0.3) 100%
  );

  &__reset {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      opacity: 0.5;
    }
  }
}

.room-switcher {
  &__buttons {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 16px;
  }

  &__button {
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
}

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
