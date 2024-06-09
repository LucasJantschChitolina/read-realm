import { Book } from "@/db/schema";
import { deleteBook } from "./actions";
import { TrashIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export const BookItem = (book: Book) => {
  const deleteBookWithId = deleteBook.bind(null, book.id);

  return (
    <Card
      key={book.id}
      className="p-4 shadow-md my-2 hover:bg-slate-400 duration-300 flex justify-between items-center"
    >
      <h2 className="font-bold">{book.name}</h2>
      <p>{book.author}</p>

      <form action={deleteBookWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </Card>
  );
};
