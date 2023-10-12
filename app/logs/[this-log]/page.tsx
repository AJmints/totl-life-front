import BalesContainer from "@/components/bales/BalesContainer"

export default function SpecificLogPage() {

    return (
        <div className="">
            <div className="flex  w-[100%]">
                <div className="hidden shadow-lg xl:flex xl:w-[50%] text-lg font-bold text-center p-1 rounded-lg">
                    <BalesContainer />
                    
                </div>
                <div className="shadow-lg text-lg font-bold text-center rounded-lg">
                    <BalesContainer />
                </div>
                <div className="hidden md:flex shadow-xl md:w-[50%] xl:w-[30%] text-lg font-bold text-center rounded-lg">
                    <BalesContainer />
                </div>
            </div>
        </div>
    )
}