import { db } from "@/db";
import { category } from "@/db/schema";
import { ActionResponse } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createCategory = async (
  formData: FormData
): Promise<ActionResponse> => {
  "use server";

  try {
    const name = formData.get("name") as string;

    if (!name) return { status: "error", message: "Nome é obrigatório." };

    await db.insert(category).values({ name });

    revalidatePath("/categories");
    return { status: "success", message: "Categoria criada." };
  } catch (error) {
    console.log("Error: ", error);
    return { status: "error", message: "Erro ao criar categoria" };
  }
};

export const deleteCategory = async (id: string) => {
  "use server";

  try {
    await db.delete(category).where(eq(category.id, id));

    revalidatePath("/categories");
    redirect("/categories");
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const updateCategory = async (
  id: string,
  formData: FormData
): Promise<ActionResponse> => {
  "use server";

  try {
    const name = formData.get("name") as string;

    if (!name) return { status: "error", message: "Nome é obrigatório." };

    await db.update(category).set({ name }).where(eq(category.id, id));

    revalidatePath("/categories");
    return { status: "success", message: "Categoria atualizada." };
  } catch (error) {
    console.log("Error: ", error);
    return { status: "error", message: "Erro ao atualizar categoria" };
  }
};

export const getCategories = async () => {
  "use server";

  return await db.select().from(category);
};

export const getCategory = async (id: string) => {
  "use server";

  const categories = await db
    .select()
    .from(category)
    .where(eq(category.id, id));

  return categories[0];
};
