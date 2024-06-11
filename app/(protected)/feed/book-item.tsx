import { Book } from "@/db/schema";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export const BookItem = (book: Book) => {
  return (
    <Link href={`/books/${book.id}`}>
      <Card
        key={book.id}
        className="p-4 shadow-md hover:bg-slate-400 duration-300 flex justify-between items-center h-64"
      >
        <h2 className="font-bold">{book.name}</h2>
        <p>{book.author}</p>
      </Card>
    </Link>
  );
};
