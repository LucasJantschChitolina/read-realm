import { db } from "@/db/index";
import { book } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createBook = async (formData: FormData) => {
  "use server";

  const title = formData.get("title") as string;

  await db.insert(book).values({ title });

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
