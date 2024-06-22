import Link from "next/link";
import { deletePerson, getPeople } from "./actions";
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

const PeoplePage = async () => {
  const people = await getPeople();

  const deletePersonWithId = async (formData: FormData) => {
    "use server";

    const id = formData.get("id") as string;

    await deletePerson(id);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pessoas</h1>

        <Button asChild>
          <Link href="/people/create">
            Adicionar nova <Plus className="ml-2 size-4" />
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={1}>Nome</TableHead>
            <TableHead colSpan={1}>Tipo</TableHead>
            <TableHead colSpan={1}>Email</TableHead>
            <TableHead className="text-right">Editar</TableHead>
            <TableHead className="text-right">Excluir</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person.id}>
              <TableCell className="font-medium" colSpan={1}>
                {person.name}
              </TableCell>
              <TableCell className="font-medium" colSpan={1}>
                <Badge className={person.type === 'admin' ? 'bg-red-600' : 'bg-green-600'}>{person.type}</Badge>
              </TableCell>
              <TableCell className="font-medium" colSpan={1}>
                {person.email}
              </TableCell>
              <TableCell className="text-right">
                <Button asChild variant="outline" size="icon">
                  <Link href={`/people/${person.id}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <form action={deletePersonWithId}>
                  <input type="hidden" name="id" value={person.id} />
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
            <TableCell className="text-right" colSpan={1}>
              {people.length}
            </TableCell>
          </TableRow>
        </TableFooter>
        <TableCaption>Uma lista das pessoas cadastradas.</TableCaption>
      </Table>
    </div>
  );
};

export default PeoplePage;
