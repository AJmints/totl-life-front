import { useEffect, useState } from "react"

type ShareButtonLogicProps = {
    shareFromPreview: string | undefined
}

const ShareButtonLogic = (props: ShareButtonLogicProps) => {

    const [ currentUrl, setCurrentUrl ] = useState<string>("")
    const [ copyNotification, setCopyNotification ] = useState<boolean>(false) 

    useEffect(() => {
        setCurrentUrl(window.location.href)
    }, [])

    const copyToClip = async() => {
        if (copyNotification) {
            return
        }
        try {
            if (props.shareFromPreview === undefined) {
                await navigator.clipboard.writeText(currentUrl)
            } else {
                await navigator.clipboard.writeText(currentUrl + "/" + props.shareFromPreview)
            }
            setCopyNotification(true)
            setInterval(() => {
                setCopyNotification(false)
            }, 3000)
        } catch (err) {
            console.log("failed to copy", err)
        }
    }

    return (
        <div className="absolute flex p-1 bg-gray-300 rounded-md mb-20">
            <div className="flex">
                <div className="p-2 bg-gray-400 rounded-md cursor-pointer hover:bg-emerald-500 duration-200" onClick={() => copyToClip()}>
                    <p>{copyNotification ? "Copied!" : "Copy to ClipBoard"}</p>
                </div>
            </div>
        </div>
    )
}

export default ShareButtonLogic