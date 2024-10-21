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
    try {
    } catch (error) {
      if (error.response.data) {
        return {
          error: true,
          msg: error.response.data,
        };
      }
    }
  }

  async function addBook(data) {
    const body = { ...data, userId: user.user.id };

    try {
      await axios.post('http://localhost:3000/books', body, {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      });

      getBooks();

      return {
        error: false,
        msg: 'Successfully added new book',
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

  async function removeBook(id) {
    try {
      await axios.delete(`http://localhost:3000/books/${id}`, {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      });

      getBooks();

      return {
        error: false,
        msg: 'Successfully removed a book',
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
