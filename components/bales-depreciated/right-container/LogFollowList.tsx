import Link from 'next/link'

let USER_ID: string
export const authCheck = async() => {
    const infoCall = await fetch("/api/authCheck")
    const status = await infoCall.json().catch((err) => {
        console.log(err)
    })
    if (status.loggedIn) {
        USER_ID = status.id
        return status.loggedIn
    }
}
export const token = async() => {
    const getToken = await fetch("/api/headers")
    const status = await getToken.json().catch((err) => {
        console.log(err)
    })
    return status
}

interface LogFollowListProps {
    joinedLogs: string[],
}

const LogFollowList = (props: LogFollowListProps) => {

    return (
        <div className='bg-gray-700/90 p-4 rounded-md w-72 mx-2'>
            <h1 className='text-gray-300 text-2xl border-b-[1px] mb-2'>Following</h1>
            {props.joinedLogs.map((item: string) => {
                return (
                    <div  key={item}>
                    <Link 
                    href={"/logs/" + item} 
                    className='text-gray-300 text-sm text-left hover:text-emerald-500 duration-300'>log/{item}</Link>
                    </div>
                )
            })}
        </div>
    )
}

export default LogFollowList