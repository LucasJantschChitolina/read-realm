import Link from "next/link";
import { ReactNode } from "react";
import {
  HomeIcon,
  Users,
  Edit,
  BookOpenText,
  LibraryBig,
  ShoppingBasket,
  FileBarChart2,
  BookHeart,
  BookPlus,
} from "lucide-react";

interface ItemProps {
  icon: ReactNode;
  href: string;
  children: ReactNode;
  active?: boolean;
}

function NavBarItem(props: ItemProps) {
  return (
    <Link
      className="transition-colors hover:bg-muted/50 duration-200 py-2 px-3 rounded-md flex gap-2 items-center"
      href={props.href}
    >
      <span
        className={`p-1 bg-gray-400 rounded-lg ${
          props.active && "bg-emerald-500"
        }`}
      >
        {props.icon}
      </span>
      {props.children}
    </Link>
  );
}

export default function NavBar() {
  return (
    <nav className="h-full w-64 p-4 flex flex-col gap-4 font-medium">
      <NavBarItem
        href="/feed"
        active
        icon={<HomeIcon className="text-white" size={16} />}
      >
        Feed
      </NavBarItem>
      <NavBarItem
        href="/books/create"
        icon={<BookPlus className="text-white" size={16} />}
      >
        Livros
      </NavBarItem>
      <NavBarItem
        href="/publishers"
        icon={<Edit className="text-white" size={16} />}
      >
        Editoras
      </NavBarItem>
      <NavBarItem
        href="/authors"
        icon={<BookOpenText className="text-white" size={16} />}
      >
        Autores
      </NavBarItem>
      <NavBarItem
        href="/categories"
        icon={<LibraryBig className="text-white" size={16} />}
      >
        Categorias
      </NavBarItem>
      <NavBarItem
        href="/people"
        icon={<Users className="text-white" size={16} />}
      >
        Pessoas
      </NavBarItem>
      <NavBarItem
        href="/loans"
        icon={<ShoppingBasket className="text-white" size={16} />}
      >
        Empréstimos
      </NavBarItem>
 
      <NavBarItem
        href="/report"
        icon={<FileBarChart2 className="text-white" size={16} />}
      >
        Relatório
      </NavBarItem>
    </nav>
  );
}
