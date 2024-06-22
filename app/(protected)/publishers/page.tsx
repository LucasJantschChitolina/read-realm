import Link from "next/link";
import { deletePublisher, getPublishers } from "./actions";
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

const PublishersPage = async () => {
  const publishers = await getPublishers();

  const deletePublisherWithId = async (formData: FormData) => {
    "use server";

    const id = formData.get("id") as string;

    await deletePublisher(id);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Editoras</h1>

        <Button asChild>
          <Link href="/publishers/create">
            Adicionar nova <Plus className="ml-2 size-4" />
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={4}>Nome</TableHead>
            <TableHead className="text-right">Editar</TableHead>
            <TableHead className="text-right">Excluir</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {publishers.map((publisher) => (
            <TableRow key={publisher.id}>
              <TableCell className="font-medium" colSpan={4}>
                {publisher.name}
              </TableCell>
              <TableCell className="text-right">
                <Button asChild variant="outline" size="icon">
                  <Link href={`/publishers/${publisher.id}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <form action={deletePublisherWithId}>
                  <input type="hidden" name="id" value={publisher.id} />
                  <Button variant="destructive" size="icon">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right" colSpan={2}>
              {publishers.length}
            </TableCell>
          </TableRow>
        </TableFooter>
        <TableCaption>Uma lista das editoras cadastradas.</TableCaption>
      </Table>
    </div>
  );
};

export default PublishersPage;
