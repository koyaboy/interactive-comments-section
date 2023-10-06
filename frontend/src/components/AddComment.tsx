import React from 'react'

type User = {
    id: string,
    img: string,
    username: string
}

type AddCommentProps = {
    currentUser: User
}

const AddComment = ({ currentUser }: AddCommentProps) => {
    return (
        <div className='bg-white p-4 mt-4 rounded-lg'>
            <textarea
                placeholder='Add a comment...'
                className='border border-light-gray px-5 py-2 w-full'
            />

            <div className='flex justify-between mt-4 items-center'>
                <img
                    src={currentUser.img}
                    alt={currentUser.username}
                    className="w-8"
                />

                <button
                    className='bg-moderate-blue text-white px-6 py-2 rounded-md'
                >
                    SEND
                </button>
            </div>


        </div>
    )
}

export default AddComment