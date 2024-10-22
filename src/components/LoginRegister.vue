<template>
  <form>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-user"></i>
      </InputGroupAddon>
      <InputText
        type="email"
        :invalid="!userData.email"
        v-model="userData.email"
        placeholder="Email"
      />
    </InputGroup>
    <br />
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-key"></i>
      </InputGroupAddon>
      <InputText
        type="password"
        :invalid="!userData.password"
        v-model="userData.password"
        placeholder="Password"
      />
    </InputGroup>
    <Button
      :disabled="!userData.email || !userData.password"
      @click.prevent="submit"
      label="Submit"
      type="submit"
      class="w-full my-5"
    />
  </form>
  <p class="font-semibold text-red-600">
    {{ errorMessage }}
  </p>
</template>

<script setup>
  import { useUserStore } from '@/stores/user';
  import { reactive, ref } from 'vue';

  // Check type to trigger wanted function
  const props = defineProps(['type']);

  const user = useUserStore();
  const { login, register } = user;

  // Remove when finished
  const userData = reactive(props.type === 'login' ? {
    email: 'admin@test.com',
    password: 'password',
  } : {email: '', password: ''});
  const errorMessage = ref('');

  const submit = async () => {
    if (props.type === 'login') {
      const error = await login(userData);

      if (error.error) {
        errorMessage.value = error.msg;
      }
      return;
    }

    userData.type = 'user';
    const error = await register(userData);

    if (error.error) {
      errorMessage.value = error.msg;
    }
  };
</script>
