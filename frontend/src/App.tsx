import { useEffect, useState } from "react"
import Comment from "./components/Comment"
import AddComment from "./components/AddComment";

import axios from 'axios';
import { log } from "console";

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

  useEffect(() => {
    axios.get("http://localhost:4000/comments")
      .then((response) => {
        setComments(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    axios.get(`http://localhost:4000/users/${currentUsername}`)
      .then((response) => {
        setCurrentUser(response.data)
      })

      .catch((error) => {
        console.log(error)
      })

  }, [comment, comments])


  const handleNewComment = (newComment: {
    content: string,
    createdAt: string,
    score: number
    user: string
  }) => {
    setComment(newComment)
  }

  const handleEdit = (newComment: { _id: string, content: string }) => {
    axios.patch(`http://localhost:4000/comments/${newComment._id}`, { newComment: newComment.content })
      .then((response) => console.log(response))
      .catch((error) => console.log(error))

    setComment(newComment.content)
  }

  const handleDelete = (_id: string) => {
    axios.delete(`http://localhost:4000/comments/${_id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error))

    comments.filter((comment) => comment._id !== _id)
  }

  const handleReply = (commentId: string) => {
    setCommentId(commentId)
    setIsReplying(true)


    const delay = 50; // Adjust this value as needed

    setTimeout(() => {
      // Scroll to the bottom of the page
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, delay);
  }

  const handleReplyToAnotherReply = (replyId: string) => {
    setCommentId(replyId)
    setIsReplying(true)

    const delay = 50; // Adjust this value as needed

    setTimeout(() => {
      // Scroll to the bottom of the page
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, delay);
  }

  return (
    <div className="bg-very-light-gray min-h-screen py-8 px-4">

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
            onReply={handleReply}
            onReplyToAnotherReply={handleReplyToAnotherReply}
          />
        </div>
      ))}


      {currentUser && (
        <AddComment
          currentUser={currentUser}
          onNewComment={handleNewComment}
          commentId={commentId}
          isReplying={isReplying}
          setIsReplying={setIsReplying}

        />
      )
      }

    </div>
  )
}