import Image from "next/image"
import options from '../../../../../../public/icons/options.png'

const BaleEditOptionButton = () => {

    const baleMenuOption = () => {
        console.log("Options")
    }

    return (
        <div className="flex items-center">
            <Image
                src={options}
                alt=''
                className='cursor-pointer hover:shadow-lg hover:shadow-gray-600 h-9 hover:bg-red-500/80 w-auto rounded-md duration-300 mr-1 px-3 py-2 '
                onClick={() => baleMenuOption()}
            />
        </div>
    )
}

export default BaleEditOptionButton