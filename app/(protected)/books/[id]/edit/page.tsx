import { TrashIcon } from "lucide-react";
import { deleteBook, getBook } from "../../actions";

const Book = async ({ params }: { params: { id: string } }) => {
  const bookData = await getBook(params.id);

  const deleteBookWithId = deleteBook.bind(null, bookData.id);

  return (
    <div>
      <h1 className="text-3xl font-bold">{bookData.name}</h1>
      <p className="text-lg">{bookData.author}</p>

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
