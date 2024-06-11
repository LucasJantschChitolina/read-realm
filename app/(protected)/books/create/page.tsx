import { createBook } from "../actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CreateBook = () => {
  return (
    <div className="p-4 flex gap-2 flex-col">
      <h1 className="font-bold">Create Book</h1>

      <form action={createBook}>
        <Card className="p-4 flex flex-col gap-2">
          <h1 className="font-bold text-2xl">Create Book</h1>

          <div className="flex flex-row gap-2">
            <Input name="name" type="text" placeholder="name" />
            <Input name="author" type="text" placeholder="author" />
            <Button type="submit">Create</Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default CreateBook;
