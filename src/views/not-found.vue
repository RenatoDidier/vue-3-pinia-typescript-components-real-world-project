<script setup lang="ts">
import { computed } from 'vue'

import LinkButton from '@/components/Atoms/Buttons/link-button.vue'

interface Props {
  title?: string
  description?: string
  homeTo?: string
  showBack?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '404 — Page Not Found',
  homeTo: '/',
  showBack: true,
})

const canGoBack = computed(() => window.history.length > 1)
</script>

<template>
  <section class="nf">
    <div class="nf__card" role="group" aria-labelledby="nf-title">
      <div class="nf__code" aria-hidden="true">404</div>
      <h1 id="nf-title" class="nf__title">{{ props.title }}</h1>
      <div>
        <LinkButton
          v-if="props.showBack && canGoBack"
          :to="props.homeTo"
          label="Return to Home"
          color-button="primary"
          icon="pi pi-arrow-left"
          target="_self"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.nf {
  min-height: calc(30vh);
  display: grid;
  place-items: center;
  padding: 1rem;

  .nf__card {
    max-width: 640px;
    width: 100%;
    background: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 14px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);

    .nf__code {
      font-size: 3rem;
      font-weight: 800;
      letter-spacing: 2px;
      color: var(--p-zinc-500);
      margin-bottom: 0.5rem;
    }

    .nf__title {
      color: var(--p-zinc-400);
      font-size: 1.5rem;
      margin: 0.25rem 0 0.75rem;
    }
  }
}
</style>
