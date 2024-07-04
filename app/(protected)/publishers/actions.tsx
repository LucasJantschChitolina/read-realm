import { db } from "@/db";
import { publisher } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getPublishers = async () => {
  "use server";

  return await db.select().from(publisher);
};

export const getPublisher = async (id: string) => {
  "use server";

  const publishers = await db
    .select()
    .from(publisher)
    .where(eq(publisher.id, id));

  return publishers[0];
};

export const createPublisher = async (formData: FormData) => {
  "use server";

  const name = formData.get("name") as string;

  const publisherExists = await db
    .select()
    .from(publisher)
    .where(eq(publisher.name, name));

  if (publisherExists.length > 0) {
    return { status: "error", message: "Editora já cadastrada" };
  }

  await db.insert(publisher).values({ name });

  revalidatePath("/publishers");
  redirect("/publishers");
};

export const deletePublisher = async (id: string) => {
  "use server";

  await db.delete(publisher).where(eq(publisher.id, id));
  revalidatePath("/publishers");
  redirect("/publishers");
};

export const updatePublisher = async (id: string, formData: FormData) => {
  "use server";

  const name = formData.get("name") as string;

  await db.update(publisher).set({ name }).where(eq(publisher.id, id));

  revalidatePath("/publishers");
  redirect("/publishers");
};
