"use client";

import Image from "next/image";
import { Suspense } from "react";
import BookSkeleton from "@/components/BookSkeleton";
import RecommendedBooks from "@/components/RecommendedBooks";
import SuggestedBooks from "@/components/SuggestedBooks";
import { Book } from "@/types/book";

type Props = {
  selectedBook: Book
  recommendedBooks: Book[]
  suggestedBooks: Book[]
}

export default function ForYouClient({
  selectedBook,
  recommendedBooks,
  suggestedBooks,
}: Props) {
  


  return (
    <div className="row">
          <div className="container">
            <div className="for-you__wrapper">
              <div className="for-you__title">Selected just for you</div>
              <audio src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fthe-lean-startup.mp3?alt=media&amp;token=c2f2b1d4-eaf2-4d47-8c8a-7a8fd062a47e"></audio>
              <a className="selected__book" href="/book/f9gy1gpai8">
                <div className="selected__book--sub-title">
                  {selectedBook.subTitle}
                </div>
                <div className="selected__book--line"></div>
                <div className="selected__book--content">
                  <figure
                    className="book__image--wrapper"
                    style={{
                      height: "140px",
                      width: "140px",
                      minWidth: "140px",
                    }}
                  >
                    <Image
                      className="book__image"
                      src={selectedBook.imageLink}
                      alt={selectedBook.title}
                      width={140}
                      height={140}
                      style={{
                        display: "block",
                        height: "140px",
                        width: "140px",
                        minWidth: "140px",
                      }}
                    />
                  </figure>
                  <div className="selected__book--text">
                    <div className="selected__book--title">
                      {selectedBook.title}
                    </div>
                    <div className="selected__book--author">
                      {selectedBook.author}
                    </div>
                    <div className="selected__book--duration-wrapper">
                      <div className="selected__book--icon">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
                        </svg>
                      </div>
                      <div className="selected__book--duration">
                        3 mins 23 secs
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <div>
                <div className="for-you__title">Recommended For You</div>
                <div className="for-you__sub--title">
                  We think you'll like these
                </div>
                <div className="for-you__recommended--books">
                  <Suspense fallback={<BookSkeleton />}>
                      <RecommendedBooks recommendedBooks={recommendedBooks} />
                  </Suspense>
                </div>
              </div>
              <div>
                <div className="for-you__title">Suggested Books</div>
                <div className="for-you__sub--title">Browse those books</div>
                <div className="for-you__recommended--books">
                  <Suspense fallback={<BookSkeleton />}>
                      <SuggestedBooks suggestedBooks={suggestedBooks} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
