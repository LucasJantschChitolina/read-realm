import { db } from "@/db";
import { loan, person } from "@/db/schema";
import { ActionResponse } from "@/types";
import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createPerson = async (
  formData: FormData
): Promise<ActionResponse> => {
  "use server";

  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const studentEnrollment = formData.get("studentEnrollment") as string;
    const phone = formData.get("phone") as string;
    const status = formData.get("status") as string;

    if (!name || !email || !studentEnrollment || !phone || !status)
      return { status: "error", message: "Todos os campos são obrigatórios." };

    const emailExists = await db
      .select()
      .from(person)
      .where(eq(person.email, email));

    if (emailExists.length > 0)
      return { status: "error", message: "Email já cadastrado." };

    const studentEnrollmentExists = await db
      .select()
      .from(person)
      .where(eq(person.studentEnrollment, studentEnrollment));

    if (studentEnrollmentExists.length > 0)
      return { status: "error", message: "Matrícula já cadastrada." };

    await db.insert(person).values({
      name,
      email,
      phone,
      status,
      studentEnrollment,
    });

    revalidatePath("/people");
    return { status: "success", message: "Pessoa criada com sucesso." };
  } catch (error) {
    console.log("Error: ", error);
    return { status: "error", message: "Erro ao criar pessoa" };
  }
};

export const deletePerson = async (id: string): Promise<ActionResponse> => {
  "use server";

  try {
    const personHasLoansInProcess = await db
      .select()
      .from(loan)
      .where(and(eq(loan.personId, id), ne(loan.status, "completed")));

    if (personHasLoansInProcess.length > 0)
      return {
        status: "error",
        message: "Pessoa tem empréstimos em andamento.",
      };

    await db.delete(person).where(eq(person.id, id));
    revalidatePath("/people");
    return { status: "success", message: "Pessoa deletada com sucesso." };
  } catch (error) {
    console.log("Error: ", error);
    return { status: "error", message: "Erro ao deletar pessoa" };
  }
};

export const updatePerson = async (
  id: string,
  formData: FormData
): Promise<ActionResponse> => {
  "use server";

  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const studentEnrollment = formData.get("studentEnrollment") as string;
    const phone = formData.get("phone") as string;
    const status = formData.get("status") as string;

    if (!name || !email || !studentEnrollment || !phone || !status)
      return { status: "error", message: "Todos os campos são obrigatórios." };

    const emailExists = await db
      .select()
      .from(person)
      .where(and(eq(person.email, email), ne(person.id, id)));

    if (emailExists.length > 0)
      return { status: "error", message: "Email já cadastrado." };

    const studentEnrollmentExists = await db
      .select()
      .from(person)
      .where(
        and(eq(person.studentEnrollment, studentEnrollment), ne(person.id, id))
      );

    if (studentEnrollmentExists.length > 0)
      return { status: "error", message: "Matrícula já cadastrada." };

    await db
      .update(person)
      .set({
        name,
        email,
        studentEnrollment,
        phone,
        status,
      })
      .where(eq(person.id, id));

    revalidatePath("/people");
    return { status: "success", message: "Pessoa atualizada com sucesso." };
  } catch (error) {
    console.log("Error: ", error);
    return { status: "error", message: "Erro ao atualizar pessoa" };
  }
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
