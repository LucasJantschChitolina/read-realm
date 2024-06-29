import { db } from "@/db/index";
import { BookInsert, book } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createBook = async (formData: FormData) => {
  "use server";

  const title = formData.get("title") as string;
  const year = formData.get("year") as string;
  const pages = formData.get("pages") as string;
  const edition = formData.get("edition") as string;
  const summary = formData.get("summary") as string;
  const copies = formData.get("copies") as string;
  const cover = formData.get("cover") as string;
  const categoryId = formData.get("category") as string;
  const publisherId = formData.get("publisher") as string;

  const bookData: BookInsert = {
    title,
    year: Number(year),
    pages: Number(pages),
    edition: Number(edition),
    summary,
    copies: Number(copies),
    cover,
    categoryId,
    publisherId,
    borrowed: false,
  };

  await db.insert(book).values(bookData);

  revalidatePath("/feed");
  redirect("/feed");
};

export const deleteBook = async (id: string) => {
  "use server";

  await db.delete(book).where(eq(book.id, id));
  revalidatePath("/feed");
  redirect("/feed");
};

export const getBook = async (id: string) => {
  "use server";

  const booksData = await db.select().from(book).where(eq(book.id, id));

  return booksData[0];
};

export const getBooks = async () => {
  "use server";

  const booksData = await db.select().from(book);

  return booksData;
};