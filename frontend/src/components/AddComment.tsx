import React, { useState } from 'react'
import axios from "axios"
import { useQueryClient, useMutation } from '@tanstack/react-query'


type User = {
    _id: string,
    img: string,
    username: string
}


type AddCommentProps = {
    currentUser: User
    isReplying: boolean
    commentId: string
    setIsReplying: React.Dispatch<React.SetStateAction<boolean>>
}

const AddComment = ({ currentUser, isReplying, setIsReplying, commentId }: AddCommentProps) => {

    const [comment, setComment] = useState<string>("")

    const queryClient = useQueryClient()

    const postNewComment = async () => {
        const newComment = {
            content: comment,
            createdAt: "Just Now",
            score: 0,
            user: currentUser._id
        }

        try {
            const response = await axios.post("https://interactive-comments-section-api-an2t.onrender.com/comments", newComment)
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    const postNewReply = async () => {
        const newReply = {
            content: comment,
            createdAt: "Just Now",
            score: 0,
            user: currentUser._id
        }

        try {
            const response = await axios.post(`https://interactive-comments-section-api-an2t.onrender.com/reply/${commentId}`, newReply)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const { mutateAsync: handlePostReplyMutation } = useMutation({
        mutationFn: postNewReply,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['comments'] })
        },
    })

    const { mutateAsync: handlePostCommentMutation } = useMutation({
        mutationFn: postNewComment,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['comments'] })
        },
    })

    return (
        <div className='bg-white p-4 mt-4 rounded-lg lg:flex lg:relative lg:gap-6 lg:items-start'>

            <textarea
                placeholder='Add a comment...'
                className='border border-light-gray px-5 py-2 w-full rounded-md lg:order-2 lg:w-[79%] 
                hover:cursor-pointer focus:outline-none focus:border-moderate-blue'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <div className='flex justify-between mt-4 items-center lg:order-1 lg:mt-0'>
                <img
                    src={currentUser.img}
                    alt={currentUser.username}
                    className="w-8 h-8"
                />

                <button
                    className='bg-moderate-blue text-white px-6 py-2 rounded-md lg:absolute lg:right-4 hover:cursor-pointer lg:hover:opacity-40'
                    onClick={isReplying ?
                        async () => {
                            try {
                                await handlePostReplyMutation()
                                setComment("")
                                setIsReplying(false)
                            } catch (error) {
                                console.error(error)
                            }
                        }
                        :
                        async () => {
                            try {
                                await handlePostCommentMutation()
                                setComment("")
                            }
                            catch (error) {
                                console.error(error)
                            }
                        }
                    }
                >
                    {isReplying ? "REPLY" : "SEND"}
                </button>
            </div>

        </div>
    )
}

export default AddComment