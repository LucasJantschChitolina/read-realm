'use client'

import FormSection from "@/components/form-section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import FormItem from "@/components/form-item";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Book, Person } from "@/db/schema";
import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ActionResponse } from "@/types";
import { toast } from "sonner";

const DEFAULT_URL = "https://generated.vusercontent.net/placeholder.svg";

interface CreateLoanFormProps {
    books: Book[],
    students: Person[],
    createLoan: (formData: FormData) => Promise<ActionResponse>
}

const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const CreateLoanForm = ({ books, students, createLoan }: CreateLoanFormProps) => {
    const [bookCover, setBookCover] = useState('')

    function handleBookChange(bookId: string) {
        const selectedBook = books.filter((book) => book.id === bookId)

        setBookCover(selectedBook[0].cover)
    }

    return (
        <form action={async (formData: FormData) => {
            const response = await createLoan(formData);

            console.log(response.status)

            if (response.status === "error") return toast.error(response.message);

            toast.success(response.message)
            //redicionar

        }} className="space-y-4 w-[680px] h-full">
            <Card className="w-full h-full pt-6">
                <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            {bookCover ? <Image
                                alt="Product image"
                                className="aspect-[6/10] w-full rounded-md object-cover"
                                height={250}
                                width={250}
                                src={bookCover}
                            /> : <Image
                                alt="Product image"
                                className="aspect-[6/10] w-full rounded-md object-cover"
                                height={250}
                                width={250}
                                src={DEFAULT_URL}
                            />}
                        </div>
                        <div className="grid w-full gap-4">
                            <div className="flex flex-col space-y-1.5 gap-4">
                                <CardTitle>Novo empréstimo</CardTitle>
                                <CardDescription>Preencha as informações para criar um novo empréstimo.</CardDescription>
                                <FormSection className="grid gap-6">
                                    <FormItem>
                                        <Label htmlFor="personId">Aluno</Label>
                                        <Select required name="personId">
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione o aluno" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {students.map((student) => (
                                                    <SelectItem key={student.id} value={student.id}>
                                                        {student.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                </FormSection>
                                <FormSection className="grid gap-6">
                                    <FormItem>
                                        <Label htmlFor="bookId">Livros</Label>
                                        <Select required name="bookId" onValueChange={handleBookChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione a categoria" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {books.map((book) => (
                                                    <SelectItem key={book.id} value={book.id}>
                                                        {book.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                </FormSection>
                                <FormSection className="grid gap-6">
                                    <FormItem>
                                        <Label htmlFor="loanDate">Data de empréstimo</Label>
                                        <Input required name="loanDate" type="date" defaultValue={getTodayDate()} />
                                    </FormItem>
                                </FormSection>
                            </div>
                            <div className="flex justify-end self-end">
                                <Button>Confirmar empréstimo</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}

export default CreateLoanForm