<script setup lang="ts">
import type { IApartment } from "~/types/Apartments.type"
import type { ITableColumn } from "~/types/Table.type"

const props = defineProps<{
  data: IApartment[];
  columns: ITableColumn[];
}>();

// --- СОРТИРОВКА ---
const sortKey = ref<string | null>(null);
const sortOrder = ref<"asc" | "desc" | null>(null);

function toggleSort(col: ITableColumn) {
  if (!col.sortable) return;
  if (sortKey.value !== col.prop) {
    sortKey.value = col.prop;
    sortOrder.value = "asc";
  } else if (sortOrder.value === "asc") {
    sortOrder.value = "desc";
  } else {
    sortKey.value = null;
    sortOrder.value = null;
  }
}

const sortedRows = computed(() => {
  if (!sortKey.value || !sortOrder.value) return props.data;
  return [...props.data].sort((a, b) => {
    const x = a[sortKey.value!];
    const y = b[sortKey.value!];
    if (x == null) return 1;
    if (y == null) return -1;
    if (x === y) return 0;
    return sortOrder.value === "asc" ? (x > y ? 1 : -1) : x < y ? 1 : -1;
  });
});

// --- ВИДИМЫЕ КОЛОНКИ ---
const displayedColumns = computed<ITableColumn[]>(
  () =>props.columns.filter((col) => col.visible !== false)
);

function getSortClass(col: ITableColumn, order: 'asc' | 'desc') {
  return {
    'sort-active': sortKey.value === col.prop && sortOrder.value === order
  }
}
</script>

<template>
    <table class="table">
      <!-- Заголовки -->
      <thead>
        <tr>
          <th
            v-for="col in displayedColumns"
            :key="col.prop"
            :style="{
              width: col.width || 'auto',
            }"
            @click="toggleSort(col)"
          >
            <div
              class="table__head-col"
              :class="{'is-sorted': sortKey === col.prop}"
            >
              <span class="table__head-col-title"> {{ col.label }}</span>

              <div v-if="col.sortable" class="table__head-col-sort">
                <Icon class="arrow-up" :class="getSortClass(col, 'asc')" name="icon:arrow-up" size="16" />
                <Icon class="arrow-down" :class="getSortClass(col, 'desc')" name="icon:arrow-down" size="16" />
              </div>
            </div>
          </th>
        </tr>
      </thead>

      <!-- Тело -->
      <tbody>
        <tr
          v-for="(row, rowIndex) in sortedRows"
          :key="rowIndex"
          class=""
        >
          <td
            v-for="col in displayedColumns"
            :key="col.prop"
          >
            <slot
              :name="col.prop"
              :row="row"
              :value="(row as unknown as Record<string, unknown>)[col.prop]"
              :column="col"
            >
              {{ (row as unknown as Record<string, unknown>)[col.prop] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;

  thead {
    th {
      padding: 0 0 17px 20px;
      padding-left: 20px;
      border-bottom: 1px solid $color-black-light;
    
      &:first-child {
        padding-left: 0;
      }
    }
  }

  tbody {
    td {
      padding: 16px 0 25px 20px;
      border-bottom: 1px solid $color-black-light;
      vertical-align: top;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;

      &:first-child {
        padding-left: 0;
      }
    }
  }

  &__head-col {
    display: flex;
    align-items: center;
  
  }

  &__head-col-title {
    color: $color-black;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    .is-sorted & {
      color: $color-green;
    }
  }

  &__head-col-sort {
    margin-left: 8px;
    color: $color-black;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0.4;

    .arrow-up {
      margin-bottom: -5px;
    }
    .arrow-down {
      margin-top: -5px;
    }

    .arrow-up.sort-active,
    .arrow-down.sort-active {
      color: $color-green;
    }
  }
}
</style>