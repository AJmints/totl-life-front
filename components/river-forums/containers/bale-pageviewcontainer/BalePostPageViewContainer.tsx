'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import CreateComment from './create-comment/CreateComment'
import ViewComments from './view-comments/ViewComments'
import MainBale from './bale-main/MainBale'
import SocialActionBarContainer from './social-action-bar/SocialActionBarContainer'

const URL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL

const BalePostPageViewContainer = () => {

    const [ breaker, setBreaker ] = useState<boolean>(false)
    const [ commentLoader, setCommentLoader ] = useState<boolean>(false) 

    const searchParams = useSearchParams()

    const id: string | null | undefined = searchParams?.get('baleid')


    return (
        <div className="flex flex-col col-span-1">

            <div className="block md:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto min-h-screen sm:flex justify-center">

            {/* Main container holding all displayed post information */}
            <div className="p-3 rounded-md bg-gray-700/80 m-1.5 sm:m-4">

                {/* Main body of post */}
                <div>
                    <MainBale 
                    setCommentLoader={setCommentLoader}
                    />
                    <SocialActionBarContainer/>
                </div>

                <div>
                <CreateComment 
                baleId={id}
                setBreaker={setBreaker}
                commentLoader={commentLoader}
                />
                </div>

                <div>
                    <ViewComments
                    breaker={breaker}
                    />
                </div>

                
            </div>
        
        </div>

        {/* 2 columns, left is post title and body that flows down into comment box option and viewable comments from other users.
        2nd column has the community with the *pending* log rules
        
        Break each of these up and work on the get call that sends the data */}
        
        </div>
    )
}

export default BalePostPageViewContainer