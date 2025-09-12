<script setup lang="ts">
import { useApartmentsStore } from "~/stores/apartments.store";

const store = useApartmentsStore();

onMounted(async () => {
  await store.loadApartments();
});
</script>

<template>
  <PageSection>
    <ClientOnly>
      <div class="apartments">
        <h1 class="apartments__title">Квартиры</h1>

        <!-- 🔹 Skeleton пока данные грузятся -->
        <div v-if="!store.isLoaded" class="apartments__skeleton">
          <!-- Таблица -->
          <div class="apartments__table">
            <div v-for="i in 5" :key="'row-' + i" class="skeleton-row">
              <div
                v-for="j in 5"
                :key="'cell-' + i + '-' + j"
                class="skeleton-cell"
              />
            </div>
          </div>

          <!-- Фильтр -->
          <div class="apartments__filter">
            <div v-for="i in 3" :key="'filter-' + i" class="skeleton-filter" />
          </div>
        </div>

        <!-- 🔹 Основной контент -->
        <div v-else class="apartments__content">
          <!-- Таблица -->
          <div class="apartments__table">
            <UiTable :data="store.displayedData" :columns="store.columns">
              <template #image="{ value }">
                <NuxtImg
                  v-if="typeof value === 'string' && value"
                  class="apartments__table-image"
                  :src="value as string"
                />
              </template>

              <template #apartment="{ value }">
                <div v-html="value" />
              </template>

              <template #floor="{ value }">
                <div v-html="value" />
              </template>
            </UiTable>

            <!-- Загрузить ещё -->
            <div v-if="store.hasMore" class="apartments__table-footer">
              <UiButton @click="store.loadMore">Загрузить ещё</UiButton>
              <!-- <button class="" @click="store.loadMore">Загрузить ещё</button> -->
            </div>
          </div>

          <!-- Фильтр -->
          <div class="apartments__filter">
            <FiltersPanel />
          </div>
        </div>
      </div>
    </ClientOnly>
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

  &__content,
  &__skeleton {
    display: flex;
    justify-content: space-between;
    gap: 80px;
    margin-top: 48px;
  }

  &__table {
    width: 100%;
  }

  &__table-image {
    width: 100%;
    padding: 0 10px;
  }

  &__table-footer {
    margin-top: 48px;
  }

  &__filter {
    flex: 0 0 auto;
    width: 400px;
    // height: 200px;
  }
}

/* 🔹 Skeleton */
.skeleton-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.skeleton-cell {
  flex: 1;
  height: 40px;
  border-radius: 6px;
  background: #e0e0e0;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-filter {
  margin-top: 20px;
  height: 40px;
  border-radius: 6px;
  background: #e0e0e0;
  animation: pulse 1.5s infinite ease-in-out;
}

.apartments__skeleton .apartments__filter {
  background: #c6c6c6;
  padding: 40px;
  border-radius: 10px;
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
</style>
