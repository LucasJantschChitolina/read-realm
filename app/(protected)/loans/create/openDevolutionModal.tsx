"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Book, Loan, Person } from "@/db/schema";
import { ActionResponse } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface DevolutionFormProps {
    loan: Loan;
    book: Book;
    person: Person;
    bookDevolution: (formData: FormData) => Promise<ActionResponse>;
}
const DevolutionForm = ({
    loan,
    person,
    book,
    bookDevolution,
}: DevolutionFormProps) => {
    const router = useRouter();

    console.log('Devolution form', book);

    const handleDevolution = async () => {
        const formData = new FormData();
 
        const returnDateInput = document.getElementById("return_date") as HTMLInputElement | null;
        const returnDate = returnDateInput?.value

        console.log(returnDate);
        formData.append("return_date", String(returnDate));
        formData.append("bookId", book.id);
        formData.append("personId", person.id);
        formData.append("loanId", loan.id);


        const response = await bookDevolution(formData);

        if (response.status === "error") return toast.error(response.message);

        toast.success(response.message);
        router.push("/loans");
    };

    return (
        <div className="space-y-4 w-[680px] h-full">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" disabled={loan.status === 'finished'}>
                        Devolver
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[455px]">
                    <DialogHeader>
                        <DialogTitle>Devolver livro "{book?.title}"</DialogTitle>
                        <DialogDescription>
                            Faça a devolução do livro preenchendo as informações solicitadas.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Aluno
                            </Label>
                            <Input id="name" disabled value={person?.name} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="return_date" className="text-right">
                                Data de devolução
                            </Label>
                            <Input required id="return_date" type="date" name="return_date" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={handleDevolution}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DevolutionForm;
