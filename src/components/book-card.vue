<template>
  <div class="card-container shadow-2xl">
    <img :src="bookImageSrc" alt="No cover" height="200" width="100" />
    <div class="flex flex-col gap-5">
      <span class="text-2xl font-bold">{{ props.book.title }}</span>
      <span class="text-xl"
        >by
        {{ props.book.author_name ? props.book.author_name[0] : "N/A" }}
      </span>
      <span class="text-gray-500"
        >First published in {{ props.book.first_publish_year }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IBookData } from "../api/types";
import { onMounted, ref } from "vue";

interface IBookCardProps {
  book: IBookData;
}

const bookImageSrc = ref<string>("no-cover.png");

const props = defineProps<IBookCardProps>();

onMounted(async () => {
  if (props.book.isbn?.length) {
    bookImageSrc.value = `https://covers.openlibrary.org/b/isbn/${props.book.isbn[0]}-M.jpg`;
  }
});
</script>

<style scoped lang="scss">
.card-container {
  display: grid;
  grid-template-columns: minmax(80px, auto) 1fr;
  grid-gap: 15px;
  padding: 15px;
  border: 0 solid transparent;
  border-radius: 15px;
  background-color: white;
}
</style>
