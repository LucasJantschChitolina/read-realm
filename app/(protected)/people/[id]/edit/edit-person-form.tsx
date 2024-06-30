"use client";

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
import { ActionResponse } from "@/types";
import { Person } from "@/db/schema";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

const EditPersonForm = ({
  updatePerson,
  personData,
}: {
  updatePerson: (id: string, formData: FormData) => Promise<ActionResponse>;
  personData: Person;
}) => {
  const router = useRouter();

  return (
    <div className="p-4 flex gap-4 flex-col">
      <form
        action={async (formData: FormData) => {
          const updatedPerson = await updatePerson(personData.id, formData);

          if (updatedPerson.status === "error")
            return toast.error(updatedPerson.message);

          toast.success("Pessoa atualizada com sucesso");
          router.push("/people");
        }}
        className="space-y-4"
      >
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
                <Label htmlFor="studentEnrollment">Matrícula</Label>
                <Input
                  name="studentEnrollment"
                  type="studentEnrollment"
                  defaultValue={personData.studentEnrollment}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  role="presentation"
                  defaultValue={personData.email || ""}
                  autoComplete="off"
                  placeholder="Insira aqui o email"
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

              <div className="flex flex-col gap-2">
                <Label htmlFor="cpf">Status</Label>
                <Select name="status" defaultValue={personData.status}>
                  <SelectTrigger>
                    <SelectValue />
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
              <Button type="submit">Editar</Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default EditPersonForm;
