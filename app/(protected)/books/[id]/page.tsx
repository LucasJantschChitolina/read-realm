import Link from "next/link";
import { getBook } from "../actions";

const Book = async ({ params }: { params: { id: string } }) => {
  const bookData = await getBook(params.id);

  return (
    <div className="p-4 flex gap-2 flex-col">
      <h1 className="text-3xl font-bold">{bookData.title}</h1>

      <Link href={`/books/${bookData.id}/edit`}>Edit</Link>
    </div>
  );
};
export default Book;
