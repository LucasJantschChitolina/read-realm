import { updatePerson, getPerson } from "../../actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PersonEdit = async ({ params }: { params: { id: string } }) => {
  const personData = await getPerson(params.id);

  const updatePersonWithId = updatePerson.bind(null, personData.id);

  return (
    <div className="p-4 flex gap-4 flex-col">
      <form action={updatePersonWithId} className="space-y-4">
        <h1 className="font-bold text-3xl">Editar pessoa</h1>

        <Card className="p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  name="name"
                  type="text"
                  defaultValue={personData.name}
                  placeholder="Insira aqui o nome"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="type">Tipo</Label>
                <Select name="type" defaultValue={personData.type} disabled>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pessoa</SelectLabel>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="student">Estudante</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  role="presentation"
                  defaultValue={personData.email}
                  autoComplete="off"
                  placeholder="Insira aqui o email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  name="password"
                  type="password"
                  defaultValue={personData.password}
                  placeholder="Insira aqui a senha"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  name="phone"
                  type="tel"
                  defaultValue={personData.phone}
                  placeholder="Insira aqui o telefone"
                />
              </div>
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

export default PersonEdit;
