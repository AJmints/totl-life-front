'use client'

import { useState, useEffect } from 'react'
import { useUserContext } from '@/app/context/UserContextProvider'
import DownCountButton from '../../buttons/bale-post-buttons/downvote/DownVoteButton'
import ShareLinkButton from '../../buttons/bale-post-buttons/share/ShareLinkButton'
import FavoriteSaveButton from '../../buttons/bale-post-buttons/favorite-save/FavoriteSaveButton'
import BaleEditOptionButton from '../../buttons/bale-post-buttons/edit-options/BaleEditOptionButton'
import UpVoteButton from '../../buttons/bale-post-buttons/upvote/UpVoteButton'

const SocialActionBarContainer = (props: any) => {

    const [upCount, setUpCount] = useState<number | null>(null)
    const [downCount, setDownCount] = useState<number | null>(null)
    

    const { userName } = useUserContext()

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

    const editThisPost = async(event: any) => {
        event.preventDefault()

        const data = {
            place: event
        }
        const editBale = await fetch(URL + "/logs/baleEdit/" + props.optionReact.baleId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const response = await editBale.json().catch((err) => {
            console.log(err)
        })
    }

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

            <BaleEditOptionButton 
            baleId={props.socialInfo.id}
            redirect={false}
            isActive={props.socialInfo.tName === userName}
            setBaleEditToggle={props.setBaleEditToggle}
            />
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