import { Book } from "@/db/schema";
import { Card } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Link from "next/link";

export const BookItem = (book: Book) => {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Card
          key={book.id}
          className="p-4 shadow-md hover:bg-slate-400 duration-300 flex justify-between items-center h-64"
        >
          <h2 className="font-bold">{book.name}</h2>
          <p>{book.author}</p>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="w-96 flex flex-col p-4 gap-2">
        <h2 className="font-bold">{book.name}</h2>
        <p>{book.author}</p>

        <Link
          className="p-4 bg-emerald-500 rounded-md"
          href={`/books/${book.id}`}
        >
          View
        </Link>
      </DrawerContent>
    </Drawer>
  );
};
