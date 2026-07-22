import Sidebar from "@/components/Sidebar";
import { Book } from "@/types/book";
import BookSummary from "@/components/BookSummary";
import AudioPlayer from "@/components/AudioPlayer";

type Props = {
  params: Book;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
  );
  const data = await res.json();

  return (
    <>
      <div className="wrapper">
        <Sidebar styles={{ height: "calc(-140px + 100vh)" }}/>
        <BookSummary data={data} />
        <AudioPlayer book={data} />
      </div>
    </>
  );
}
