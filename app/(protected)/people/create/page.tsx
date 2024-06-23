import { createPerson } from "../actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreatePerson = () => {
  return (
    <div className="p-4 flex gap-4 flex-col">
      <form action={createPerson} className="space-y-4">
        <h1 className="font-bold text-3xl">Adicionar Pessoa</h1>

        <Card className="p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Insira aqui o nome"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="type">Selecione o tipo</Label>
                <Select name="type">
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
            <div className="grid grid-cols-4 gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  role="presentation"
                  autoComplete="off"
                  placeholder="Insira aqui o email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Insira aqui a senha"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Insira aqui o telefone"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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

export default CreatePerson;
