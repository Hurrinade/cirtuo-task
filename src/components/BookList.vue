<template>
  <div class="card">
    <DataView :value="books">
      <template #list="slotProps">
        <div class="flex flex-col">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <div
              class="flex flex-col sm:flex-row sm:items-center p-6 gap-20"
              :class="{
                'border-t border-surface-200 dark:border-surface-700':
                  index !== 0,
              }"
            >
              <div class="md:w-40 relative">
                <img
                  class="w-32 object-cover block xl:block mx-auto rounded w-full"
                  :src="`/src/assets/images/${item.cover_image}`"
                  :alt="item.name"
                />
              </div>
              <div
                class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-20"
              >
                <div
                  class="flex flex-row md:flex-col justify-between items-start gap-2"
                >
                  <div>
                    <span
                      class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                      >{{ item.author }}</span
                    >
                    <div class="text-lg font-medium mt-2">{{ item.title }}</div>
                  </div>
                </div>
                <div class="flex flex-col md:items-end gap-8">
                  <div class="flex flex-row-reverse md:flex-row gap-2">
                    <Button
                      icon="pi pi-shopping-cart"
                      label="Details"
                      class="flex-auto md:flex-initial whitespace-nowrap"
                      @click="selectedBook = item"
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
  <Teleport to="body">
    <BookDetails />
  </Teleport>
</template>

<script setup>
  import BookDetails from '@/components/BookDetails.vue';
  import { useBookStore } from '@/stores/book';
  import { storeToRefs } from 'pinia';

  defineProps(['books']);
  const bookStore = useBookStore();

  // Get reactive variables from store
  const { selectedBook } = storeToRefs(bookStore);
</script>
