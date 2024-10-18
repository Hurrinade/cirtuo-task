<template>
  <main class="flex justify-center">
    <header class="flex-none" v-if="userToken">
      <div>
        <nav>
          <Menu class="w-72 text-3xl" :model="items" />
        </nav>
      </div>
    </header>
    <div class="flex-1 flex justify-center">
      <RouterView />
    </div>
  </main>
</template>

<script setup>
  import { RouterView, useRouter } from 'vue-router';
  import { useBookStore } from '@/stores/book';
  import { useUserStore } from '@/stores/user';
  import { storeToRefs } from 'pinia';
  import { watch, computed } from 'vue';

  const bookStore = useBookStore();
  const router = useRouter();
  const userStore = useUserStore();

  const { userToken, user } = storeToRefs(userStore);

  const routes = [
    {
        label: 'Bookstore',
        icon: 'pi pi-home',
        command: () => {
          router.push('/');
        }
    },
    {
        label: 'Admin Panel',
        icon: 'pi pi-shield',
        command: () => {
          router.push('/admin');
        }
    }
]

  // Get functions from store
  const { getBooks } = bookStore;

  const items = computed(() => {
    return routes.filter((route) => {
      if (user.value.type === 'user' && route.label !== 'Admin Panel')
      {
        return route;
      } else if (user.value.type === 'admin') {
        return route;
      }      
    })
  })

  // Check if user is authenticated and reroute depanding on that
  watch(
    () => userToken.value,
    () => {
      if (userToken.value) {
        router.push('/');
        // Fetch books initialy
        getBooks();
        return;
      }
    },
    { immediate: true },
  );
</script>
