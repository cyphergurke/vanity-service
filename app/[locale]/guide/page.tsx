import React from 'react'

const page = () => {
    return (
        <div className=' flex justify-center w-full h-full mt-20 '>
            <div className="relative bottom-0 w-[90%] md:w-2/3 lg:w-1/3 pt-5 px-4 md:lg:px-6 rounded-md">
                <div className="absolute inset-0 bg-slate-950 opacity-45 rounded-md pointer-events-none"></div>
                <div className=' relative p-5 text-white z-10'>

                    <h1>Bitcoin Uni</h1>
                    <p>The Bitcoin Uni is a blog and in 2020 we developed the leading Vanity Address Generator </p>
                </div>
            </div>
        </div >
    )
}

export default page
