<template>
  <section class="page-section">
    <slot />
  </section>
</template>

<style lang="scss" scoped>
.page-section {
  width: 100%;
  max-width: $section-size-dt;
  margin: 0 auto;
  padding: 96px 80px;
}
</style>
