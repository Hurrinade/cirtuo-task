<template>
  <main class="h-full w-full flex items-center justify-center">
    <Tabs value="0">
      <TabList>
        <Tab value="0">Login</Tab>
        <Tab value="1">Register</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <div class="w-96">
            <LoginRegister :type="'login'" />
          </div>
        </TabPanel>
        <TabPanel value="1">
          <div class="w-96">
            <LoginRegister :type="'register'" />
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </main>
</template>

<script setup>
  import LoginRegister from '@/components/LoginRegister.vue';
</script>
