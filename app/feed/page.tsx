import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@/db/index";
import { books } from "@/db/schema";
import { createBook } from "./actions";
import { BookItem } from "./book-item";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const bookData = await db.select().from(books);

  return (
    <div className="bg-gray-400 h-full p-4">
      <h1 className="text-3xl font-semibold mb-4">feed</h1>

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

      {bookData.map((book) => (
        <BookItem {...book} />
      ))}
    </div>
  );
}
