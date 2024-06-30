import {
  updateBook,
  getBookWithAuthors,
} from "@/app/(protected)/books/actions";
import { getPublishers } from "@/app/(protected)/publishers/actions";
import { getCategories } from "@/app/(protected)/categories/actions";
import { getAuthors } from "@/app/(protected)/authors/actions";
import EditBookForm from "./edit-book-form";

const EditBook = async ({ params }: { params: { id: string } }) => {
  const { bookAuthors, book } = await getBookWithAuthors(params.id);

  const publishers = await getPublishers();
  const categories = await getCategories();
  const authors = await getAuthors();

  return (
    <EditBookForm
      authors={authors}
      categories={categories}
      publishers={publishers}
      bookAuthors={bookAuthors}
      book={book}
      updateBook={updateBook}
    />
  );
};

export default EditBook;
