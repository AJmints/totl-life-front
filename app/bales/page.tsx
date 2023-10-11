import RecentBales from "@/components/bales/RecentBales";

export default function BalesPage() {

    return (
        <div className="h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4 sm:p-2">
                <div className="shadow-lg bg-emerald-100/10 text-lg font-bold text-center p-1 rounded-lg">
                    <RecentBales />
                </div>
                <div className="shadow-lg bg-green-100 text-green-500  text-lg font-bold text-center p-5 rounded-lg">2</div>
                <div className="shadow-xl hidden xl:flex bg-green-100 text-green-500 text-lg font-bold text-center p-5 rounded-lg">3</div>
            </div>
        </div>
    )
}