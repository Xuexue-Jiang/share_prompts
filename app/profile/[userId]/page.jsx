'use client'

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import Profile from "@components/Profile"

const UserProfile = ({ params }) => {

  const [posts, setPosts] = useState([])
  const searchParams = useSearchParams()

  const userId = params?.userId
  const userName = searchParams.get('name')

  if(!userId) return alert('userId not found')

  useEffect(() => {
    const fetchPosts = async (request) => {
      const response = await fetch(`/api/users/${userId}/posts`)
      const data = await response.json()

      console.log('data', data)

      setPosts(data)
    }

    fetchPosts()

  }, [])
  
  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

    if(hasConfirmed) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`, {method: 'DELETE'})

        const filteredPosts = posts.filter((p) => p._id !== post._id)
        setPosts(filteredPosts)

      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Profile 
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default UserProfile