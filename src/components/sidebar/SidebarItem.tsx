'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

export interface SidebarItemProps {
    label: string
    icon: React.ReactNode
    href: string
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href }) => {

    const pathname = usePathname()

    const isActive = pathname === href

    return (
        <li>
            <Link
                href={ href }
                className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${ isActive ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : '' }`}>
                { icon }
                <span className="-mr-1 font-medium">{ label }</span>
            </Link>
        </li>
    )
}