import Image from "next/image"
import { CiBookmarkCheck } from "react-icons/ci"
import { LogoutButton, SidebarItem, SidebarItemProps } from ".."
import { auth } from "@/auth"
import { IoPersonOutline } from "react-icons/io5"

const itemsMenu: SidebarItemProps[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <CiBookmarkCheck size={30} />
  },{
    href: '/dashboard/rest-todos',
    label: 'Rest TODOs',
    icon: <CiBookmarkCheck size={30} />
  },{
    href: '/dashboard/server-todos',
    label: 'Server TODOs',
    icon: <CiBookmarkCheck size={30} />
  },{
    href: '/dashboard/cookies',
    label: 'Cookies',
    icon: <CiBookmarkCheck size={30} />
  },{
    href: '/dashboard/products',
    label: 'Products',
    icon: <CiBookmarkCheck size={30} />
  },{
    href: '/dashboard/profile',
    label: 'Profile',
    icon: <IoPersonOutline size={30} />
  },
]

export const Sidebar = async () => {

  const session = await auth()

  const roles = (new Intl.ListFormat()).format(session?.user?.roles ?? [])

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            <a href="/dashboard" title="home">
              <Image
                src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
                className="w-32"
                alt="tailus logo"
                width={ 100 }
                height={ 100 }
            />
            </a>
          </div>

          <div className="mt-8 text-center">
            <Image
                src={
                  session?.user?.image ?? "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
                }
                className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                alt=""
                width={ 100 }
                height={ 100 }
            />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{ session?.user?.name ?? 'Non User Name' }</h5>
            <span className="hidden text-gray-400 lg:block">{ roles }</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {
                itemsMenu.map(item => (
                    <SidebarItem
                        key={ item.href }
                        { ...item }
                    />
                ))
            }
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <LogoutButton />
        </div>
      </aside>
  )
}