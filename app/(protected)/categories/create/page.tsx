import { createCategory } from "../actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateCategory = () => {
  return (
    <div className="p-4 flex gap-4 flex-col">
      <form action={createCategory} className="space-y-4">
        <h1 className="font-bold text-3xl">Criar categoria</h1>

        <Card className="p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input name="name" type="text" placeholder="Insira aqui o nome" />
            </div>

            <div className="flex justify-end mt-4">
              <Button type="submit">Criar</Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default CreateCategory;
