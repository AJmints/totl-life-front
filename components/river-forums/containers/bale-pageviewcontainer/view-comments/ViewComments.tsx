import { useEffect, useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import userIcon from '../../../../../public/icons/profile-pic.png'


const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

type CommentInfoResponse = {
    comment: string,
    id: number,
    parentBaleId: number,
    userName: string,
    userPFP: any,
}

type ViewCommentsProps = {
    baleId: number,
    fetchResponse: CommentInfoResponse[],
    setFetchResponse: Function,
    userPFP: any,
}

export default function ViewComments(props: any) {

    const [comments, setComments] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const getComments = async() => {

            const id: string | null | undefined = searchParams?.get('baleid')
            const log: string | undefined = pathname?.split("/river/").pop()?.split("/").shift()

            if (id === null || id === undefined || id === "") {
                console.log("create error message if url has been tampered with")
                return
            }


            setLoading(true)
            const getRequest = await fetch( URL + "/logs/get-bale-comments/" + searchParams?.get('baleid') )
            const response: CommentInfoResponse[] = await getRequest.json().catch((err) => {
                console.log(err)
            })
            setLoading(false)
            setComments(response)
            return
        }
        getComments()
    }, [props.breaker]) 

    const displayComments = comments.map((comment: any) => {
        return (
            <div className='my-3 flex items-center' key={comment?.id}>
                <div className='mr-4'>
                {  comment.userPFP === null ? 
                    <div>
                    <Image
                        src={userIcon}
                        alt=''
                        width={50}
                        height={50}
                        className='rounded-full mx-auto h-12 w-12 cursor-pointer'
                        onClick={() => router.push("/user/" + comment.userName)}
                    /> 
                    </div>
                    :
                    <Image 
                        src={'data:image/jpeg;base64,' + comment.userPFP}
                        alt=''
                        width={50}
                        height={50}
                        className='rounded-full mx-auto h-12 w-12 cursor-pointer'
                        onClick={() => router.push("/user/" + comment.userName)}
                    />
                }
                <h3 className='text-xs font-light text-gray-200 cursor-pointer'>t/{comment.userName}</h3>
                </div>
                <div className='bg-gray-400 p-3 rounded-md'>
                <h1>{comment.comment}</h1>
                </div>
            </div>
        )
    })

    return (
        <div className='bg-gray-500/50 p-2 mt-2 rounded-md'>

            { loading ? 
            <div className='flex justify-center'>
                <h1 className='bg-gray-300 p-3 mt-5 rounded-md'>Loading/Refreshing Comments...</h1>
            </div>
            :
            <>
            { comments?.length === 0 ? 
            <div className='flex justify-center'>
                <h1 className='bg-gray-300 p-3 mt-5 rounded-md'>There are no comments in this Bale yet...</h1>
            </div>
            :
            <div>
            {displayComments}
            </div>
            }
            </>
            }
        </div>
    )
}