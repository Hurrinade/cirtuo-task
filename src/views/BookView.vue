<template>
  <main class="flex flex-col items-center">
    <h1 class="text-3xl font-semibold">List of Books</h1>
    <SearchBox class="m-10" v-model="bookSearchString" />
    <BookList :books="allBooks" />
  </main>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useBookStore } from '@/stores/book';
  import { storeToRefs } from 'pinia';
  import BookList from '@/components/BookList.vue';
  import SearchBox from '@/components/SearchBox.vue';

  const bookStore = useBookStore();

  // Get reactive variables from store
  const { books } = storeToRefs(bookStore);

  // String which filters books by title
  const bookSearchString = ref('');

  // Filter out books based on search string
  const allBooks = computed(() => {
    return books.value.filter((book) => {
      const ss = bookSearchString.value.toLowerCase();
      const title = book.title.toLowerCase();
      const author = book.author.toLowerCase();
      if (title.includes(ss) || author.includes(ss)) {
        return book;
      }
    });
  });
</script>
