import { Suspense } from "react";
import Image from "next/image";
import { Book } from "@/types/book";
import BookSkeleton from "@/components/BookSkeleton";
import RecommendedBooks from "@/components/RecommendedBooks";
import SuggestedBooks from "@/components/SuggestedBooks";
import Sidebar from "@/components/Sidebar";
import ForYouClient from "@/components/ForYouClient";

export default async function Page() {

  function mapBook(item: any): Book {
    return {
      id: item.id,
      author: item.author,
      title: item.title,
      subTitle: item.subTitle,
      imageLink: item.imageLink,
      audioLink: item.audioLink,
      totalRating: item.totalRating,
      averageRating: item.averageRating,
      keyIdeas: item.keyIdeas,
      type: item.type,
      status: item.status,
      subscriptionRequired: item.subscriptionRequired,
      summary: item.summary,
      tags: item.tags,
      bookDescription: item.bookDescription,
      authorDescription: item.authorDescription,
    };
  }

  async function fetchBooks(status: string) {
    const res = await fetch(
      `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=${status}`,
      { cache: "no-store" },
    );
    return res.json();
  }

  const [selectedData, recommendedData, suggestedData] = await Promise.all([
    fetchBooks("selected"),
    fetchBooks("recommended"),
    fetchBooks("suggested"),
  ]);

  const selectedBook: Book = mapBook(selectedData[0]);

  const recommendedBooks: Book[] =
    recommendedData.map(mapBook);

  const suggestedBooks: Book[] = suggestedData.map(mapBook);


  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <ForYouClient
          selectedBook={selectedBook}
          recommendedBooks={recommendedBooks}
          suggestedBooks={suggestedBooks}
          />
      </div>
    </>
  );
}
