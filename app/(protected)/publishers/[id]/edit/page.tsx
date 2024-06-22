import { getPublisher, updatePublisher } from "../../actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const PublisherEdit = async ({ params }: { params: { id: string } }) => {
  const publisherData = await getPublisher(params.id);

  const updatePublisherWithId = updatePublisher.bind(null, publisherData.id);

  return (
    <div className="p-4 flex gap-4 flex-col">
      <form action={updatePublisherWithId} className="space-y-4">
        <h1 className="font-bold text-3xl">Editar editora</h1>

        <Card className="p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                name="name"
                type="text"
                placeholder="Insira aqui o nome"
                defaultValue={publisherData.name}
              />
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

export default PublisherEdit;
