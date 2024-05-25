'use client'

import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useState } from "react"

// https://tailwindcomponents.com/component/radio-buttons-1

export interface TabBarProps {
    currentIndex?: number
    tabOptions?: number[]
}

export const TabBar: React.FC<TabBarProps> = ({ currentIndex = 1, tabOptions = [1, 2, 3, 4, 5] }) => {

    const [ selected, setSelected ] = useState(currentIndex)
    const router = useRouter()

    const onTabSelected = (tab: number) => {
        setSelected(tab)
        setCookie('selected-tab', tab.toString())
        router.refresh()
    }

    return (
        <div className={`flex space-x-2 rounded-xl bg-gray-50 p-2`}>
            {
                tabOptions.map(tab => (
                    <div key={ tab } className="min-w-20">
                        <input type="radio" id={ `${tab}` } checked={ selected === tab } onChange={ () => {} } className="peer hidden" />
                        <label onClick={ () => onTabSelected(tab) } className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                            { tab }
                        </label>
                    </div>
                ))
            }
        </div>
    )
}