<template>
  <FloatLabel variant="in">
    <InputText id="in_label" size="large" v-model="model" variant="filled" />
    <label for="in_label">Search by title or author...</label>
  </FloatLabel>
</template>

<script setup>
  // Model for search string from parent component
  const model = defineModel();
</script>
