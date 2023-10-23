import Link from 'next/link'

export default function LeftMenuContainer(props: any) {
     return (
        <div>
        <div className="hidden xl:block xl:max-w-xs">

        <div className="w-80  over h-1">
        </div>

         <div className='bg-gray-700/90 mx-2 rounded-md py-4 text-gray-300'>
         <h1 className='text-2xl border-b-[1px] mx-2'>Visit Logs</h1>
         <div className='mt-3 text-base space-y-2'>
         {props.allLogNames.map((item:any) => {
         return (
            <div key={item}>
            <Link href={"/logs/" + item} className='hover:text-emerald-500 duration-300'>log/{item}</Link>
            </div>
         )
        })}
        </div>
        </div>

        </div>
        </div>
     )
}