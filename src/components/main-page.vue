<template>
  <LoadingSpinner :loading="loading" />

  <div class="h-full w-full bg-gray-200 main-container">
    <Search @search="onSearch" />
    <BookListControls
      v-if="booksList.length"
      :books="booksList"
      @sort="onSort"
    />
    <BooksList :booksList="booksList" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IBookData } from "../api/types";
import { getBookData } from "../api";
import Search from "./search.vue";
import BooksList from "./books-list.vue";
import LoadingSpinner from "../common/loading-spinner.vue";
import BookListControls from "./book-list-controls.vue";

const booksList = ref<IBookData[]>([]);
const loading = ref<boolean>(false);

const onSearch = async (searchString: string): Promise<void> => {
  try {
    loading.value = true;
    booksList.value = await getBookData(searchString);
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const onSort = (sortedBooks: IBookData[]): void => {
  booksList.value = sortedBooks;
};
</script>

<style scoped lang="scss">
.main-container {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 20px;
  min-height: 100vh;
}
</style>
