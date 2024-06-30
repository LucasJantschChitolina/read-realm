import { db } from "@/db";
import {  person } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPerson = async (formData: FormData) => {
  "use server";

  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const phone = formData.get("phone") as string;
  const status = formData.get("status") as string;
  const studentEnrollment = formData.get("student_enrollment") as string;


  await db.transaction(async (tx) => {

      await tx.insert(person).values({
        email,
        name,
        password,
        phone,
        type,
        studentEnrollment,
        status,
      });
    }
);

  revalidatePath("/people");
  redirect("/people");
};

export const deletePerson = async (id: string) => {
  "use server";

  await db.delete(person).where(eq(person.id, id));
  revalidatePath("/people");
  redirect("/people");
};

export const updatePerson = async (id: string, formData: FormData) => {
  "use server";

  const name = formData.get("name") as string;

  await db.update(person).set({ name }).where(eq(person.id, id));

  revalidatePath("/people");
  redirect("/people");
};

export const getPeople = async () => {
  "use server";

  return await db.select().from(person);
};

export const getPerson = async (id: string) => {
  "use server";

  const people = await db.select().from(person).where(eq(person.id, id));

  return people[0];
};
