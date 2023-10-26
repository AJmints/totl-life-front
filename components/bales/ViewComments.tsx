import { useEffect } from 'react'
import Image from 'next/image'
import userIcon from '../../public/icons/profile-pic.png'


const URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function ViewComments(props: any) {

    useEffect(() => {
        const getComments = async() => {
            const getRequest = await fetch( URL + "/logs/get-bale-comments/" + props.baleId )
            const response= await getRequest.json().catch((err) => {
                console.log(err)
            })
            props.setFetchResponse(response)
            return
        }
        if (props.fetchResponse.length === 0) {
        getComments()
        }
        console.log(props)

    }, []) 

    const displayComments = props.fetchResponse.map((comment: any) => {
        console.log(comment)
        return (
            <div className='my-3 flex items-center' key={comment.id}>
                <div className='mr-4'>
                {  comment.userPFP === "" ? 
                    <div>
                    <Image
                        src={userIcon}
                        alt=''
                        width={50}
                        height={50}
                        className='rounded-full mx-auto'
                        onClick={() => console.log(props.userPFP)}
                    /> 
                    </div>
                    :
                    <Image 
                        src={'data:image/jpeg;base64,' + comment.userPFP}
                        alt=''
                        width={50}
                        height={50}
                        className='rounded-full mx-auto'
                        onClick={() => console.log(props.userPFP)}
                    />
                }
                <h3 className='text-xs font-light text-gray-200'>user/{comment.userName}</h3>
                </div>
                <div className='bg-gray-400 p-3 rounded-md'>
                <h1>{comment.comment}</h1>
                </div>
            </div>
        )
    })

    return (
        <div>
        { props.fetchResponse.length === 0 ? 
        <div className='flex justify-center'>
            <h1 className='bg-gray-300 p-3 mt-5 rounded-md'>There are no comments in this Bale yet...</h1>
        </div>
        :
        <div>
        {displayComments}
        </div>
        }
        </div>
    )
}