import { db } from "@/db/index";
import { author } from "@/db/schemaAuthor";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Criação de um autor
export const createAuthor = async (formData: FormData) => {
  "use server";

  const name = formData.get("name") as string;
  const id = formData.get("id") as string;

  await db.insert(author).values({ id, name });

  revalidatePath("/author");
};

// Leitura de todos os autores
export const readAuthors = async () => {
  "use server";

  const authors = await db.select().from(author).all();
  return authors;
};

// Atualização de um autor
export const updateAuthor = async (id: string, formData: FormData) => {
  "use server";

  const name = formData.get("name") as string;

  await db.update(author).set({ name }).where(eq(author.id, id));

  revalidatePath("/author");
};

// Exclusão de um autor
export const deleteAuthor = async (id: string) => {
  "use server";

  await db.delete(author).where(eq(author.id, id));
  revalidatePath("/author");
};
