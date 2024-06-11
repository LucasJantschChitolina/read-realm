import Link from "next/link";
import { ReactNode } from "react";
import { Settings, User, HomeIcon } from "lucide-react"

interface ItemProps {
    icon: ReactNode
    href: string
    children: ReactNode
    active?: boolean
}

function NavBarItem(props: ItemProps) {
    return (
        <Link className="hover:bg-slate-100 duration-200 py-2 px-3 rounded-md flex gap-2 items-center" href={props.href}>
            <span className={`p-1 bg-gray-400 rounded-lg ${props.active && "bg-emerald-500"}`}>{props.icon}</span>
            {props.children}
        </Link>
    )
}

export default function NavBar() {
    return (
        <nav className="h-full bg-slate-50 w-64 p-4 flex flex-col gap-4 font-medium">
            <NavBarItem href="/teste" active icon={<Settings className="text-white" size={16}  />}>
                Home
            </NavBarItem>
            <NavBarItem href="/teste" icon={<User className="text-white" size={16} />}>
                Texto
            </NavBarItem>

        </nav>
    );
}