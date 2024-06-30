"use client";

import { Button } from "@/components/ui/button";
import { ActionResponse } from "@/types";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeleteButton = ({
  deleteFn,
  id,
  redirectAfterDelete,
}: {
  deleteFn: (id: string) => Promise<ActionResponse>;
  id: string;
  redirectAfterDelete: string;
}) => {
  const router = useRouter();

  return (
    <form
      action={async (formData: FormData) => {
        const id = formData.get("id") as string;

        const deletedItem = await deleteFn(id);

        if (deletedItem.status === "error") {
          return toast.warning(deletedItem.message);
        }

        toast.success(deletedItem.message);
        router.push(`/${redirectAfterDelete}`);
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button variant="destructive" size="icon">
        <TrashIcon className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default DeleteButton;
