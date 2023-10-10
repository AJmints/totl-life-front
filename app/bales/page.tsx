import RecentBales from "@/components/bales/RecentBales";

export default function BalesPage() {

    return (
        <div className="h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4 p-5">
                <div className="shadow-lg bg-green-100  h-96 text-lg font-bold text-center p-2 rounded-lg">
                    <RecentBales />
                </div>
                <div className="shadow-lg bg-green-100 text-green-500 h-96 text-lg font-bold text-center p-5 rounded-lg">2</div>
                <div className="shadow-xl hidden xl:flex bg-green-100 h-96 text-green-500 text-lg font-bold text-center p-5 rounded-lg">3</div>
            </div>
        </div>
    )
}