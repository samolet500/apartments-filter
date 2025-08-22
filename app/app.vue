<script setup lang="ts">
import type { IColumn } from "./types/Table";

const tableData = ref<any[]>([]);
const page = ref(1);
const pageSize = 5;
const total = ref(0);

const columns = [
  { label: "ID", prop: "id", width: "80px", align: "center", visible: true },
  { label: "Планировка", prop: "image", width: "120px", align: "center" },
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
];

async function loadMore() {
  const response = await $fetch("/api/apartments", {
    query: { page: page.value, pageSize },
  });

  tableData.value.push(...response.items);
  total.value = response.total;
  page.value++;
}

// Загружаем первую порцию
await loadMore();
</script>

<template>
  <PageSection>
    <div class="apartments">
      <h1 class="apartments__title">Квартиры</h1>

      <div class="apartments__content">
        <!-- Таблица -->
        <div class="apartments__table">
          <UiTable :columns="columns" :data="tableData">
            <template #image="{ value }">
              <NuxtImg :src="value" />
            </template>

            <!-- <template #col-actions="{ row }">
              <button @click="removeUser(row)">Удалить</button>
            </template> -->
          </UiTable>

          <!-- Кнопка "Загрузить ещё" -->
          <div v-if="tableData.length < total" class="flex justify-center mt-4">
            <button
              class="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              @click="loadMore"
            >
              Загрузить ещё
            </button>
          </div>
        </div>

        <!-- Фильтр -->
        <div class="apartments__filter"></div>
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
