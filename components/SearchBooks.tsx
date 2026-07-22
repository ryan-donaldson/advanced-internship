import { Book } from "@/types/book";
import SearchBookLink from "./SearchBookLink";

type Props = {
  searchBooks: Book[];
};

export default function SearchBooks({ searchBooks }: Props) {
  
  return (
    <>
      {searchBooks.map((book) => (
        <SearchBookLink key={book.id} book={book} />
      ))}
    </>
  );
}
