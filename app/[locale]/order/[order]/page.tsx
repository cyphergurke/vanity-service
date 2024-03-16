import React from 'react'

const page = ({ params }: any) => {
    return (
        <div className='flex justify-center items-center'>
            <p className='text-xl text-white'>
                {params.order}
            </p>
        </div>
    )
}

export default page