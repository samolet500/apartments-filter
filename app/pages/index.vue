<script setup lang="ts">
// колонки таблицы
const columns = ref([
  { label: "ID", prop: "id", width: "80px", align: "center", visible: false },
  { label: "Планировка", prop: "image", width: "120px" },
  { label: "Квартира", prop: "apartment", align: "left" },
  {
    label: "S, м²",
    prop: "square",
    width: "120px",
    align: "left",
    sortable: true,
  },
  {
    label: "Этаж",
    prop: "floor",
    width: "120px",
    align: "left",
    sortable: true,
  },
  {
    label: "Цена",
    prop: "price",
    width: "120px",
    align: "left",
    sortable: true,
  },
  { label: "Комнаты", prop: "rooms", width: "100px", align: "center" },
]);

// данные
const allData = ref<any[]>([]);
const filteredData = ref<any[]>([]);
const displayedData = ref<any[]>([]);
const itemsPerPage = ref(5);
const currentPage = ref(1);
const hasMore = ref(true);

// фильтры
const filterPrice = ref<[number, number]>([2000000, 10000000]);
const filterSquare = ref<[number, number]>([30, 80]);
const filterRooms = ref<number[]>([1, 2, 3, 4]);

// загрузка JSON
onMounted(async () => {
  const res = await fetch("/apartments.json");
  allData.value = await res.json();

  // формируем поле apartment из rooms
  allData.value = allData.value.map((item) => ({
    ...item,
    apartment: `${item.rooms}-комнатная №${item.apartment}`,
  }));

  // загружаем фильтры из localStorage
  const savedFilters = localStorage.getItem("apartmentsFilters");
  if (savedFilters) {
    const { price, square, rooms } = JSON.parse(savedFilters);
    filterPrice.value = price;
    filterSquare.value = square;
    filterRooms.value = rooms;
  }

  applyFilters();
});

// функция фильтрации
function applyFilters() {
  filteredData.value = allData.value.filter((item) => {
    const priceOk =
      item.price >= filterPrice.value[0] && item.price <= filterPrice.value[1];
    const squareOk =
      item.square >= filterSquare.value[0] &&
      item.square <= filterSquare.value[1];
    const roomsOk = filterRooms.value.includes(item.rooms);
    return priceOk && squareOk && roomsOk;
  });

  const displayedCount = currentPage.value * itemsPerPage.value;
  displayedData.value = filteredData.value.slice(0, displayedCount);
  hasMore.value = displayedData.value.length < filteredData.value.length;
}

// обработка изменения фильтров
function updateFilter(key: string, value: any) {
  if (key === "price") filterPrice.value = value;
  if (key === "square") filterSquare.value = value;
  if (key === "rooms") filterRooms.value = value;

  // сохраняем в localStorage
  localStorage.setItem(
    "apartmentsFilters",
    JSON.stringify({
      price: filterPrice.value,
      square: filterSquare.value,
      rooms: filterRooms.value,
    })
  );

  applyFilters();
}

// подгрузка ещё
function loadMore() {
  currentPage.value += 1;
  const displayedCount = currentPage.value * itemsPerPage.value;
  displayedData.value = filteredData.value.slice(0, displayedCount);
  hasMore.value = displayedData.value.length < filteredData.value.length;
}
</script>

<template>
  <PageSection>
    <div class="apartments">
      <h1 class="apartments__title">Квартиры</h1>

      <div class="apartments__content">
        <!-- Таблица -->
        <div class="apartments__table">
          <UiTable :data="displayedData" :columns="columns">
            <template #image="{ value }">
              <NuxtImg :src="value" />
            </template>
          </UiTable>

          <!-- кнопка "Загрузить ещё" -->
          <div v-if="hasMore" class="flex justify-center mt-4">
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              @click="loadMore"
            >
              Загрузить ещё
            </button>
          </div>

          <div class="text-center text-gray-500 mt-2">
            Показано {{ displayedData.length }} из {{ allData.length }}
          </div>
        </div>

        <!-- Фильтр -->
        <div class="apartments__filter">
          <!-- Панель фильтров -->
          <!-- Фильтры -->
          <FiltersPanel
            :valuePrice="filterPrice"
            :valueSquare="filterSquare"
            :valueRooms="filterRooms"
            @update:filter="updateFilter"
          />
        </div>
      </div>
    </div>
  </PageSection>
</template>

<style lang="scss" scoped>
.apartments {
  &__title {
    margin: 0;
    font-weight: 700;
    font-size: 54px;
    line-height: 55px;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 80px;
    margin-top: 48px;
  }

  &__table {
    width: 100%;
  }

  &__filter {
    flex: 0 0 auto;
    width: 400px;
    height: 200px;
    background: linear-gradient(
      135deg,
      rgba(174, 228, 178, 0.3) 0%,
      rgba(149, 208, 161, 0.3) 100%
    );
  }
}
</style>
