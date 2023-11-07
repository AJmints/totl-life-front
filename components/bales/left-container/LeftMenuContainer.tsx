import Link from 'next/link'

interface LeftMenuContainerProps {
   allLogNames: string[]
}

export default function LeftMenuContainer(props: LeftMenuContainerProps) {
     return (
        <div>
        <div className="hidden xl:block xl:max-w-xs">

        <div className="w-80  over h-1">
        </div>

         <div className='bg-gray-700/90 mx-2 rounded-md py-4 text-gray-300'>
         <h1 className='text-2xl border-b-[1px] mx-2'>Visit Logs</h1>
         <div className='mt-3 text-base space-y-2'>
         {props.allLogNames.map((item:string) => {
         return (
            <div key={item}>
            <Link href={"/logs/" + item} className='hover:text-emerald-500 duration-300'>log/{item}</Link>
            </div>
         )
        })}
        </div>
        </div>

        <div className='bg-gray-700/90 mx-2 rounded-md mt-4 py-4 text-gray-300'>
         <h1 className='text-2xl border-b-[1px] mx-2'>Coming updates to Totl.Life</h1>
         <ul className='mt-3 text-base space-y-2 mx-4'>
            <div>
               <Link className='text-blue-300 border-b-[1px] border-blue-300' href={"/dapp"} target='_blank'>-View change list</Link>
            </div>
         </ul>
        </div>

        </div>
        </div>
     )
}