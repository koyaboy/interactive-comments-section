import React from 'react'

import axios from "axios"
import { useQueryClient, useMutation } from '@tanstack/react-query'

type deleteModalProps = {
    commentId: string
    replyId: string
    setShouldDelete: React.Dispatch<React.SetStateAction<boolean>>
    setCommentId: React.Dispatch<React.SetStateAction<string>>
    setReplyId: React.Dispatch<React.SetStateAction<string>>
}

const DeleteModal = ({ commentId, replyId, setShouldDelete, setCommentId, setReplyId }: deleteModalProps) => {

    const queryClient = useQueryClient()

    const middleOfScreen = window.innerHeight / 2.5;

    window.scrollTo({
        top: middleOfScreen,
        behavior: 'smooth'
    });

    const handleDelete = async () => {
        if (commentId) {
            try {
                const response = await axios.delete(`https://interactive-comments-section-api-an2t.onrender.com/comments/${commentId}`)
                return response.data
            } catch (error) {
                console.error(error)
            }
        }

        else if (replyId) {
            try {
                const response = await axios.delete(`https://interactive-comments-section-api-an2t.onrender.com/reply/${replyId}`)
                return response.data
            } catch (error) {
                console.error(error)
            }
        }
    }

    const { mutateAsync: handleDeleteMutation } = useMutation({
        mutationFn: handleDelete,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['comments'] })
        },
    })

    return (
        <>
            <div className='bg-white absolute top-[65%] p-5 z-10 rounded-md mr-4 sm:mr-16 md:mr-36 lg:w-[30%] lg:ml-[20%]'>
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
                        onClick={async () => {
                            await handleDeleteMutation()
                            setShouldDelete(false)
                        }}
                    >
                        YES, DELETE
                    </button>
                </div>
            </div>
        </>
    )
}

export default DeleteModal