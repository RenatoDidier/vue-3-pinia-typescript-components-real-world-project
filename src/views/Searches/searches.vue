<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNotify } from '@/utils/toast-helper'
import router from '@/router'
import type { MenuItem } from 'primevue/menuitem'

import { fetchSearchesAsync, deleteSearchByIdAsync } from '@/services/search-service'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import DropdownButton from '@/components/Atoms/Buttons/dropdown-button.vue'
import LinkButton from '@/components/Atoms/Buttons/link-button.vue'

interface Category {
  description: string
}
interface Search {
  searchId: string
  title: string
  image: string
  description: string
  category: Category
}

function toSearches(val: unknown): Search[] {
  if (Array.isArray(val)) return val as Search[]
  return []
}

const search = ref<Search[]>([])
const notify = useNotify()

let idElementSelected: string = ''

const dropdownActions: MenuItem[] = [
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    command: () => {
      router.push({
        name: 'search-edit',
        params: { searchId: idElementSelected },
      })
    },
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: async () => {
      const { callback } = deleteSearchByIdAsync(idElementSelected)

      await callback()

      notify.success('Search deleted successfully')
      fetchSearches()
    },
  },
]

function handleSearchAction(search: Search) {
  idElementSelected = search.searchId!
}

async function fetchSearches() {
  const { callback, data } = fetchSearchesAsync()

  await callback()
  search.value = toSearches(data.value)
}

onMounted(async () => {
  try {
    // fetchSearches()
  } catch {
    notify.error('Unable to load your searches')
  }
})
</script>

<template>
  <div class="container-card">
    <section class="flex justify-content-between">
      <h2>Searches</h2>
      <div>
        <LinkButton
          to="/search/admin"
          label="Create Search"
          color-button="contrast"
          icon="pi pi-plus"
          target="_self"
        />
      </div>
    </section>
    <hr />

    <DataTable :value="search">
      <Column field="title" header="Title" />
      <Column field="category.description" header="Category" />

      <Column header="Action">
        <template #body="slotProps">
          <div class="action__button">
            <DropdownButton
              :items="dropdownActions"
              variant="text"
              aria-label="Actions"
              @click="handleSearchAction(slotProps.data as Search)"
            >
              <i class="pi pi-ellipsis-v" />
            </DropdownButton>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style lang="scss" scoped>
.action__button {
  display: flex;
  justify-content: center;
}
</style>
