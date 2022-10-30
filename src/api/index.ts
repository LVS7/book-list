import axios from "axios";
import { GetBookDataResponse, IBookData } from "./types";

const axiosConfig = axios.create();

export const getBookData = async (bookName: string): Promise<IBookData[]> => {
  const params = { q: bookName };
  const { data } = await axiosConfig.get<GetBookDataResponse>(
    "https://openlibrary.org/search.json",
    { params }
  );

  return data.docs;
};
