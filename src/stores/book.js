import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from './user';

export const useBookStore = defineStore('book', () => {
  const books = ref([]);
  const selectedBook = ref(null);
  const user = useUserStore();

  async function getBooks() {
    try {
      const data = await axios.get('http://localhost:3000/books',
        {
          headers: {
            Authorization: `Bearer ${user.userToken}`
          }
        }
      );

      books.value = data.data

      return {
        error: false,
        msg: '',
      };
    } catch (error) {
      if (error.response.data) {
        return {
          error: true,
          msg: error.response.data,
        };
      }
    }
  }

  return { books, selectedBook, getBooks };
});
