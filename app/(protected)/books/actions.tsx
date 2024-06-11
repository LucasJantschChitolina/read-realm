import { db } from "@/db/index";
import { books } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createBook = async (formData: FormData) => {
  "use server";

  const name = formData.get("name") as string;
  const author = formData.get("author") as string;

  await db.insert(books).values({ name, author });

  revalidatePath("/feed");
  redirect("/feed");
};

export const deleteBook = async (id: string) => {
  "use server";

  await db.delete(books).where(eq(books.id, id));
  revalidatePath("/feed");
  redirect("/feed");
};

export const getBook = async (id: string) => {
  "use server";

  const booksData = await db.select().from(books).where(eq(books.id, id));

  return booksData[0];
};
