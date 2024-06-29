import { db } from "@/db";
import { loan } from "@/db/schema";
import { error } from "console";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createLoan = async (formData: FormData) => {
  "use server";

  const loanDate = formData.get("loanDate") as string;
  const dueDate = formData.get("dueDate") as string;
  const status = formData.get("status") as string;
  const returnDate = formData.get("returnDate") as string;
  const bookCopyId = formData.get("bookCopyId") as string;
  const personId = formData.get("personId") as string;

  const userHasLateLoan = async (personId: string): Promise<boolean> => {
    const result = await db
      .select()
      .from(loan)
      .where(
        and(
          eq(loan.personId, personId),
          eq(loan.status, 'atrasado')
        )
      );

    return result.length > 0;
  };

  // Uso da função
  const hasLateLoan = await userHasLateLoan(personId);
  console.log(hasLateLoan); // true ou false

  if (hasLateLoan) {
    // return error('Usuario tem livros em atraso');
  }

  const userHasMoreThanThreeLoans = await db
    .select()
    .from(loan)
    .where(
      eq(loan.personId, personId)
    );

  if (userHasMoreThanThreeLoans) {

  }


  await db.insert(loan).values({ loanDate, dueDate, status, returnDate, bookCopyId, personId });

  revalidatePath("/loans");
  redirect("/loans");
};

export const getLoans = async () => {
  "use server";

  return await db.select().from(loan);
};

export const getLoan = async (id: string) => {
  "use server";

  const loans = await db
    .select()
    .from(loan)
    .where(eq(loan.id, id));

  return loans[0];
};
