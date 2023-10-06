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

  const handleNewComment = (newComment: {
    content: string,
    createdAt: string,
    score: number
    user: string
  }) => {
    setComment(newComment)
  }

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

  }, [comment])


  return (
    <div className="bg-very-light-gray min-h-screen py-8 px-4">

      {currentUser && comments.map((comment) => (
        <div key={comment._id}>
          <Comment
            content={comment.content}
            createdAt={comment.createdAt}
            score={comment.score}
            user={comment.user}
            replies={comment.replies}
            currentUser={currentUser}
          />
        </div>
      ))}


      {currentUser && (
        <AddComment
          currentUser={currentUser}
          onNewComment={handleNewComment}
        />
      )
      }

    </div>
  )
}