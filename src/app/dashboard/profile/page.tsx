'use client'

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {

    const { data: session } = useSession()

    useEffect(
        () => {
            console.log(session)
        },
        [session]
    )

  return (
    <div>
      <h1>Profile</h1>
      <hr />
    </div>
  );
}