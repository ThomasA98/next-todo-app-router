'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import { CiLogout } from "react-icons/ci"
import { IoLogIn, IoShieldOutline } from "react-icons/io5"

export const LogoutButton = () => {

    const { data: session, status, } = useSession()

  return (
    <button
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
        disabled={ status === 'loading' }
        onClick={ () => {
            if (status === 'authenticated') return signOut()
            if (status === 'unauthenticated') return signIn()
        } }
    >
        {
            status === 'loading' && (
                <>
                    <IoShieldOutline />
                    <span className="group-hover:text-gray-700">Waiting</span>
                </>
            )
        }
        {
            status === 'authenticated' && (
                <>
                    <CiLogout />
                    <span className="group-hover:text-gray-700">Logout</span>
                </>
            )
        }
        {
            status === 'unauthenticated' && (
                <>
                    <IoLogIn />
                    <span className="group-hover:text-gray-700">Login</span>
                </>
            )
        }
    </button>
  )
}