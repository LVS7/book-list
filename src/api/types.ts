export interface IBookData {
  title: string;
  first_publish_year: number;
  isbn?: string[];
  author_name?: string[];
}

export type GetBookDataResponse = {
  docs: IBookData[];
};
