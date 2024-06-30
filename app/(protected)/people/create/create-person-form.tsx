"use client";

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
import { ActionResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CreatePersonForm = ({
  createPerson,
}: {
  createPerson: (formData: FormData) => Promise<ActionResponse>;
}) => {
  const router = useRouter();

  return (
    <div className="p-4 flex gap-4 flex-col">
      <form
        action={async (formData: FormData) => {
          const createdPerson = await createPerson(formData);

          if (createdPerson.status === "error") {
            return toast.warning(createdPerson.message);
          }

          toast.success(createdPerson.message);
          router.push("/people");
        }}
        className="space-y-4"
      >
        <h1 className="font-bold text-3xl">Adicionar Pessoa</h1>

        <Card className="p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  required
                  name="name"
                  type="text"
                  placeholder="Insira aqui o nome"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="studentEnrollment">Matrícula</Label>
                <Input
                  required
                  name="studentEnrollment"
                  type="studentEnrollment"
                  placeholder="Insira a matrícula do aluno"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  required
                  name="email"
                  type="email"
                  role="presentation"
                  autoComplete="off"
                  placeholder="Insira aqui o email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  required
                  name="phone"
                  type="tel"
                  placeholder="Insira aqui o telefone"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="status">Status</Label>
                <Select required name="status" defaultValue="active">
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

export default CreatePersonForm;
