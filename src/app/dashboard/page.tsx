import { WidgetItem } from '@/components'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function NamePage() {

    const session = await auth()

    if (!session) redirect('/api/auth/signin')

    return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

            <WidgetItem title="User connected Server Side" >
                <>{ JSON.stringify(session.user) }</>
            </WidgetItem>

        </div>
    );
}