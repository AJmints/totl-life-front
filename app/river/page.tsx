'use client'

import RiverPageStructure from "@/components/river-forums/RiverPageStructure"
// import { LogDescriptionProvider } from "../context/LogDescriptionProvidertest"

const River = ({ children }: any) => {

    return (
        <div>
            {/* <LogDescriptionProvider>
                {children} */}
                <RiverPageStructure />
            {/* </LogDescriptionProvider> */}
            
        </div>
    )
}

export default River