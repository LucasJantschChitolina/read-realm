import Link from "next/link";
import { getReportData } from "./actions";
import { Button } from "@/components/ui/button";
import {
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableFooter,
    Table,
} from "@/components/ui/table";
import { Plus, TrashIcon, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ReportPage = async () => {
    const reportData = await getReportData();
    console.log('reportdata', reportData);

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Relatório de livros em atraso</h1>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Aluno</TableHead>
                        <TableHead>Livro</TableHead>
                        <TableHead>Data de Empréstimo</TableHead>
                        <TableHead>Data de Devolução</TableHead>
                        <TableHead>Status do empréstimo</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reportData.map((row) => (
                        <TableRow key={row.loan.id}>
                            <TableCell>{row.person.name}</TableCell>
                            <TableCell>{row.book.title}</TableCell>
                            <TableCell>{row.loan.loan_date}</TableCell>
                            <TableCell>{row.loan.return_date}</TableCell>
                            <TableCell><Badge variant='destructive'>atrasado</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4}>Total</TableCell>
                        <TableCell className="text-right" colSpan={2}>
                            {reportData.length}
                        </TableCell>
                    </TableRow>
                </TableFooter>
                <TableCaption>Uma relatório dos livros em atraso.</TableCaption>
            </Table>
        </div>
    );
};

export default ReportPage;
