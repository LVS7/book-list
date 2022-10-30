<template>
  <div class="flex gap-5 p-5 items-center justify-end">
    <Input v-model="searchString" @enter="onSearchClick" />
    <Button :disabled="!searchString.length" @click="onSearchClick"
      >Search</Button
    >
  </div>
</template>

<script setup lang="ts">
import Button from "../common/button.vue";
import Input from "../common/input.vue";
import { ref } from "vue";

const searchString = ref<string>("");

const emit = defineEmits(["search"]);

const onSearchClick = (): void => {
  if (searchString.value.length) {
    emit("search", searchString.value);
  }
};
</script>
