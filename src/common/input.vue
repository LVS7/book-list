<template>
  <input
    v-model="model"
    class="border-blue-300 border-2 rounded pl-4 pr-4 pt-2 pb-2"
    placeholder="Search..."
    v-on:keyup.enter="emit('enter')"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: string;
}

interface Emits {
  (name: "update:modelValue", payload: string): void;
  (name: "enter"): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const model = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>
