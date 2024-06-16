import Link from "next/link";
import { deleteAuthor, getAuthors } from "./actions";
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

const AuthorsPage = async () => {
  const authors = await getAuthors();

  const deleteAuthorWithId = async (formData: FormData) => {
    "use server";

    const id = formData.get("id") as string;

    await deleteAuthor(id);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Autores</h1>

        <Button asChild>
          <Link href="/authors/create">
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
          {authors.map((author) => (
            <TableRow key={author.id}>
              <TableCell className="font-medium" colSpan={4}>
                {author.name}
              </TableCell>
              <TableCell className="text-right">
                <Button asChild variant="outline" size="icon">
                  <Link href={`/authors/${author.id}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <form action={deleteAuthorWithId}>
                  <input type="hidden" name="id" value={author.id} />
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
              {authors.length}
            </TableCell>
          </TableRow>
        </TableFooter>
        <TableCaption>Uma lista dos autores cadastradas.</TableCaption>
      </Table>
    </div>
  );
};

export default AuthorsPage;
