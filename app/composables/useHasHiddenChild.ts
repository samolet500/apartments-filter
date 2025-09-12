// composables/useHasHiddenChild.ts
export function useHasHiddenChild(parentRef: Ref<HTMLElement | null>) {
  const hasHiddenChild = ref(false)
  let observer: MutationObserver | null = null

  const check = () => {
    const el = parentRef.value
    hasHiddenChild.value = !!el?.querySelector(".slider-tooltip-hidden")
  }

  onMounted(() => {
    check()
    if (!parentRef.value) return

    observer = new MutationObserver(check)
    observer.observe(parentRef.value, {
      attributes: true,
      childList: true,
      subtree: true,
    })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { hasHiddenChild }
}
