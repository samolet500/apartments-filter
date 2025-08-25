<script setup lang="ts">
import Slider from "@vueform/slider";

const DEFAULT_PRICE: [number, number] = [2000000, 10000000];
const DEFAULT_SQUARE: [number, number] = [30, 80];
const DEFAULT_ROOMS: number[] = [1, 2, 3, 4];

const props = defineProps<{
  valuePrice: [number, number];
  valueSquare: [number, number];
  valueRooms: number[];
}>();

const emit = defineEmits<{
  (e: "update:filter", key: string, value: any): void;
}>();

const roomOptions = [1, 2, 3, 4];

// переключение комнаты
function toggleRoom(room: number) {
  const newRooms = [...props.valueRooms];
  const index = newRooms.indexOf(room);
  if (index > -1) newRooms.splice(index, 1);
  else newRooms.push(room);
  emit("update:filter", "rooms", newRooms);
}

// слежение за слайдерами — сразу отправляем изменения вверх
function updatePrice(value: [number, number]) {
  emit("update:filter", "price", value);
}
function updateSquare(value: [number, number]) {
  emit("update:filter", "square", value);
}

// сброс фильтров
function resetFilters() {
  emit("update:filter", "price", DEFAULT_PRICE);
  emit("update:filter", "square", DEFAULT_SQUARE);
  emit("update:filter", "rooms", DEFAULT_ROOMS);
}
</script>

<template>
  <div class="p-4 bg-gray-50 rounded-xl shadow mb-6">
    <h3 class="text-lg font-semibold mb-4">Фильтры</h3>
    <div class="grid gap-6 md:grid-cols-2">
      <!-- Слайдер цены -->
      <div class="flex flex-col gap-2">
        <label class="font-medium text-gray-700">
          Цена:
          <span class="text-blue-600"
            >{{ props.valuePrice[0].toLocaleString() }} –
            {{ props.valuePrice[1].toLocaleString() }} ₽</span
          >
        </label>
        <Slider
          :model-value="props.valuePrice"
          @update:model-value="updatePrice"
          :min="DEFAULT_PRICE[0]"
          :max="DEFAULT_PRICE[1]"
          :step="100000"
          :lazy="true"
          :tooltip="'none'"
        />
      </div>

      <!-- Слайдер площади -->
      <div class="flex flex-col gap-2">
        <label class="font-medium text-gray-700">
          Площадь:
          <span class="text-blue-600"
            >{{ props.valueSquare[0] }} – {{ props.valueSquare[1] }} м²</span
          >
        </label>
        <Slider
          :model-value="props.valueSquare"
          @update:model-value="updateSquare"
          :min="DEFAULT_SQUARE[0]"
          :max="DEFAULT_SQUARE[1]"
          :step="1"
          :lazy="true"
          :tooltip="'none'"
        />
      </div>

      <!-- Кнопки комнат -->
      <div class="md:col-span-2">
        <label class="font-medium text-gray-700 mb-2">Комнаты:</label>
        <div class="flex gap-2 mb-2">
          <button
            v-for="option in roomOptions"
            :key="option"
            @click="toggleRoom(option)"
            :class="[
              'px-3 py-1 rounded-lg border cursor-pointer',
              props.valueRooms.includes(option)
                ? 'bg-blue-600 text-white border-blue-600 selected'
                : 'bg-white text-gray-700 border-gray-300',
            ]"
          >
            {{ option }}к
          </button>
        </div>

        <!-- Кнопка сброса -->
        <button
          @click="resetFilters"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Сбросить фильтры
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button.selected {
  font-weight: bold;
  box-shadow: 0 0 5px rgba(0, 0, 255, 0.5);
  transition: all 0.2s;
}
button:hover {
  opacity: 0.8;
}
</style>
