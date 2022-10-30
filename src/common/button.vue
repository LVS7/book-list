<template>
  <button
    :disabled="props.disabled"
    @click="emits('click')"
    class="bg-blue-300 rounded pl-4 pr-4 pt-2 pb-2 text-white disabled:text-black disabled:bg-gray-300 hover:bg-blue-500"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  disabled: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(["click"]);
</script>
