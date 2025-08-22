<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  data: Record<string, any>[];
  columns: {
    prop: string;
    label: string;
    width?: string;
    sortable?: boolean;
    visible?: boolean;
    align?: "left" | "center" | "right";
  }[];
}>();

// --- СОРТИРОВКА ---
const sortKey = ref<string | null>(null);
const sortOrder = ref<"asc" | "desc" | null>(null);

function toggleSort(col: any) {
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
const displayedColumns = computed(() =>
  props.columns.filter((col) => col.visible !== false)
);
</script>

<template>
  <div class="overflow-x-auto border rounded-2xl shadow-sm">
    <table class="min-w-full border-collapse text-sm">
      <!-- Заголовки -->
      <thead class="bg-gray-100">
        <tr>
          <th
            v-for="col in displayedColumns"
            :key="col.prop"
            :style="{
              width: col.width || 'auto',
              textAlign: col.align || 'left',
            }"
            class="px-4 py-2 font-medium text-gray-700 border-b select-none cursor-pointer"
            @click="toggleSort(col)"
          >
            <div
              class="flex items-center gap-1"
              :class="{
                'justify-center': col.align === 'center',
                'justify-end': col.align === 'right',
              }"
            >
              {{ col.label }}
              <span v-if="col.sortable" class="text-xs">
                <span v-if="sortKey === col.prop && sortOrder === 'asc'"
                  >⬆️</span
                >
                <span v-else-if="sortKey === col.prop && sortOrder === 'desc'"
                  >⬇️</span
                >
                <span v-else class="text-gray-400">↕️</span>
              </span>
            </div>
          </th>
        </tr>
      </thead>

      <!-- Тело -->
      <tbody>
        <tr
          v-for="(row, rowIndex) in sortedRows"
          :key="rowIndex"
          class="hover:bg-gray-50 odd:bg-white even:bg-gray-50"
        >
          <td
            v-for="col in displayedColumns"
            :key="col.prop"
            :style="{ textAlign: col.align || 'left' }"
            class="px-4 py-2 border-b"
          >
            <slot
              :name="col.prop"
              :row="row"
              :value="row[col.prop]"
              :column="col"
            >
              {{ row[col.prop] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
