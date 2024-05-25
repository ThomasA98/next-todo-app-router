import { TabBar } from "@/components";
import { cookies } from "next/headers";

export const metadata = {
 title: 'Cookies Page',
 description: 'Cookies Page',
}

export default function CookiesPage() {

    const cookieStore = cookies()
    const selectedTab = Number(cookieStore.get('selected-tab')?.value ?? '1')

  return (
    <div className="grid grid-cols-1 gap-3">
        <div className="flex flex-col bg-gray-200 p-2 rounded-sm gap-2">
            <span className="text-3xl">Tabs</span>
            <TabBar currentIndex={ isNaN(selectedTab) ? 1 : selectedTab } />
        </div>
    </div>
  );
}