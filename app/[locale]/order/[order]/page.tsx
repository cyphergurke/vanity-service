import React from 'react'

type TPage = {
 params: { order: string }
}
const page = ({ params }: TPage) => {
    return (
        <div className='flex justify-center items-center'>
            <p>
                {params.order}
            </p>
        </div>
    )
}

export default page