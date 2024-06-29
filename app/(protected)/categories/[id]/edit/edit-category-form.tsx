"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ActionResponse } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EditCategoryForm = ({
  updateCategoryWithId,
  categoryName,
}: {
  updateCategoryWithId: (formData: FormData) => Promise<ActionResponse>;
  categoryName: string;
}) => {
  const router = useRouter();

  return (
    <div className="p-4 flex gap-4 flex-col">
      <form
        action={async (formData: FormData) => {
          const updatedCategory = await updateCategoryWithId(formData);

          if (updatedCategory.status === "error")
            return toast.error(updatedCategory.message);

          toast.success(updatedCategory.message);
          router.push("/categories");
        }}
        className="space-y-4"
      >
        <h1 className="font-bold text-3xl">Editar categoria</h1>

        <Card className="p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                name="name"
                type="text"
                placeholder="Insira aqui o nome"
                defaultValue={categoryName}
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

export default EditCategoryForm;
