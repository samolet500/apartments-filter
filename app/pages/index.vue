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
          <UiSkeletonTable />
          <UiSkeletonFilter class="apartments__skeleton-filter" />
        </div>

        <!-- 🔹 Основной контент -->
        <div v-else class="apartments__content">
          <!-- Таблица -->
          <div class="apartments__table-wrapper">
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

<style lang="scss">
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

    @media (max-width: 1280px) {
      gap: 28px;
    }
  }

  &__table-wrapper {
    width: 100%;
  }

  &__table-image {
    width: 100%;
    padding: 0 10px;
  }

  &__table-footer {
    margin-top: 48px;
  }

  &__filter,
  &__skeleton-filter {
    flex: 0 0 auto;
    width: 400px;

    @media (max-width: 1280px) {
      width: 318px;
      margin-top: -100px;
    }
  }

  @media (max-width: 1280px) {
    table {
      display: block;
      width: 100%;
    }

    thead {
      display: block;
      width: 100%;
    }

    thead tr {
      display: flex;
      align-items: center;
      padding: 8px 0;
    }

    #th-image,
    #th-apartment {
      display: none;
    }

    #th-square,
    #th-floor,
    #th-priceFormatted {
      padding: 0;
      border: none;
    }

    tbody {
      display: block;
      width: 100%;
    }

    tbody tr {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-areas:
        "apartment apartment apartment image" /* Квартира | Планировка */
        "square floor priceFormatted image"; /* Площадь | Этаж | Цена */
      gap: 8px;
      padding: 16px 24px;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      margin-bottom: 12px;
    }

    // td[data-label="apartment"] {
    #apartment {
      grid-area: apartment;
      padding: 0;
      border-bottom: none;
    }

    #image {
      grid-area: image;
      padding: 0;
      border-bottom: none;
    }

    #square {
      grid-area: square;
      padding: 0;
      border-bottom: none;
    }

    #floor {
      grid-area: floor;
      padding: 0;
      border-bottom: none;
    }

    #priceFormatted {
      grid-area: priceFormatted;
      padding: 0;
      border-bottom: none;
    }
  }
}
</style>
