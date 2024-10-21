import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from './user';

export const useBookStore = defineStore('book', () => {
  const books = ref([]);
  const selectedBook = ref(null);
  const user = useUserStore();
  const isOpenBookEdit = ref(false);

  async function getBooks() {
    try {
      const data = await axios.get('http://localhost:3000/books', {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      });

      books.value = data.data;

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

  async function editBook(data) {
    console.log(data);
  }

  async function addBook(data) {
    console.log('add book', data);
  }

  async function removeBook(id) {
    console.log('book id', id);
  }

  return {
    books,
    selectedBook,
    isOpenBookEdit,
    getBooks,
    editBook,
    addBook,
    removeBook,
  };
});
