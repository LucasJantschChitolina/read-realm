import { db } from "@/db";
import { book, bookCopy, loan, person } from "@/db/schema";
import { ActionResponse } from "@/types";
import { eq, and, count, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const calculateDevolutionDate = (loanDate: Date): string => {
  const devolutionDate = new Date(loanDate);
  devolutionDate.setDate(devolutionDate.getDate() + 15);

  const year = devolutionDate.getFullYear();
  const month = String(devolutionDate.getMonth() + 1).padStart(2, "0");
  const day = String(devolutionDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  console.log("devolution date", formattedDate);
  return formattedDate;
};

const transformStringToDate = (dateString: string): Date => {
  return new Date(dateString);
};

export const createLoan = async (
  formData: FormData
): Promise<ActionResponse> => {
  "use server";

  try {
    const loanDate = formData.get("loanDate") as string;
    const bookId = formData.get("bookId") as string;
    const personId = formData.get("personId") as string;
    const status = "on_time";

    const isPersonActive = await db
      .select()
      .from(person)
      .where(and(eq(person.id, personId), eq(person.status, "active")));

    if (!isPersonActive.length) {
      return {
        status: "error",
        message: "Aluno inativo. Não é possível realizar empréstimo.",
      };
    }

    const availableCopy = await db
      .select()
      .from(bookCopy)
      .where(and(eq(bookCopy.bookId, bookId), eq(bookCopy.borrowed, false)));

    if (!availableCopy.length) {
      return {
        status: "error",
        message: "Não há cópias disponíveis para esse livro.",
      };
    }

    const hasLateLoan = await db
      .select()
      .from(loan)
      .where(and(eq(loan.personId, personId), eq(loan.status, "overdue")));

    if (hasLateLoan.length > 0) {
      return { message: "Aluno com empréstimo em atraso.", status: "error" };
    }

    const userLoansCount = await db
      .select({ count: count() })
      .from(loan)
      .where(eq(loan.personId, personId));

    if (userLoansCount[0].count >= 3) {
      return {
        message: "Aluno atingiu o limite máximo de 3 empréstimos.",
        status: "error",
      };
    }

    await db.transaction(async (tx) => {
      const dateObject = transformStringToDate(loanDate);

      const dueDate = calculateDevolutionDate(dateObject);

      await tx
        .update(bookCopy)
        .set({ borrowed: true })
        .where(eq(bookCopy.id, availableCopy[0].id));

      const returnDate = null;

      await tx.insert(loan).values({
        loanDate,
        status,
        dueDate,
        bookCopyId: availableCopy[0].id,
        personId,
        returnDate,
      });
    });

    revalidatePath("/loans");
    return { message: "Empréstimo gerado com sucesso.", status: "success" };
  } catch (error) {
    console.log("Error creating loan: ", error);
    return { message: "Erro ao gerar empréstimo.", status: "error" };
  }
};

export const getLoans = async () => {
  "use server";

  await db.execute(sql`CALL mark_overdue_loans()`);

  return await db
    .select()
    .from(loan)
    .innerJoin(person, eq(loan.personId, person.id))
    .innerJoin(bookCopy, eq(loan.bookCopyId, bookCopy.id))
    .innerJoin(book, eq(bookCopy.bookId, book.id));
};

export const getLoan = async (id: string) => {
  "use server";

  const loans = await db.select().from(loan).where(eq(loan.id, id));

  return loans[0];
};

export const bookDevolution = async (
  formData: FormData
): Promise<ActionResponse> => {
  "use server";

  try {
    const returnDate = formData.get("return_date") as string;
    const bookId = formData.get("bookId") as string;
    const personId = formData.get("personId") as string;
    const loanId = formData.get("loanId") as string;


    console.log('return_date', returnDate);
    console.log('bookID', bookId);
    console.log('personId', personId);
    console.log('loanId', loanId);


    if (!returnDate || !bookId || !personId || !loanId) {
      throw new Error("Não foi possível processar o empréstimo");
    }

    await db.transaction(async (tx) => {
      await tx
        .update(bookCopy)
        .set({ borrowed: false })
        .where(eq(bookCopy.id, bookId));

      await tx.update(loan)
      .set({returnDate: returnDate,status: "finished"})
      .where(eq(loan.id, loanId));
    });

    revalidatePath("/loans");
    return { message: "Livro devolvido com sucesso.", status: "success" };
  } catch (error) {
    console.log("Error creating loan: ", error);
    return { message: "Erro ao gerar empréstimo.", status: "error" };
  }
};

