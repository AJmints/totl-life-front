'use client'

import { useRouter } from "next/navigation"

const ReportButton = (props: any) => {

    const router = useRouter()

    const handleReport = () => {
        
            if (props.postDetails.type === "bale") {
                router.push("/support?id=" + props.postDetails.id + "&type=post&log=" + props.postDetails.log)
            } else if (props.postDetails.type === "comment") {

            }
        
    }
    
    return (
        <>
            <div className="p-2 bg-gray-300 rounded-md cursor-pointer hover:bg-emerald-500 duration-200" onClick={() => handleReport()}>
                <p>Report</p>
            </div>
        </>
    )
}

export default ReportButton