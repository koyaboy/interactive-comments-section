import React from 'react'

import iconDelete from "../images/icon-delete.svg"
import iconEdit from "../images/icon-edit.svg"

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
    content: string,
    createdAt: string,
    score: number
    user: User
    replies: Array<Replies>
    currentUser: User
}

const Comment = ({ content, createdAt, score, user, replies, currentUser }: CommentProps) => {
    return (
        <>
            <div className='bg-white p-4 mt-4'>
                <div className='flex gap-4 items-center'>
                    <img
                        src={user.img}
                        alt={user.username}
                        className='w-8'
                    />
                    <div className='text-dark-blue font-bold'>{user.username}</div>
                    {currentUser.username === user.username && (
                        <div className='bg-moderate-blue px-2 -ml-2 rounded-md text-white'>you</div>
                    )}
                    <div className="text-grayish-blue ">{createdAt}</div>
                </div>

                <div className='text-grayish-blue mt-4'>
                    {content}
                </div>

                <div className='mt-4 flex justify-between'>
                    <div className='bg-very-light-gray flex gap-4 items-center px-3 py-2 rounded-lg'>
                        <svg
                            width="11"
                            height="11"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                                fill="#C5C6EF"
                            />
                        </svg>

                        <div className='text-moderate-blue font-medium'>{score}</div>

                        <svg
                            width="11"
                            height="3"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"
                            />
                        </svg>
                    </div>

                    {currentUser.username === user.username ?
                        (
                            <div className='flex gap-5 items-center'>
                                <div className='flex gap-2 items-center'>
                                    <img src={iconDelete} alt="icon-delete" />
                                    <div className='text-soft-red font-medium'>Delete</div>
                                </div>

                                <div className='flex gap-2 items-center'>
                                    <img src={iconEdit} alt="icon-edit" />
                                    <div className='text-moderate-blue font-medium'>Edit</div>
                                </div>
                            </div>
                        )
                        :
                        (

                            <div className='flex gap-2 items-center'>
                                <svg
                                    width="14"
                                    height="13"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                                        fill="#5357B6"
                                    />
                                </svg>

                                <div className='text-moderate-blue font-medium'>Reply</div>
                            </div>
                        )

                    }
                </div>
            </div>

            {/* REPLIES */}
            {replies.length !== 0 &&
                <div className='flex relative gap-4 mt-4'>

                    <div>
                        <hr className='border-[1.6px] h-full border-light-gray' />
                    </div>


                    <div className='grow '>
                        {replies.map((reply) => (
                            <div key={reply._id} className='bg-white p-4 mb-3 last:mb-0'>
                                <div className='flex gap-4 items-center'>
                                    <img
                                        src={reply.user.img}
                                        alt={reply.user.username}
                                        className='w-8'
                                    />
                                    <div className='text-dark-blue font-bold'>{reply.user.username}</div>
                                    {currentUser.username === reply.user.username && (
                                        <div className='bg-moderate-blue px-2 -ml-2 rounded-md text-white'>you</div>
                                    )}
                                    <div className="text-grayish-blue ">{reply.createdAt}</div>
                                </div>

                                <div className='text-grayish-blue mt-4'>
                                    <span className='text-moderate-blue font-medium'>@{reply.replyingTo}</span><span> {reply.content}</span>
                                </div>

                                <div className='mt-4 flex justify-between'>
                                    <div className='bg-very-light-gray flex gap-4 items-center px-3 py-2 rounded-lg'>
                                        <svg
                                            width="11"
                                            height="11"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                                                fill="#C5C6EF"
                                            />
                                        </svg>

                                        <div className='text-moderate-blue font-medium'>{reply.score}</div>

                                        <svg
                                            width="11"
                                            height="3"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"
                                            />
                                        </svg>
                                    </div>

                                    {currentUser.username === reply.user.username ?
                                        (
                                            <div className='flex gap-5 items-center'>
                                                <div className='flex gap-2 items-center'>
                                                    <img src={iconDelete} alt="icon-delete" />
                                                    <div className='text-soft-red font-medium'>Delete</div>
                                                </div>

                                                <div className='flex gap-2 items-center'>
                                                    <img src={iconEdit} alt="icon-edit" />
                                                    <div className='text-moderate-blue font-medium'>Edit</div>
                                                </div>
                                            </div>
                                        )
                                        :
                                        (

                                            <div className='flex gap-2 items-center'>
                                                <svg
                                                    width="14"
                                                    height="13"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                                                        fill="#5357B6"
                                                    />
                                                </svg>

                                                <div className='text-moderate-blue font-medium'>Reply</div>
                                            </div>
                                        )

                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>}

        </>
    )
}

export default Comment