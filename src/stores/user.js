import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', () => {
  const userToken = ref(null);
  const user = ref(null);

  // Login for existing users
  async function login(userData) {
    try {
      const response = await axios.post(
        'http://localhost:3000/login',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      userToken.value = response.data.accessToken;
      user.value = response.data.user;

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

  // Registration for new user
  async function register(userData) {
    try {
      const token = await axios.post(
        'http://localhost:3000/register',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      userToken.value = token.data.accessToken;
      user.value = token.data.user;

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

  return { userToken, user, login, register };
});
