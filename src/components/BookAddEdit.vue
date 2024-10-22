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
          <Textarea v-model="newBookData.description" rows="5" cols="50" />
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
              @click.prevent="operationFunc"
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
  import { useToast } from 'primevue/usetoast';

  const toast = useToast();

  const props = defineProps(['operation']);
  const bookStore = useBookStore();
  const { selectedBook, isOpenBookEdit } = storeToRefs(bookStore);
  // Get reactive variables from store
  const { editBook, addBook } = bookStore;

  // Disable button if there is missing book data
  const disableButton = computed(() => {
    return (
      !newBookData.title ||
      !newBookData.description ||
      !newBookData.author ||
      !newBookData.cover_image
    );
  });

  // Based on operation function determines to create new book or update existing one
  const operationFunc = async () => {
    let response = null;

    if (props.operation === 'add') {
      response = await addBook(newBookData);
    } else {
      response = await editBook(newBookData);
    }

    if (response.error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: response.msg,
        life: 3000,
      });
      return;
    }

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: response.msg,
      life: 3000,
    });
    selectedBook.value = null;
    isOpenBookEdit.value = false;
  };

  // Set data for add or edit function
  const newBookData = reactive(
    props.operation === 'add'
      ? { title: '', author: '', description: '', cover_image: '' }
      : { ...selectedBook.value },
  );
</script>
