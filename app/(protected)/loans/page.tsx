import Link from "next/link";
import { getLoans, bookDevolution } from "./actions";
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
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DevolutionForm from "./create/openDevolutionModal";

const renderStatus = (status: string) => {
  if (status === 'overdue') {
    return <Badge variant='destructive'>atrasado</Badge>
  }

  if (status === 'on_time') {
    return <Badge variant='success'>no prazo</Badge>
  }

  else
    return <Badge variant='default'>finalizado</Badge>;
}

const LoansPage = async () => {
  const loans = await getLoans();

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Empréstimos</h1>

        <Button asChild>
          <Link href="/loans/create">
            Novo empréstimo <Plus className="ml-2 size-4" />
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data de empréstimo</TableHead>
            <TableHead>Data de devolução</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aluno</TableHead>
            <TableHead>Livro</TableHead>
            <TableHead>Realizar devolução</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans?.map((loan) => (
            <TableRow key={loan.loan.id}>
              <TableCell className="font-medium">
                {loan.loan.loanDate}
              </TableCell>
              <TableCell className="font-medium" >
                {loan.loan.dueDate}
              </TableCell>
              <TableCell className="font-medium" >
                {renderStatus(loan.loan.status)}
              </TableCell>
              <TableCell className="font-medium" >
                {loan.person.name}
              </TableCell>
              <TableCell className="font-medium" >
                {loan.book.title}
              </TableCell>
              <TableCell className="font-medium" >
                <DevolutionForm 
                loan={loan.loan} 
                person={loan.person} 
                book={loan.book} 
                bookDevolution={bookDevolution}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right" colSpan={2}>
              {loans.length}
            </TableCell>
          </TableRow>
        </TableFooter>
        <TableCaption>Uma lista dos empréstimos.</TableCaption>
      </Table>
    </div>
  );
};

export default LoansPage;
