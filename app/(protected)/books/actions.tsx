import { db } from "@/db/index";
import { BookInsert, book, bookAuthor, bookCopy } from "@/db/schema";
import { ActionResponse } from "@/types";
import { and, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createBook = async (
  formData: FormData
): Promise<ActionResponse> => {
  "use server";

  try {
    const title = formData.get("title") as string;
    const year = formData.get("year") as string;
    const pages = formData.get("pages") as string;
    const edition = formData.get("edition") as string;
    const summary = formData.get("summary") as string;
    const copies = formData.get("copies") as string;
    const cover = formData.get("cover") as string;
    const categoryId = formData.get("category") as string;
    const publisherId = formData.get("publisher") as string;
    const authorIds = formData.get("author");

    let authorIdArray: string[] = [];

    if (typeof authorIds === "string") {
      authorIdArray = authorIds.split(",");
    }

    const existingBooks = await db
      .select()
      .from(book)
      .leftJoin(bookAuthor, eq(book.id, bookAuthor.bookId))
      .where(
        and(
          eq(book.title, title),
          eq(book.publisherId, publisherId),
          inArray(bookAuthor.authorId, authorIdArray)
        )
      );

    if (existingBooks.length > 0) {
      return { status: "error", message: "Livro já cadastrado" };
    }

    return await db.transaction(async (tx) => {
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
      };

      const createdBookId = await tx
        .insert(book)
        .values(bookData)
        .returning({ id: book.id });

      Array.from({ length: Number(copies) }).forEach(async () => {
        await tx.insert(bookCopy).values({ bookId: createdBookId[0].id });
      });

      authorIdArray.forEach(async (authorId) => {
        await tx
          .insert(bookAuthor)
          .values({ bookId: createdBookId[0].id, authorId });
      });

      revalidatePath("/feed");
      return { status: "success", message: "Livro criado com sucesso" };
    });
  } catch (error) {
    console.log("Error creating book: ", error);
    return { status: "error", message: "Erro ao criar livro" };
  }
};


export const deleteBook = async (id: string) => {
  "use server";

  await db.delete(book).where(eq(book.id, id));
  revalidatePath("/feed");
  redirect("/feed");
};

export const getBookWithAuthors = async (id: string) => {
  "use server";

  const bookData = await db.select().from(book).where(eq(book.id, id));
  const bookAuthors = await db
    .select()
    .from(bookAuthor)
    .where(eq(bookAuthor.bookId, id));

  return { book: bookData[0], bookAuthors };
};

export const getBook = async (id: string) => {
  "use server";

  const bookData = await db.select().from(book).where(eq(book.id, id));

  return bookData[0];
};

export const updateBook = async (
  id: string,
  formData: FormData
): Promise<ActionResponse> => {
  "use server";

  try {
    const title = formData.get("title") as string;
    const year = formData.get("year") as string;
    const pages = formData.get("pages") as string;
    const edition = formData.get("edition") as string;
    const summary = formData.get("summary") as string;
    const copies = formData.get("copies") as string;
    const cover = formData.get("cover") as string;
    const categoryId = formData.get("category") as string;
    const publisherId = formData.get("publisher") as string;

    const authorIds = formData.get("author");

    let authorIdArray: string[] = [];

    if (typeof authorIds === "string") {
      authorIdArray = authorIds.split(",");
    }

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
    };

    await db.transaction(async (tx) => {
      await tx.delete(bookAuthor).where(eq(bookAuthor.bookId, id));
      await tx
        .delete(bookCopy)
        .where(and(eq(bookCopy.bookId, id), eq(bookCopy.borrowed, false)));

      authorIdArray.forEach(async (authorId) => {
        await tx.insert(bookAuthor).values({ bookId: id, authorId });
      });

      const alreadyInsertedCopies = await tx
        .select()
        .from(bookCopy)
        .where(eq(bookCopy.bookId, id));

      const copiesToInsert = Number(copies) - alreadyInsertedCopies.length;

      Array.from({ length: copiesToInsert }).forEach(async () => {
        await tx.insert(bookCopy).values({ bookId: id });
      });

      await tx.update(book).set(bookData).where(eq(book.id, id));
    });

    revalidatePath("/feed");
    return { status: "success", message: "Livro atualizado com sucesso" };
  } catch (error) {
    console.log("Error updating book: ", error);
    return { status: "error", message: "Erro ao atualizar livro" };
  }
};

export const getBooks = async () => {
  "use server";

  return await db.select().from(book);
};
