import { Book } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
import AudioDuration from "./AudioDuration";
import { formatTime } from "@/utils/formatTIme";
import { usePlayerStore } from "@/stores/playerStore";

type Props = {
  book: Book;
};

export default function SearchBookLink({ book }: Props) {
  const duration = usePlayerStore((s) => s.bookDurations[book.id]);

  return (
    <>
      <AudioDuration book={book} />
      <Link className="search__book--link" href={`/book/${book.id}`}>
        <audio src={book.audioLink}></audio>
        <figure
          className="book__image--wrapper"
          style={{ height: "80px", width: "80px", minWidth: "80px" }}
        >
          <Image
            className="book__image"
            src={book.imageLink}
            alt="book"
            style={{ display: "block" }}
            width={80}
            height={80}
          />
        </figure>
        <div>
          <div className="search__book--title">{book.title}</div>
          <div className="search__book--author">{book.author}</div>
          <div className="search__book--duration">
            <div className="recommended__book--details">
              <div className="recommended__book--details-icon">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                  <path d="M13 7h-2v6h6v-2h-4z"></path>
                </svg>
              </div>
              <div className="recommended__book--details-text">
                {formatTime(duration)}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
