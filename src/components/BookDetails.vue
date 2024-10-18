<template>
  <div
    v-if="selectedBook"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <Card style="width: 35rem; overflow: hidden">
      <template #header>
        <div class="flex items-center justify-center">
          <img
            class="w-32"
            alt="book image"
            :src="'/src/assets/images/' + selectedBook.cover_image"
          />
        </div>
      </template>
      <template #title>{{ selectedBook.title }}</template>
      <template #subtitle>{{ selectedBook.author }}</template>
      <template #content>
        <p class="m-0">
          {{ selectedBook.description }}
        </p>
      </template>
      <template #footer>
        <div class="flex gap-4 mt-1">
          <Button
            @click="selectedBook = null"
            label="Close"
            severity="secondary"
            outlined
            class="w-full"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
  import { useBookStore } from '@/stores/book';
  import { storeToRefs } from 'pinia';

  defineProps(['books']);
  const bookStore = useBookStore();

  // Get reactive variables from store
  const { selectedBook } = storeToRefs(bookStore);
</script>
