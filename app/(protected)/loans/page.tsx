import Link from "next/link";
import { getLoans } from "./actions";
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
            <TableHead colSpan={4}>Data</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell className="font-medium" colSpan={4}>
                {loan.loanDate}
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