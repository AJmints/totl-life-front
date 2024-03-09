'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import CreateComment from './create-comment/CreateComment'
import ViewComments from './view-comments/ViewComments'
import MainBale from './bale-main/MainBale'
import SocialActionBarContainer from './social-action-bar/SocialActionBarContainer'

type SocialBarProps = {
    id: number | null
    upVote: number[] | null
    downVote: number[] | null
}

const BalePostPageViewContainer = () => {
    // Refresh feed after submitting a new post
    const [ breaker, setBreaker ] = useState<boolean>(false)
    // Hides comments while post is loading
    const [ awaitLoader, setAwaitLoader ] = useState<boolean>(false) 
    const [ socialInfo, setSocialInfo ] = useState<SocialBarProps>({
        id: null,
        upVote: null,
        downVote: null,
    })

    const searchParams = useSearchParams()

    const id: string | null | undefined = searchParams?.get('baleid')


    return (
        <div className="flex">

            <div className="block md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto min-h-screen sm:flex justify-center">

            {/* Main container holding all displayed post information */}
            <div className="p-3 rounded-md bg-gray-700/80 m-1.5 sm:m-4">

                {/* Main body of post */}
                <div>
                    <MainBale 
                    setCommentLoader={setAwaitLoader}
                    setSocialInfo={setSocialInfo}
                    />
                    <SocialActionBarContainer
                    socialInfo={socialInfo}
                    socialLoader={awaitLoader}
                    />
                </div>

                <div>
                    <CreateComment 
                    baleId={id}
                    setBreaker={setBreaker}
                    commentLoader={awaitLoader}
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