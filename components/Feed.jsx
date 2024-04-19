'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchedResults, setSearchedResults] = useState([])
  
  const handleSearchChange = (e) => {
    e.preventDefault()
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
    }
    
    fetchPosts()
  }, [])

  useEffect(() => {
    const filterPrompts = (searchText) => {
      const regex = new RegExp(searchText, 'i')
      const filteredPosts = posts.filter(
        (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
      )
      setSearchedResults((prev) => filteredPosts)
    }

    filterPrompts(searchText)
  }, [searchText])

  const handleTagClick  = (tag) => {
    setSearchText(tag)
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center' onSubmit={(e) => e.preventDefault()}>
        <input 
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList 
        data={searchText ? searchedResults : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed