export default function CreateNewComment () {

    const handleSubmit = async() => {

    }

    return (
        <div className="absolute">
        <div className="bg-gray-700/70 mt-2 px-2 sm:px-5 rounded-md">
        <form className="" onSubmit={handleSubmit}>
                
                <div className='w-full flex flex-col'>
                    <label className="text-gray-200 font-light" htmlFor='title'>Title</label>
                    <input 
                        className="rounded-md font-normal" 
                        type='text' 
                        autoComplete='off' 
                        placeholder="What do you want to talk about?"
                        id='title' 
                        required 
                        minLength={10} maxLength={300} 
                    />
                </div>
                <div className='w-full flex flex-col my-2'>
                <label className="text-gray-200 font-light" htmlFor='body'>Body</label>
                <textarea 
                    className="rounded-md font-normal" 
                    rows={3} 
                    placeholder="Give us some context!" 
                    name='body' 
                    required 
                    minLength={10} maxLength={600} 
                />
                </div>
                <button className="px-2 font-normal hover:text-gray-800 hover:bg-emerald-600 duration-300 text-gray-200 bg-gray-500 rounded-md">Submit</button>

            </form>
            <button onClick={() => console.log("It's alive!")}>TextButton</button>
        </div>
        </div>
    )
}