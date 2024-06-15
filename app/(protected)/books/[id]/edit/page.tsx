import { TrashIcon } from "lucide-react";
import { deleteBook, getBook } from "../../actions";

const Book = async ({ params }: { params: { id: string } }) => {
  const bookData = await getBook(params.id);

  const deleteBookWithId = deleteBook.bind(null, bookData.id);

  return (
    <div className="p-4 flex gap-2 flex-col">
      <h1 className="text-3xl font-bold">{bookData.title}</h1>

      <form action={deleteBookWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </div>
  );
};
export default Book;
