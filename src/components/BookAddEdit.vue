<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <Card style="width: 35rem; overflow: hidden">
      <template #content>
        <form class="flex flex-col items-center">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-address-book"></i>
            </InputGroupAddon>
            <InputText
              type="text"
              :invalid="!newBookData.title"
              v-model="newBookData.title"
              placeholder="Title"
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText
              type="text"
              :invalid="!newBookData.author"
              v-model="newBookData.author"
              placeholder="Author"
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-image"></i>
            </InputGroupAddon>
            <InputText
              type="text"
              :invalid="!newBookData.cover_image"
              v-model="newBookData.cover_image"
              placeholder="Image name"
            />
          </InputGroup>
          <br />
          <Textarea v-model="newBookData.description" rows="5" cols="60" />
          <br />
          <div class="flex gap-4 mt-1">
            <Button
              @click="
                () => {
                  selectedBook = null;
                  isOpenBookEdit = false;
                }
              "
              label="Close"
              severity="secondary"
              outlined
              class="w-full"
            />
            <Button
              @click.prevent="
                operation === 'add'
                  ? addBook(newBookData)
                  : editBook(newBookData)
              "
              type="submit"
              :label="operation === 'add' ? 'Add' : 'Update'"
              class="w-full"
              :disabled="disableButton"
            />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup>
  import { useBookStore } from '@/stores/book';
  import { storeToRefs } from 'pinia';
  import { reactive, computed } from 'vue';

  const props = defineProps(['operation']);

  const bookStore = useBookStore();

  const disableButton = computed(() => {
    return (
      !newBookData.title ||
      !newBookData.description ||
      !newBookData.author ||
      !newBookData.cover_image
    );
  });

  // Get reactive variables from store
  const { selectedBook, isOpenBookEdit } = storeToRefs(bookStore);
  const { editBook, addBook } = bookStore;
  const newBookData = reactive(
    props.operation === 'add'
      ? { title: '', author: '', description: '', cover_image: '' }
      : { ...selectedBook.value },
  );
</script>
