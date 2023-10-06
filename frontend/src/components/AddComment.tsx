import React, { useState, useEffect } from 'react'
import axios from "axios"


type User = {
    _id: string,
    img: string,
    username: string
}


type AddCommentProps = {
    currentUser: User
    onNewComment: (comment: {
        content: string,
        createdAt: string,
        score: number
        user: string
    }) => void
}

const AddComment = ({ currentUser, onNewComment }: AddCommentProps) => {

    const [comment, setComment] = useState<string>("")

    const postNewComment = () => {
        const newComment = {
            content: comment,
            createdAt: "Just Now",
            score: 0,
            user: currentUser._id
        }

        axios.post("http://localhost:4000/comments", newComment)
            .then((response) => {
                console.log(response.data);
                onNewComment(newComment)
                setComment("")
            })

            .catch((error) => { console.log(error) })
    }


    return (
        <div className='bg-white p-4 mt-4 rounded-lg'>
            <textarea
                placeholder='Add a comment...'
                className='border border-light-gray px-5 py-2 w-full'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <div className='flex justify-between mt-4 items-center'>
                <img
                    src={currentUser.img}
                    alt={currentUser.username}
                    className="w-8"
                />

                <button
                    className='bg-moderate-blue text-white px-6 py-2 rounded-md'
                    onClick={postNewComment}
                >
                    SEND
                </button>
            </div>
        </div>
    )
}

export default AddComment