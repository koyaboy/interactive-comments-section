import React, { useEffect, useState, Suspense } from "react"
import Comment from "./components/Comment"
import AddComment from "./components/AddComment";

const DeleteModal = React.lazy(() => import('./components/DeleteModal'));

import axios from 'axios';

export default function App() {

  type User = {
    _id: string,
    img: string,
    username: string
  }

  type Comment = {
    _id: string,
    content: string,
    createdAt: string,
    score: number
    user: User
    replies: Array<Replies>
  }

  type Replies = {
    _id: string
    content: string,
    createdAt: string,
    replyingTo: string
    score: number
    user: User
  }

  const currentUsername = "juliusomo"
  const [currentUser, setCurrentUser] = useState<User>()
  const [comments, setComments] = useState<Array<Comment>>([])
  const [comment, setComment] = useState<{}>({})
  const [isReplying, setIsReplying] = useState<boolean>(false)
  const [commentId, setCommentId] = useState<string>('')
  const [replyId, setReplyId] = useState<string>('')
  const [shouldDelete, setShouldDelete] = useState<boolean>(false)

  useEffect(() => {
    axios.get("https://interactive-comments-section-api-an2t.onrender.com/comments")
      .then((response) => {
        setComments(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    axios.get(`https://interactive-comments-section-api-an2t.onrender.com/users/${currentUsername}`)
      .then((response) => {
        setCurrentUser(response.data)
      })

      .catch((error) => {
        console.log(error)
      })

  }, [comment, comments])


  const handleEdit = (newComment: { _id: string, content: string }) => {
    axios.patch(`https://interactive-comments-section-api-an2t.onrender.com/comments/${newComment._id}`, { newComment: newComment.content })
      .then((response) => console.log(response))
      .catch((error) => console.log(error))

    setComment(newComment.content)
  }

  const handleDelete = (_id: string) => {
    setCommentId(_id)
    setShouldDelete(true)
  }


  const handleDeleteReply = (replyId: string) => {
    setReplyId(replyId)
    setShouldDelete(true)
  }

  return (

    <>
      {shouldDelete && <div className="overlay"></div>}

      <div className="bg-very-light-gray min-h-screen py-8 px-4 sm:px-16 md:px-36 lg:px-48 xl:px-64">

        {currentUser && comments.map((comment) => (
          <div key={comment._id}>
            <Comment
              _id={comment._id}
              content={comment.content}
              createdAt={comment.createdAt}
              score={comment.score}
              user={comment.user}
              replies={comment.replies}
              currentUser={currentUser}
              onDelete={handleDelete}
              onEdit={handleEdit}
              shouldDelete={shouldDelete}
              onDeleteReply={handleDeleteReply}
            />
          </div>
        ))}


        <div className="w-full">
          {shouldDelete &&
            <Suspense fallback={<div>Loading...</div>}>
              <DeleteModal
                commentId={commentId}
                replyId={replyId}
                setShouldDelete={setShouldDelete}
                setCommentId={setCommentId}
                setReplyId={setReplyId}
              />
            </Suspense>
          }
        </div>



        {currentUser && (
          <AddComment
            currentUser={currentUser}
            commentId={commentId}
            isReplying={isReplying}
            setIsReplying={setIsReplying}
          />
        )
        }

      </div>
    </>
  )
}