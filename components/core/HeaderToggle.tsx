export default function HeaderToggle(props: any) {

    return (
        <>
        {!props.menuToggle ?
        <div className="fixed z-10 left-0">
        <div className="w-52 min-h-screen bg-gray-300 rounded-md"></div>
        </div>
        :
        <div className="fixed z-10 -left-52">
            <div className="w-52 min-h-screen bg-gray-300 rounded-md"></div>
        </div>
        }
        </>
    )
}