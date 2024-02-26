import waiting from '../../../../public/images/waiting-for-more.jpg'

const LoadingBalesSkeleton = () => {

    return (
        <div className="h-screen w-auto flex justify-center">
            <div className=" bg-gray-500 rounded-md"
            style={{
                backgroundImage: `url(${waiting.src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: '50%',
                backgroundAttachment: 'fixed',
                width: '100%',
                height: '100%',
              }}>
                <div className='bg-gray-800/40 rounded-md h-full flex items-center justify-center'>
                    <p className='text-gray-200 font-light mx-20 sm:mx-32 md:mx-64 lg:mx-80 xl:mx-64'>Waiting for others to join this log</p>
                </div>
                
            </div>
        </div>
    )
}

export default LoadingBalesSkeleton