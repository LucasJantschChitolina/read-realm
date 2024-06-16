import { db } from "@/db";
import { author} from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createAuthor = async (formData: FormData) => {
  "use server";

  const name = formData.get("name") as string;

  await db.insert(author).values({ name });

  revalidatePath("/authors");
  redirect("/authors");
};

export const deleteAuthor = async (id: string) => {
  "use server";

  await db.delete(author).where(eq(author.id, id));
  revalidatePath("/authors");
  redirect("/authors");
};

export const updateAuthor = async (id: string, formData: FormData) => {
  "use server";

  const name = formData.get("name") as string;

  await db.update(author).set({ name }).where(eq(author.id, id));

  revalidatePath("/authors");
  redirect("/authors");
};

export const getAuthors = async () => {
  "use server";

  return await db.select().from(author);
};

export const getAuthor = async (id: string) => {
  "use server";

  const authors = await db
    .select()
    .from(author)
    .where(eq(author.id, id));

  return authors[0];
};
