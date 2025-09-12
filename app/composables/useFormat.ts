export function useFormat() {
  function price(value: number): string {
    return new Intl.NumberFormat("ru-RU").format(value)
  }

  return { price }
}
