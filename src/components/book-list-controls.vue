<template>
  <div class="flex gap-5 pl-5">
    <Button @click="onSort">
      <div class="flex gap-2 items-center">
        <div :class="`sort-${sort}`" v-if="sort" />
        Sort
      </div>
    </Button>
    <Button @click="onExportToXlsx">Export to XLSX</Button>
  </div>
</template>

<script setup lang="ts">
import Button from "../common/button.vue";
import { ref } from "vue";
import { IBookData } from "../api/types";
import { utils, writeFile } from "xlsx-js-style";

enum SortDirection {
  Asc = "asc",
  Desc = "desc",
}

interface Props {
  books: IBookData[];
}

interface Emits {
  (name: "sort", payload: IBookData[]): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const sort = ref<SortDirection>();

const onSort = (): void => {
  const ascSortedBooks = props.books.sort((cur, next) => {
    const curTitle = cur.title.toLowerCase();
    const nextTitle = next.title.toLowerCase();
    if (curTitle < nextTitle) {
      return -1;
    }
    if (curTitle > nextTitle) {
      return 1;
    }
    return 0;
  });

  if (!sort.value || sort.value === SortDirection.Desc) {
    sort.value = SortDirection.Asc;

    emits("sort", ascSortedBooks);
    return;
  }

  sort.value = SortDirection.Desc;
  emits("sort", ascSortedBooks.reverse());
};

const onExportToXlsx = (): void => {
  const wb = utils.book_new();

  const preparedBooksList = props.books.map(
    ({ title, author_name, first_publish_year }, index) => {
      const first_name = author_name ? author_name[0].split(" ")[0] : "";
      const last_name = author_name ? author_name[0].split(" ")[1] : "";

      return {
        "#": index + 1,
        "First Name": first_name,
        "Last Name": last_name,
        "Book Title": title,
        "Publish Year": first_publish_year ?? "",
      };
    }
  );
  const ws = utils.json_to_sheet(preparedBooksList);

  utils.book_append_sheet(wb, ws);
  writeFile(wb, "books-list.xlsx");
};
</script>

<style scoped lang="scss">
.sort-arrow-base {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}

.sort-asc {
  @extend .sort-arrow-base;
  border-bottom: 5px solid white;
}

.sort-desc {
  @extend .sort-arrow-base;
  border-top: 5px solid white;
}
</style>
