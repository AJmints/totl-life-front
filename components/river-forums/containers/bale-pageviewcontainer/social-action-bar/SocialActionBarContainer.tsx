'use client'

import { useState, useEffect } from 'react'
import DownCountButton from '../../buttons/bale-post-buttons/downvote/DownVoteButton'
import ShareLinkButton from '../../buttons/bale-post-buttons/share/ShareLinkButton'
import FavoriteSaveButton from '../../buttons/bale-post-buttons/favorite-save/FavoriteSaveButton'
import BaleEditOptionButton from '../../buttons/bale-post-buttons/edit-options/BaleEditOptionButton'
import UpVoteButton from '../../buttons/bale-post-buttons/upvote/UpVoteButton'

const SocialActionBarContainer = (props: any) => {

    const [upCount, setUpCount] = useState<number | null>(null)
    const [downCount, setDownCount] = useState<number | null>(null)

    useEffect(() => {
        const setItems = () => {
            const up = props.socialInfo.upVote
            const down = props.socialInfo.downVote
            setUpCount(up.length)
            setDownCount(down.length)
        }

        if (props.socialLoader) {
            setItems()
        }
    }, [props.socialLoader])

    return (
        <>
        {props.socialLoader ? 
        <div className="bg-gradient-to-l from-gray-600 to-gray-300/70 px-2 py-1 rounded-md mt-2 flex justify-around">
            <div className='flex sm:space-x-2'>
            <UpVoteButton
            id={props.socialInfo.id}
            setUpCount={setUpCount}
            setDownCount={setDownCount}
            upCount={upCount!}
            />
            <DownCountButton
            id={props.socialInfo.id}
            setUpCount={setUpCount}
            setDownCount={setDownCount}
            downCount={downCount!}
            />
            </div>
            <ShareLinkButton />
            <FavoriteSaveButton />
            <BaleEditOptionButton />
        </div>
        :
        <div className="bg-gray-500 p-2 rounded-md mt-2">
            <div className='p-3 bg-gray-300/70 animate-pulse rounded-md'></div>
        </div>
        }
        </>
    )
}

export default SocialActionBarContainer