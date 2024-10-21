<template>
  <main class="flex flex-col items-center">
    <h1 class="text-3xl font-semibold">List of Books</h1>
    <SearchBox class="m-10" v-model="bookSearchString" />
    <BookList :books="allBooks" />
  </main>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import BookList from '@/components/BookList.vue';
  import SearchBox from '@/components/SearchBox.vue';
  import { useFilterBooks } from '@/composables/books';

  // String which filters books by title
  const bookSearchString = ref('');

  // Filter out books based on search string
  const allBooks = computed(() => {
    return useFilterBooks(bookSearchString.value);
  });
</script>
