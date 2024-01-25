'use client'

import arrow from '../../../../../public/icons/Arrow.png'
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useRiverContext } from '@/app/context/RiverContextProvider'
import Image from 'next/image'
// import FollowJoinLog from '../../buttons/follow-join-log/FollowJoinLog'
import Link from 'next/link'


const TermsAndConditions = () => {
return (<div className="mx-24 bg-gray-700/80 p-3 rounded-md shadow-lg shadow-gray-900/70">
        
<p className="text-lg text-center">
Terms and Tides: Navigating the River
<br></br>
<br></br>
<br></br>

Ahoy there, adventurous soul! Welcome to the whimsical waters of The River, where the current is strong, and the laughter flows freely. By embarking on this aquatic escapade, you agree to ride the waves with the following terms and tides!
<br></br>
<br></br>
1. Fishy Friendships:
<br></br>

Befriend the river inhabitants, especially the wise old catfish who may offer life advice in exchange for corny jokes. Failure to make at least one aquatic friend may lead to fin-tastic penalties.

<br></br>

2.Raft of Randomness:
<br></br>

You may encounter a raft of randomness floating downstream. Hitch a ride, share a joke, or perform a river dance to join the festivities.
<br></br>

3.Rapid Humor Rapids:
<br></br>

Brace yourself for the rapid-fire delivery of jokes. Laughing too hard may result in uncontrollable snorting, which is perfectly acceptable and encouraged except on Tuesdays, we wouldn't want to wake Larry.
<br></br>

4. Don't wake Larry:
<br></br>

Don't wake Larry.
<br></br>

5.Buoyant Banter Bylaws:
<br></br>

Engage in buoyant banter at all times. Float with the current of conversation, and beware of eddy-induced awkward silences.
<br></br>

6.Flood of Fun Guarantee:
<br></br>

In the unlikely event of a fun drought, please notify our Water Wit Department. We'll release a flood of humor to restore the jovial atmosphere.
<br></br>

7. Tidal Tickling:
<br></br>

Tidal tickling sessions may occur unexpectedly. Prepare to be tickled by invisible water nymphs or ticklish trout. Resistance is futile.
<br></br>

These terms are as fluid as the river itself and may change course without notice. Please feel free to express any complaints by writing them down, placing the note in a bottle, and tossing it in the river.
</p>

</div>)
}
export default TermsAndConditions