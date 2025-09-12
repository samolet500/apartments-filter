<script setup lang="ts">
import { useApartmentsStore } from "~/stores/apartments.store";

const store = useApartmentsStore();
const rooms = computed(() => store.defaultFilterRooms);

const isRoomSelected = (room: number) => store.filterRooms.includes(room);

// 🔹 переключение комнат
const toggleRoom = (room: number) => {
  store.filterRooms = isRoomSelected(room)
    ? store.filterRooms.filter((r) => r !== room)
    : [...store.filterRooms, room];
};

// 🔹 сброс фильтров
const resetFilters = () => store.resetFilters();
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
    <UiRangeSlider
      v-model="store.filterPrice"
      label="Стоимость квартиры, ₽"
      :min="store.defaultFilterPrice[0]"
      :max="store.defaultFilterPrice[1]"
      :step="100000"
      :merge="3000000"
    />

    <!-- Площадь -->
    <UiRangeSlider
      v-model="store.filterSquare"
      label="Площадь, м²"
      :min="store.defaultFilterSquare[0]"
      :max="store.defaultFilterSquare[1]"
      :step="1"
      :merge="20"
    />

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
</style>
