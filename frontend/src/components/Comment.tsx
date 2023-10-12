import React, { useState, useRef, Suspense } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import axios from "axios"

import Reply from "./Reply"

const AddComment = React.lazy(() => import('./AddComment'))

type User = {
    _id: string,
    img: string,
    username: string
}

type Replies = {
    _id: string
    content: string,
    createdAt: string,
    replyingTo: string
    score: number
    user: User
}

type CommentProps = {
    _id: string,
    content: string,
    createdAt: string,
    score: number
    user: User
    replies: Array<Replies>
    currentUser: User
    onDelete: (id: string) => void
    shouldDelete: boolean
    onDeleteReply: (id: string) => void

}




const Comment = ({ _id, content, createdAt, score, user, replies, currentUser, onDelete,
    shouldDelete, onDeleteReply }: CommentProps) => {

    const [isEditing, setisEditing] = useState<boolean>(false)
    const [editedComment, seteditedComment] = useState<string>(content)
    const [isReplyingComment, setIsReplyingComment] = useState<boolean>(false)
    const [isReplyingReply, setIsReplyingReply] = useState<boolean>(false)
    const [replyId, setReplyId] = useState<string>("")

    const queryClient = useQueryClient()

    const newCommentRef = useRef<HTMLDivElement>(null);
    const newReplyRef = useRef<HTMLDivElement>(null);

    const scrollToElement = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleDelete = () => {
        onDelete(_id)
    }

    const handleEdit = () => {
        setisEditing(true)
    }

    const postEdit = async () => {
        // onEdit({ _id, content: editedComment })
        try {
            const response = await axios.patch(`https://interactive-comments-section-api-an2t.onrender.com/comments/${_id}`, { newComment: editedComment })
            console.log(response.data)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const handleReply = () => {
        setIsReplyingComment(true)
        scrollToElement(newCommentRef)
    }

    const handleReplyToAnotherReply = (id: string) => {
        setIsReplyingReply(true)
        setReplyId(id)
        scrollToElement(newReplyRef)
    }

    const handleDeleteReply = (id: string) => {
        onDeleteReply(id)
    }

    const handleUpvote = async () => {
        try {
            const response = await axios.patch(`https://interactive-comments-section-api-an2t.onrender.com/comments/upvote/${_id}`)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const handleDownvote = async () => {
        try {
            const response = await axios.patch(`https://interactive-comments-section-api-an2t.onrender.com/comments/downvote/${_id}`)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const { mutateAsync: postEditMutation } = useMutation({
        mutationFn: postEdit,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] })
        }
    })

    const { mutateAsync: handleUpvoteMutation } = useMutation({
        mutationFn: handleUpvote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] })
        }
    })

    const { mutateAsync: handleDownvoteMutation } = useMutation({
        mutationFn: handleDownvote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] })
        }
    })

    return (
        <>
            <div className='bg-white p-4 mt-4 lg:flex lg:relative lg:gap-6'>


                <div className='lg:order-2 lg:grow'>
                    <div className='flex gap-4 items-center'>
                        <img
                            src={user.img}
                            alt={user.username}
                            className='w-8 h-8'
                        />
                        <div className='text-dark-blue font-bold'>{user.username}</div>
                        {currentUser.username === user.username && (
                            <div className='bg-moderate-blue px-2 -ml-2 rounded-md text-white'>you</div>
                        )}
                        <div className="text-grayish-blue ">{createdAt}</div>
                    </div>


                    {isEditing ? (
                        <textarea
                            className='border border-light-gray px-5 py-2 w-full mt-4 rounded-md hover:cursor-pointer focus:outline-none focus:border-moderate-blue'
                            value={editedComment}
                            onChange={(e) => seteditedComment(e.target.value)}
                        />
                    ) :
                        (
                            <div className='text-grayish-blue mt-4'>
                                {content}
                            </div>
                        )
                    }

                </div>


                <div className='mt-4 flex justify-between items-center lg:items-start lg:mt-0'>

                    <div className='bg-very-light-gray flex gap-4 items-center px-3 py-2 rounded-lg lg:flex-col lg:py-3'>

                        <svg
                            width="11"
                            height="11"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={async () => await handleUpvoteMutation()}
                            className='hover:cursor-pointer'
                        >
                            <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                                fill="#C5C6EF"
                            />

                        </svg>

                        <div className='text-moderate-blue font-medium'>{score}</div>

                        <svg
                            width="11"
                            height="3"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={async () => await handleDownvoteMutation()}
                            className='hover:cursor-pointer'
                        >
                            <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"
                            />
                        </svg>
                    </div>

                    <div className='lg:absolute lg:right-4'>
                        {isEditing ? (
                            <button
                                className='bg-moderate-blue text-white px-6 py-2 rounded-md hover:cursor-pointer lg:hover:opacity-40'
                                onClick={async () => {
                                    try {
                                        await postEditMutation()
                                        setisEditing(false)
                                    } catch (error) {
                                        console.error(error)
                                    }

                                }}
                            >
                                UPDATE
                            </button>
                        ) : (
                            currentUser.username === user.username ? (
                                <div className='flex gap-5 items-center'>
                                    <div
                                        className='flex gap-2 items-center hover:cursor-pointer lg:hover:opacity-40'
                                        onClick={handleDelete}
                                    >
                                        <svg
                                            width="12"
                                            height="14"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                                                fill="#ED6368"
                                            />
                                        </svg>

                                        <div className='text-soft-red font-medium'>Delete</div>
                                    </div>

                                    <div
                                        className='flex gap-2 items-center hover:cursor-pointer lg:hover:opacity-40'
                                        onClick={handleEdit}
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                                                fill="#5357B6"
                                            />
                                        </svg>

                                        <div className='text-moderate-blue font-medium'>Edit</div>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex gap-2 items-center hover:cursor-pointer lg:hover:opacity-40'>
                                    <svg
                                        width="14"
                                        height="13"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                                            fill="#5357B6"
                                        />
                                    </svg>
                                    <div
                                        className='text-moderate-blue font-medium'
                                        onClick={handleReply}
                                    >
                                        Reply
                                    </div>
                                </div>
                            )
                        )}


                    </div>

                </div>
            </div>

            <div ref={newCommentRef}>
                {isReplyingComment &&
                    <Suspense fallback={<div>Loading...</div>}>
                        <AddComment
                            currentUser={currentUser}
                            isReplying={isReplyingComment}
                            setIsReplying={setIsReplyingComment}
                            commentId={_id}
                        />
                    </Suspense>
                }
            </div>


            {/* REPLIES */}

            {replies.length !== 0 &&
                <div className='flex relative gap-4 mt-4 lg:ml-8 lg:gap-8'>
                    <div>
                        <hr className='border-[1.6px] h-full border-light-gray' />
                    </div>

                    <div className='grow '>
                        {replies.map((reply) => (
                            <>
                                <div key={reply._id} className='bg-white p-4 mb-3 last:mb-0 '>
                                    <Reply
                                        _id={reply._id}
                                        content={reply.content}
                                        createdAt={reply.createdAt}
                                        score={reply.score}
                                        replyingTo={reply.replyingTo}
                                        user={reply.user}
                                        currentUser={currentUser}
                                        onDeleteReply={handleDeleteReply}
                                        onReply={handleReplyToAnotherReply}
                                    />
                                </div>
                            </>
                        ))}

                        <div ref={newReplyRef}>
                            {isReplyingReply &&
                                <Suspense fallback={<div>Loading...</div>}>
                                    <AddComment
                                        currentUser={currentUser}
                                        isReplying={isReplyingReply}
                                        setIsReplying={setIsReplyingReply}
                                        commentId={replyId}
                                    />
                                </Suspense>
                            }
                        </div>

                    </div>
                </div>}

        </>
    )
}

export default Comment