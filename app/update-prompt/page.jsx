'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Form from '@components/Form'

const queryClient = new QueryClient()

const EditPrompt = () => {

  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  

  const fetchPrompt = async (promptId) => {
    
    const response = await fetch(`/api/prompt/${promptId}`)
        const data  = await response.json()
        return data
  }

  const SearchPrompt = () => {
  
    const searchParams = useSearchParams()
    const [post, setPost] = useState({
      prompt: '',
      tag: '',
    })
    const promptId = searchParams.get('id')

    if(!promptId) return alert('Prompt ID not found')
    
    const { data }  = useQuery({ queryKey: ['prompt', promptId],
    queryFn: () => fetchPrompt(promptId),
    suspense: true})

    useEffect(() => {
      if (data) {
        setPost(data);
      }
    }, [data])
    
    const updatePrompt = async (e) => {
      e.preventDefault()
      setSubmitting(true)
      
      try {
        const response = await fetch(`api/prompt/${promptId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
          })
        })
        
        if (response.ok) {
          router.push('/')
        }
        
      } catch (error) {
        console.log(error)
        
      } finally {
        setSubmitting(false)
      }
    }
    
    return <Form 
    type='Edit'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}
  />
  }

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchPrompt />
        </Suspense>
      </QueryClientProvider>
    </div>
  )
}

export default EditPrompt