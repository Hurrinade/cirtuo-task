import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from './user';

export const useBookStore = defineStore('book', () => {
  const books = ref([]); // List of books
  const selectedBook = ref(null); // Selected book for edit
  const user = useUserStore(); // user data
  const isOpenBookEdit = ref(false); // variable to show and hide edit popup

  // Function to retreive books
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

  // Function to edit book data
  async function editBook(data) {
    const body = { ...data, userId: user.user.id };

    try {
      await axios.put(`http://localhost:3000/books/${data.id}`, body, {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      });

      getBooks();

      return {
        error: false,
        msg: 'Successfully updated book',
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

  // Function to create new book
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

  // Function to remove book
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
