import { useBookStore } from '@/stores/book';
import { storeToRefs } from 'pinia';

// Composable used for book filtering based on search string
export function useFilterBooks(bookString) {
  const bookStore = useBookStore();
  const { books } = storeToRefs(bookStore);

  return books.value.filter((book) => {
    const ss = bookString.toLowerCase();
    const title = book.title.toLowerCase();
    const author = book.author.toLowerCase();
    if (title.includes(ss) || author.includes(ss)) {
      return book;
    }
  });
}
