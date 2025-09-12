import { defineStore } from 'pinia'
import type { IApartment } from '~/types/Apartments.type'
import type { ITableColumn } from "~/types/Table.type"
const { price } = useFormat()

export const useApartmentsStore = defineStore('apartments', () => {
  // 🔹 данные
  const allData = ref<IApartment[]>([])
  const filteredData = ref<IApartment[]>([])
  const displayedData = ref<IApartment[]>([])
  const columns = ref<ITableColumn[]>([])

  // 🔹 фильтры (значения пользователя)
  const filterPrice = ref<[number, number]>([2000000, 10000000])
  const filterSquare = ref<[number, number]>([20, 100])
  const filterRooms = ref<number[]>([1, 2, 3, 4])

  // 🔹 дефолтные значения (будут вычислены после загрузки)
  const defaultFilterPrice = ref<[number, number]>([2000000, 10000000])
  const defaultFilterSquare = ref<[number, number]>([20, 100])
  const defaultFilterRooms = ref<number[]>([1, 2, 3, 4])

  // 🔹 пагинация
  const pageSize: number = 5
  const currentPage = ref<number>(1)
  const hasMore = ref<boolean>(false)

  // 🔹 статус загрузки
  const isLoaded = ref(false)

  async function loadApartments() {
    // Имитация задержки в 2 секунды, чтобы показать загрузку
    await new Promise(resolve => setTimeout(resolve, 2000));

    const data = await $fetch<IApartment[]>("/apartments.json")
    const adapterData = adapterApartmentData(data)

    setAllData(adapterData)
    setDefaultFilters(adapterData) // <- вычисляем дефолты
    isLoaded.value = true
  }

  function adapterApartmentData(data: IApartment[]): IApartment[] {
    return [...data.map(apartmentItem => ({
      ...apartmentItem,
      apartment: `<span class="text-bold">${apartmentItem.rooms}-комнатная №${apartmentItem.apartment}</span>`,
      floor: `${apartmentItem.floor} <span class="text-thin"> из ${apartmentItem.floorTotal}</span>`,
      priceFormatted: price(apartmentItem.price)
    }))]
  }

  function setAllData(data: IApartment[]) {
    allData.value = data
    columns.value = [
      { label: 'ID', prop: 'id', visible: false },
      { label: 'Планировка', prop: 'image', width: '80px' },
      { label: 'Квартира', prop: 'apartment', align: 'left' },
      { label: 'S, м²', prop: 'square', width: '120px', align: 'left', sortable: true },
      { label: 'Этаж', prop: 'floor', width: '120px', align: 'left', sortable: true },
      { label: 'Цена, ₽', prop: 'price', width: '120px', align: 'left', sortable: true, visible: false },
      { label: 'Цена, ₽', prop: 'priceFormatted', width: '120px', align: 'left', sortable: true },
      { label: 'Комнаты', prop: 'rooms', width: '120px', align: 'left', visible: false }
    ]
    applyFilters()
  }

  function setDefaultFilters(data: IApartment[]) {
    if (!data.length) return

    // Цена
    const prices = data.map(a => a.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)

    // Площадь
    const squares = data.map(a => a.square)
    const minSquare = Math.min(...squares)
    const maxSquare = Math.max(...squares)

    // Комнаты
    const rooms = Array.from(new Set(data.map(a => a.rooms))).sort()

    // сохраняем дефолтные значения
    defaultFilterPrice.value = [minPrice, maxPrice]
    defaultFilterSquare.value = [minSquare, maxSquare]
    defaultFilterRooms.value = rooms

    // // применяем дефолты и в рабочие фильтры
    // filterPrice.value = [minPrice, maxPrice]
    // filterSquare.value = [minSquare, maxSquare]
    // filterRooms.value = rooms
    // ⚡ рабочие фильтры НЕ трогаем, если они уже восстановлены из localStorage
    if (!filterPrice.value || filterPrice.value[0] === 2000000) {
      filterPrice.value = [minPrice, maxPrice]
    }
    if (!filterSquare.value || filterSquare.value[0] === 20) {
      filterSquare.value = [minSquare, maxSquare]
    }
    if (!filterRooms.value || filterRooms.value.length === 4) {
      filterRooms.value = rooms
    }
  }

  function applyFilters() {
    filteredData.value = allData.value.filter(item => {
      const okPrice = item.price >= filterPrice.value[0] && item.price <= filterPrice.value[1]
      const okSquare = item.square >= filterSquare.value[0] && item.square <= filterSquare.value[1]
      const okRooms = filterRooms.value.includes(item.rooms)
      return okPrice && okSquare && okRooms
    })
    currentPage.value = 1
    updateDisplayedData()
  }

  function updateDisplayedData() {
    const start = 0
    const end = currentPage.value * pageSize
    displayedData.value = filteredData.value.slice(start, end)
    hasMore.value = end < filteredData.value.length
  }

  function loadMore() {
    currentPage.value++
    updateDisplayedData()
  }

  function resetFilters() {
    filterPrice.value = [...defaultFilterPrice.value]
    filterSquare.value = [...defaultFilterSquare.value]
    filterRooms.value = [...defaultFilterRooms.value]
    currentPage.value = 1
    // applyFilters()
    localStorage.removeItem('apartments')
  }

    // 🔹 Watcher Фильтров
  watch([filterPrice, filterSquare, filterRooms], () => {
    applyFilters()
  }, { deep: true })

  return {
    // state
    allData, filteredData, displayedData, columns,
    filterPrice, filterSquare, filterRooms,
    defaultFilterPrice, defaultFilterSquare, defaultFilterRooms,
    currentPage, hasMore, isLoaded,
    // actions
    setAllData, applyFilters, updateDisplayedData,
    loadMore, resetFilters, loadApartments
  }
}, {
  persist: {
    pick: [
      'filterPrice',
      'filterSquare',
      'filterRooms',
      'currentPage'
    ]
  }
})
