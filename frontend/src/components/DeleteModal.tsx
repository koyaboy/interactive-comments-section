import React from 'react'

import axios from "axios"


type deleteModalProps = {
    commentId: string
    replyId: string
    setShouldDelete: React.Dispatch<React.SetStateAction<boolean>>
    setCommentId: React.Dispatch<React.SetStateAction<string>>
    setReplyId: React.Dispatch<React.SetStateAction<string>>
}
const DeleteModal = ({ commentId, replyId, setShouldDelete, setCommentId, setReplyId }: deleteModalProps) => {

    const middleOfScreen = window.innerHeight / 2.5;

    window.scrollTo({
        top: middleOfScreen,
        behavior: 'smooth'
    });

    const handleDelete = () => {
        if (commentId) {
            axios.delete(`http://localhost:4000/comments/${commentId}`)
                .then((response) => {
                    console.log(response.data)
                    setShouldDelete(false)
                })
                .catch((error) => console.log(error))

            setCommentId("")
        }

        else if (replyId) {
            axios.delete(`http://localhost:4000/reply/${replyId}`)
                .then((response) => {
                    console.log(response.data)
                    setShouldDelete(false)
                })
                .catch((error) => console.log(error))

            setReplyId("")
        }

    }

    return (
        <>
            <div className='bg-white absolute top-[65%] p-5 z-10 rounded-md mr-4'>
                <h2 className="text-dark-blue font-medium">Delete comment</h2>
                <p className='text-grayish-blue mt-3'>
                    Are you sure you want to delete this comment?
                    This will remove the comment and can't be undone
                </p>
                <div className='flex justify-between mt-3'>
                    <button
                        className='bg-grayish-blue text-white p-2 rounded-md px-4'
                        onClick={() => setShouldDelete(false)}
                    >
                        NO, CANCEL
                    </button>
                    <button
                        className='bg-soft-red text-white p-2 rounded-md px-4'
                        onClick={handleDelete}
                    >
                        YES, DELETE
                    </button>
                </div>
            </div>
        </>
    )
}

export default DeleteModal