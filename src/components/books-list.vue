<template>
  <div class="h-full p-5">
    <div v-if="props.booksList.length" class="flex flex-col gap-3">
      <BookCard :book="book" v-for="book in props.booksList" />
    </div>
    <span v-else> No books found. </span>
  </div>
</template>

<script setup lang="ts">
import BookCard from "./book-card.vue";
import { IBookData } from "../api/types";

interface IBooksListProps {
  booksList: IBookData[];
}

const props = defineProps<IBooksListProps>();

</script>