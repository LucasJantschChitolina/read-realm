import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@/db/index";
import { author } from "@/db/schemaAuthor"; 
import { createAuthor } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AuthorItem from "./author-item"; 

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const authorData = await db.select().from(author); 

  return (
    <div className="bg-gray-400 h-full p-4">
      <h1 className="text-3xl font-semibold mb-4">Author</h1>

      <form action={createAuthor}>
        <Card className="p-4 flex flex-col gap-2">
          <h1 className="font-bold text-2xl">Create Author</h1>

          <div className="flex flex-row gap-2">
            <Input name="name" type="text" placeholder="Name" />
            <Button type="submit">Create</Button>
          </div>
        </Card>
      </form>

      {authorData.map((author) => (
        //<AuthorItem key={author.id} {...author} /> 
      ))}
    </div>
  );
}
