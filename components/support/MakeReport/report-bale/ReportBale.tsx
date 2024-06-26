import Image from "next/image"
import pfpDefault from '../../../../public/icons/profile-pic.png'
import MakeReport from "../MakeReport"

const ReportBale = (props: any) => {

    const content = props.content

    return (
            <>
                <div className="flex mb-2">
                    <p className="text-2xl font-light  p-3 rounded-md bg-gray-400 ">Report Bale</p>
                </div>
                
                <div className="p-2 bg-gray-700/90 rounded-md mb-3">
                <div className="flex mb-2 justify-between items-center">
                    <div className="sm:flex items-center sm:space-x-2">
                        <p className='text-left font-normal text-sm cursor-pointer my-2 bg-gray-400 p-2 rounded-md hover:bg-emerald-500 duration-200'>log/{content?.parentLog}</p>
                        <p className={content?.edited ? " text-xs text-gray-400" : "hidden"}>[Edited]</p>
                    </div>
                <div className="flex justify-center items-center">
                    <Image
                        src={content?.userPFP === null || content?.userPFP === undefined ? pfpDefault : 'data:image/jpeg;base64,' + content?.userPFP}
                        alt=""
                        width={30}
                        height={30}
                        className="mr-2 w-10 h-10 rounded-full cursor-pointer"
                    />
                <div className="flex justify-center items-center text-sm font-light text-gray-300">
                    <p>t/</p>
                    <p className="cursor-pointer">{content?.userName}</p>
                </div>
                </div>
                </div>
                <div className="bg-gray-300 rounded-t-md flex p-3">
                    <h1 className="text-lg sm:text-2xl font-light">{content?.title}</h1>
                </div>
                
                <div className="bg-gray-400 rounded-b-md flex p-3 mb-2">
                    <h1 className="text-sm sm:text-lg font-light">{content?.body}</h1>
                </div>
                </div>
                <MakeReport 
                baleId={content?.id}
                type={"bale"}
                />
            </>
    )
}

export default ReportBale