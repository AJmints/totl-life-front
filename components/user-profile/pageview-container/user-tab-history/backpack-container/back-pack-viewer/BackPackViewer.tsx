'use client'

import { useState } from "react"

import GearInspectorCard from "./gear-inspector-card/GearInspectorCard"
import GearViewer from "./pack-or-gear-viewer/GearViewer"
import PackConfigViewer from "./pack-or-gear-viewer/PackConfigViewer"
import PackInspectorCard from "./pack-inspector-card/PackInspectorCard"
import { useUserContext } from "@/app/context/UserContextProvider"

const BackPackViewer = (props: any) => {

    const [ viewSpecificGear, setViewSpecificGear ] = useState<any>()
    const [ viewToggle, setViewToggle ] = useState<boolean>(false)
    const [ packViewToggle, setPackViewToggle ] = useState<boolean>(true)
    const { userPackConfigs } = useUserContext()

    return (
        <>
        {props.packContents ? 
            <>
            
            <div>

                <div className="mt-2 flex">
                    {/* Button to select viewing of all user gear or the packs the user has configured */}
                    <h1 className="text-2xl font-normal">Viewing</h1> 
                    <div className="ml-2 space-x-2 flex bg-gray-600 p-1 rounded-md">
                        <button onClick={() => setPackViewToggle(true)} className={packViewToggle ? "bg-emerald-500 p-1 rounded-md" : "bg-gray-500 p-1 rounded-md"}>All User Gear</button>
                        <button onClick={() => setPackViewToggle(false)} className={packViewToggle ? "bg-gray-500 p-1 rounded-md" : "bg-emerald-500 p-1 rounded-md"}>User Packs</button>
                    </div>
                </div>
                
                { viewToggle ?
                    <>
                    {/* Selected gear item/pack config and view it's details */}
                    { packViewToggle ? 
                        <GearInspectorCard
                        viewSpecificGear={viewSpecificGear}
                        setViewToggle={setViewToggle}
                        />
                        :
                        <PackInspectorCard
                        />
                    }
                    </>
                    
                    :
                    <>
                    {/* Display all the users gear/pack configs */}
                    { packViewToggle ? 
                        <GearViewer
                        setViewSpecificGear={setViewSpecificGear}
                        setViewToggle={setViewToggle}
                        />
                        :
                        <PackConfigViewer
                        userPackConfigs={userPackConfigs}
                        />
                    }
                    </>
                    
                }

            </div>
            
            </>
            :
            <>Loading</>
        } 
        </>
    )
}

export default BackPackViewer