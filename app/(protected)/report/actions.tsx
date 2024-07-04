import { db } from "@/db";
import { sql } from "drizzle-orm";

interface Loan {
    id: number;
    loan_date: string;
    return_date: string;
    status: string;
    // Adicione mais propriedades conforme necessário
}

interface Book {
    title: string;
}

interface Person {
    name: string;
}

// Interface Report contendo Loan, Book e Person
interface Report {
    loan: Loan;
    book: Book;
    person: Person;
}

export const getReportData = async (): Promise<Report[]> => {
    "use server";

    try {
        const response: Record<string, unknown>[] = await db.execute(sql`
           SELECT
            loan.uuid1 as id,
            loan.loan_date,
            loan.due_date,
            loan.status,
            person.name,
            book.title
        FROM
            loan
            LEFT JOIN person ON person.uuid1 = loan.person_id
            LEFT JOIN book_copy ON book_copy.uuid1 = loan.book_copy_id
            LEFT JOIN book ON book.uuid1 = book_copy.book_id

            where loan.status = 'overdue'
        `);     

        const reports: Report[] = response.map(item => ({
            loan: {
                id: item.id as number,
                loan_date: item.loan_date as string,
                return_date: item.due_date as string,
                status: item.status as string
            },
            person: {
                name: item.name as string,
            },
            book: {
                title: item.title as string,
            },
        }));

        return reports;
    } catch (error) {
        console.error("Erro ao buscar dados do relatório:", error);
        throw error;
    }
};
