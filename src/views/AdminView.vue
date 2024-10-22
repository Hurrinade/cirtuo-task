<template>
  <main class="flex flex-col items-center">
    <h1 class="text-3xl font-semibold">Admin Panel</h1>
    <div class="flex flex-col sm:flex-row">
      <SearchBox class="m-10" v-model="bookSearchString" />
      <Button
        icon="pi pi-plus"
        label="Add new book"
        class="m-10 flex-auto md:flex-initial whitespace-nowrap"
        severity="success"
        @click="isOpenBookEdit = true"
      />
    </div>
    <AdminBookList :books="allBooks" />
  </main>
  <Teleport to="body">
    <BookAddEdit
      v-if="isOpenBookEdit"
      :operation="selectedBook ? 'edit' : 'add'"
    />
  </Teleport>
</template>

<script setup>
  import BookAddEdit from '@/components/BookAddEdit.vue';
  import { computed, ref } from 'vue';
  import AdminBookList from '@/components/AdminBookList.vue';
  import SearchBox from '@/components/SearchBox.vue';
  import { useFilterBooks } from '@/composables/books';
  import { useBookStore } from '@/stores/book';
  import { storeToRefs } from 'pinia';

  // String which filters books by title
  const bookSearchString = ref('');

  const books = useBookStore();
  const { isOpenBookEdit, selectedBook } = storeToRefs(books);

  // Filter out books based on search string
  const allBooks = computed(() => {
    return useFilterBooks(bookSearchString.value);
  });
</script>
