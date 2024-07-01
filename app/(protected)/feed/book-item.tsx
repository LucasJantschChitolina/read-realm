import { Book } from "@/db/schema";
import { Card } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const BookItem = (book: Book) => {
  return (
    <Link href={`/books/${book.id}/edit`}>
      Ver livro
      <div
        key={book.id}
        className="p-4 bg-transparent border-none flex flex-col items-center gap-2"
      >
        <Image
          alt={book.title + " cover"}
          src={book.cover}
          width={150}
          height={250}
          className="object-cover aspect-[8/12]"
        />
        <h2 className="font-bold">{book.title}</h2>
      </div>
    </Link>
  );
};
