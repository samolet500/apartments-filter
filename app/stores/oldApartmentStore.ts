// import { defineStore } from 'pinia'
// import type { IApartment } from '~/types/Apartments.type'
// import type { ITableColumn } from "~/types/Table.type"
// const { price } = useFormat()

// export const useApartmentsStore = defineStore('apartments', () => {
//   const isLoaded = ref(false)

//   // 🔹 данные
//   const allData = ref<IApartment[]>([])
//   const filteredData = ref<IApartment[]>([])
//   const displayedData = ref<IApartment[]>([])
//   const columns = ref<ITableColumn[]>([])

// // 🔹 фильтры (значения пользователя)
//   const filterPrice = ref<[number, number]>([2000000, 10000000])
//   const filterSquare = ref<[number, number]>([20, 100])
//   const filterRooms = ref<number[]>([1, 2, 3, 4])

//   // 🔹 дефолтные значения (будут вычислены после загрузки)
//   const defaultFilterPrice = ref<[number, number]>([2000000, 10000000])
//   const defaultFilterSquare = ref<[number, number]>([20, 100])
//   const defaultFilterRooms = ref<number[]>([1, 2, 3, 4])

//   // 🔹 пагинация
//   const pageSize: number = 5
//   const currentPage = ref<number>(1)
//   const hasMore = ref<boolean>(false)


//   async function loadApartments() {
//     // Имитация задержки в 2 секунды
//     await new Promise(resolve => setTimeout(resolve, 3000));

//     const data = await $fetch<IApartment[]>("/apartments.json");
//     const adapterData = adapterApartmentData(data)

//     setAllData(adapterData)  
//     isLoaded.value = true
//   }

//   function adapterApartmentData(data: IApartment[]): IApartment[] {
//     return [...data.map(apartmentItem => ({
//       ...apartmentItem,
//       apartment: `<span class="text-bold">${apartmentItem.rooms}-комнатная №${apartmentItem.apartment}</span>`,
//       floor: `${apartmentItem.floor} <span class="text-thin"> из ${apartmentItem.floorTotal}</span>`,
//       priceFormatted: price(apartmentItem.price)
//     }))]
//   }

//   // ------------------
//   function setAllData(data: IApartment[]) {
//     allData.value = data

//     if (data.length > 0) {
//       const prices = data.map(item => item.price)
//       const squares = data.map(item => item.square)
//       const rooms = Array.from(new Set(data.map(item => item.rooms))).sort((a,b)=>a-b)

//       // сохраняем как “по умолчанию”
//       defaultFilterPrice.value = [Math.min(...prices), Math.max(...prices)]
//       defaultFilterSquare.value = [Math.min(...squares), Math.max(...squares)]
//       defaultFilterRooms.value = rooms

//       // применяем текущие фильтры
//       filterPrice.value = [...defaultFilterPrice.value]
//       filterSquare.value = [...defaultFilterSquare.value]
//       filterRooms.value = [...defaultFilterRooms.value]
//     }

//     columns.value = [
//       { label: 'ID', prop: 'id', visible: true },
//       { label: 'Планировка', prop: 'image', width: '80px' },
//       { label: 'Квартира', prop: 'apartment', align: 'left' },
//       { label: 'S, м²', prop: 'square', width: '120px', align: 'left', sortable: true },
//       { label: 'Этаж', prop: 'floor', width: '120px', align: 'left', sortable: true },
//       { label: 'Цена, ₽', prop: 'price', width: '120px', align: 'left', sortable: true, visible: false },
//       { label: 'Цена, ₽', prop: 'priceFormatted', width: '120px', align: 'left', sortable: true },
//       { label: 'Комнаты', prop: 'rooms', width: '120px', align: 'left', visible: false }
//     ]
//     // applyFilters()
//   }

//   function applyFilters() {
//     filteredData.value = allData.value.filter(item => {
//       const okPrice = item.price >= filterPrice.value[0] && item.price <= filterPrice.value[1]
//       const okSquare = item.square >= filterSquare.value[0] && item.square <= filterSquare.value[1]
//       const okRooms = filterRooms.value.includes(item.rooms)
//       return okPrice && okSquare && okRooms
//     })
//     currentPage.value = 1
//     updateDisplayedData()
//   }

//   function updateDisplayedData() {
//     const start = 0
//     const end = currentPage.value * pageSize
//     displayedData.value = filteredData.value.slice(start, end)
//     hasMore.value = end < filteredData.value.length
//   }

//   function loadMore() {
//     currentPage.value++
//     updateDisplayedData()
//   }

//   function resetFilters() {
//     filterPrice.value = [2000000, 10000000]
//     filterSquare.value = [30, 80]
//     filterRooms.value = [1, 2, 3, 4]
//     currentPage.value = 1
//     localStorage.removeItem('apartments')
//   }

//   // 🔹 Watcher Фильтров
//   watch([filterPrice, filterSquare, filterRooms], () => {
//     applyFilters()
//   }, { deep: true })

//   return {
//     // state
//     isLoaded, allData, filteredData, displayedData, columns,
//     filterPrice, filterSquare, filterRooms,
//     currentPage, hasMore,
//     // actions
//     setAllData, applyFilters, updateDisplayedData,
//     loadMore, resetFilters, loadApartments
//   }
// }, {
//   //persist: true
// })


