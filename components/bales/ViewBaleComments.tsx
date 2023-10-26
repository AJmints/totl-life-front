import { useState, useEffect } from "react"
import Image from "next/image"
import ViewComments from "./ViewComments"
import CreateComment from "./CreateComment"
import userIcon from '../../public/icons/profile-pic.png'

export default function ViewBaleComments (props: any) {
    const viewBale = props.baleInfo
    const [showComments, setShowComments] = useState(false)
    const [fetchResponse, setFetchResponse] = useState<any[]>([])

    useEffect(() => {
        // console.log(props.baleInfo)
    }, [])

    
    return (
        <div className="absolute p-2 shadow-lg shadow-gray-800/70 bg-gray-800 rounded-md">
        
        <div className="pb-4">
        <button onClick={() => props.setDetailView((prev: boolean) => !prev)} className="bg-gray-500 rounded-md px-1 hover:bg-emerald-600 duration-300 hover:px-3 hover:-mx-3 text-gray-300 hover:text-gray-800">Close</button>
        </div>
        <div className=" max-h-[30rem] sm:max-h-[45rem] p-3 rounded-md overflow-y-scroll">
        <div>
            <div className="flex mb-2 justify-between mx-4 items-center">
                <h1 className="text-gray-300 text-left text-sm">log/{viewBale.parentLog}</h1>
                <div className="flex justify-center items-center">
                    { viewBale.userPFP === "" ?
                        <div>
                        <Image
                            src={userIcon}
                            alt=''
                            width={90}
                            height={90}
                            className='mr-2 w-10 rounded-full'
                            onClick={() => console.log(viewBale.userPFP)}
                        /> 
                        </div>

                        :
                <Image
                    src={'data:image/jpeg;base64,' + viewBale.userPFP}
                    alt=""
                    width={30}
                    height={30}
                    className="mr-2 w-10 rounded-full"
                    onClick={() => console.log(viewBale.userPFP)}
                />
                    }
                <div className="flex justify-center items-center text-xs font-light text-gray-300">
                    <p>u/</p>
                    <p>{viewBale.userName}</p>
                </div>
                </div>
            </div>
            <div className="bg-gray-300 rounded-t-md flex p-3">
                <h1 className="text-lg sm:text-2xl font-light">{viewBale.title}</h1>
            </div>
            <div className="bg-gray-400 rounded-b-md flex p-3">
                <h1 className="text-sm sm:text-lg font-light">{viewBale.body}</h1>
            </div>
        </div>

        <div className="bg-gray-700/70 mt-2 pb-2 px-2 sm:px-5 rounded-md">
            <CreateComment 
            baleId={viewBale.id}
            setFetchResponse={setFetchResponse}
            fetchResponse={fetchResponse}
            />
        </div>

        <div>
            <div className="mt-4">
                <button 
                onClick={() => setShowComments(prev => !prev)}
                className="p-1 bg-gray-500 rounded-md hover:bg-emerald-500 duration-300 shadow-lg shadow-gray-800">
                    { showComments ? "Hide Comments" : "Show Comments"}
                </button>
            </div>
            <div className="pb-20">
            { showComments ?
            <ViewComments 
            baleId={viewBale.id}
            setFetchResponse={setFetchResponse}
            fetchResponse={fetchResponse}
            userPFP={viewBale.userPFP}
            />
            :
            <></>
            }
            </div>
        </div>

        </div>

        </div>
    )
}