import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@/db/index";
import { book } from "@/db/schema";
import { BookItem } from "./book-item";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const bookData = await db.select().from(book);

  return (
    <div className="h-screen overflow-hidden p-4 flex gap-4 flex-col">
      <h1 className="text-3xl font-semibold">Feed</h1>

      {bookData && (
        <ScrollArea>
          <div className="grid grid-cols-6 gap-4">
            {bookData.map((book) => (
              <BookItem {...book} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
