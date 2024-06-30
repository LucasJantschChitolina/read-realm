import Link from "next/link";
import { deleteCategory, getCategories } from "./actions";
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
import { Plus, Edit } from "lucide-react";
import DeleteButton from "@/components/delete-button";

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categorias</h1>

        <Button asChild>
          <Link href="/categories/create">
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
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium" colSpan={4}>
                {category.name}
              </TableCell>
              <TableCell className="text-right">
                <Button asChild variant="outline" size="icon">
                  <Link href={`/categories/${category.id}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <DeleteButton
                  deleteFn={deleteCategory}
                  id={category.id}
                  redirectAfterDelete="categories"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right" colSpan={2}>
              {categories.length}
            </TableCell>
          </TableRow>
        </TableFooter>
        <TableCaption>Uma lista das categorias cadastradas.</TableCaption>
      </Table>
    </div>
  );
};

export default CategoriesPage;
