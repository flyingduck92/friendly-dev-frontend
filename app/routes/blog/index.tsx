import type { PostMeta } from '~/type'
import type { Route } from './+types'
import PostCard from '~/components/PostCard'

import { useState } from 'react'
import Pagination from '~/components/Pagination'

export async function loader({ request }: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL('/posts-meta.json', request.url)
  const res = await fetch(url.href)

  if (!res.ok) throw new Error('Failed to fetch')

  const data = await res.json()

  // sort by date descending
  data.sort((a: PostMeta, b: PostMeta) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return { posts: data }
}

const Blog = ({ loaderData }: Route.ComponentProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { posts } = loaderData

  const postPerPage = 10
  const totalPages = Math.ceil(posts.length / postPerPage)
  const indexOfLast = currentPage * postPerPage
  const indexOfFirst = indexOfLast - postPerPage

  const currentPosts = posts.slice(indexOfFirst, indexOfLast)

  return (
    <div className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900 '>
      <h2 className="text-3xl font-bold text-white mb-8">
        📰Blog
      </h2>
      {currentPosts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}

      {
        totalPages > 1 &&
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={page => setCurrentPage(page)}
        />
      }
    </div>
  )
}

export default Blog