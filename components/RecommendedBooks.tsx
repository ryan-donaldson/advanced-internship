import { Book } from "@/types/book";
import BookCard from "./BookCard";

type Props = {
  recommendedBooks: Book[]
}

export default async function RecommendedBooks({ recommendedBooks }: Props ) {
  return (
    <>
      {recommendedBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </>
  );
}