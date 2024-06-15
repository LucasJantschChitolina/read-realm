import { db } from "@/db";
import { category } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createCategory = async (formData: FormData) => {
  "use server";

  const name = formData.get("name") as string;

  await db.insert(category).values({ name });

  revalidatePath("/categories");
  redirect("/categories");
};

export const deleteCategory = async (id: string) => {
  "use server";

  await db.delete(category).where(eq(category.id, id));
  revalidatePath("/categories");
  redirect("/categories");
};

export const updateCategory = async (id: string, formData: FormData) => {
  "use server";

  const name = formData.get("name") as string;

  await db.update(category).set({ name }).where(eq(category.id, id));

  revalidatePath("/categories");
  redirect("/categories");
};

export const getCategories = async () => {
  "use server";

  return await db.select().from(category);
};
