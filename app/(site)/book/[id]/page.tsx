import Sidebar from "@/components/Sidebar";
import { Book } from "@/types/book";
import BookPageCard from "@/components/BookPageCard";
import { Suspense } from "react";
import BookPageCardSkeleton from "@/components/BookCardPageSkeleton";

type Props = {
  params: Book;
};

export default async function page({ params }: Props) {
  const { id } = await params;

  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
  );
  const data = await res.json();

  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <Suspense fallback={<BookPageCardSkeleton />}>
          <BookPageCard params={data} />
        </Suspense>
      </div>
    </>
  );
}
