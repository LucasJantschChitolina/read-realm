import { getAuthor, updateAuthor } from "../../actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const AuthorEdit = async ({ params }: { params: { id: string } }) => {
  const authorData = await getAuthor(params.id);

  const updateAuthorWithId = updateAuthor.bind(null, authorData.id);

  return (
    <div className="p-4 flex gap-4 flex-col">
      <form action={updateAuthorWithId} className="space-y-4">
        <h1 className="font-bold text-3xl">Editar autor</h1>

        <Card className="p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input name="name" type="text" defaultValue={authorData.name} placeholder="Insira aqui o nome" />
            </div>

            <div className="flex justify-end mt-4">
              <Button type="submit">Salvar</Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default AuthorEdit;
