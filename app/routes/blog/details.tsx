import type { Route } from './+types/details'
import type { Post, StrapiResponse, StrapiPost } from '~/type'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router'

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params

  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts?filters[slug][$eq]=${slug}&populate=image`)

  if (!res.ok) throw new Error('Failed to fetch')

  const json: StrapiResponse<StrapiPost> = await res.json()

  if (!json.data.length) throw new Response('Not found', { status: 404 })

  const item = json.data[0]
  const post = {
    id: item.id,
    slug: item.slug,
    excerpt: item.excerpt,
    title: item.title,
    date: item.date,
    body: item.body,
    image: item.image?.url
      ? `${item.image.url}`
      : '/images/no-image.png',
  }

  return { post }
}

type BlogPostDetailsProps = {
  loaderData: {
    post: Post,
  }
}

const BlogPostDetails = ({ loaderData }: BlogPostDetailsProps) => {
  const { post } = loaderData

  return (
    <div className='max-w-3xl mx-auto py-12 px-6 bg-gray-900'>
      <h1 className="text-3xl text-blue-400 mb-2 font-bold">
        {post.title}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {new Date(post.date).toDateString()}
      </p>

      <img src={post.image} alt={post.title} className='w-full h-64 object-cover mb-4' />

      <div className="prose prose-invert max-w-none mb-12">
        <ReactMarkdown>
          {post.body}
        </ReactMarkdown>
      </div>
      <Link to='/blog'
        className='inline-block bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700 transition'
      >
        ← Back to Posts
      </Link>
    </div>
  )
}

export default BlogPostDetails