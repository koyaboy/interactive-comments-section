import { useEffect, useState } from "react"
import Comment from "./components/Comment"

import axios from 'axios';

export default function App() {

  type User = {
    id: string,
    img: string,
    username: string
  }

  type Comment = {
    id: string,
    content: string,
    createdAt: string,
    score: number
    user: User
    replies: Array<Replies>
  }

  type Replies = {
    id: String
    content: string,
    createdAt: string,
    replyingTo: string
    score: number
    user: User
  }

  const [comments, setComments] = useState<Array<Comment>>([])

  useEffect(() => {
    axios.get("http://localhost:4000/comments")
      .then((response) => {
        setComments(response.data)
      })

      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className="bg-very-light-gray min-h-screen py-8 px-4">

      {comments.map((comment) => (
        <Comment
          key={comment.id}
          content={comment.content}
          createdAt={comment.createdAt}
          score={comment.score}
          user={comment.user}
          replies={comment.replies}
        />
      ))}

    </div>
  )
}