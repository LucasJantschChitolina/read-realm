import { createBook } from "@/app/(protected)/books/actions";
import { getPublishers } from "@/app/(protected)/publishers/actions";
import { getCategories } from "@/app/(protected)/categories/actions";
import { getAuthors } from "@/app/(protected)/authors/actions";
import CreateBookForm from "./create-book-form";

const CreateBook = async () => {
  const publishers = await getPublishers();
  const categories = await getCategories();
  const authors = await getAuthors();

  return (
    <CreateBookForm
      publishers={publishers}
      categories={categories}
      authors={authors}
      createBook={createBook}
    />
  );
};

export default CreateBook;
