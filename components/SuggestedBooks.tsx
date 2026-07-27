import { Book } from "@/types/book";
import BookCard from "./BookCard";

type Props = {
  suggestedBooks: Book[]
}

export default function SuggestedBooks({ suggestedBooks }: Props ) {
  return (
    <>
      {suggestedBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </>
  );
}