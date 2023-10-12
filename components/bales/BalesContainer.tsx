import RecentBales from "./RecentBales"
import BalesOptions from "./BalesOptions"

export default function BalesContainer() {

    return (
        <>
        <div className="space-y-4 my-5 mx-2">
            <div>
            <BalesOptions/>
            </div>
            <RecentBales />
            <RecentBales />
            <RecentBales />
        </div>  
        </>
    )
}