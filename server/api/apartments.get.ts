export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = Number(query.page || 1)
  const pageSize = Number(query.pageSize || 5)

  // Фейковые данные квартир
  const allData = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    image: `plan.png`,
    apartment: `Квартира №${i + 1}`,
    square: (35 + i % 15).toFixed(1),
    floor: (i % 25) + 1,
    price: `${(3_500_000 + i * 100_000).toLocaleString("ru-RU")} ₽`
  }))

  const start = (page - 1) * pageSize
  const end = start + pageSize
  const items = allData.slice(start, end)

  return {
    items,
    total: allData.length
  }
})
