import type { Route } from './+types/details'
import type { PostMeta } from '~/type'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router'

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params

  const url = new URL('/posts-meta.json', request.url)
  const res = await fetch(url.href)
  if (!res.ok) throw new Error('Failed to fetch')

  const index = await res.json()
  const postMeta = index.find((post: PostMeta) => post.slug === slug)
  if (!postMeta) throw new Response('Not found', { status: 404 })

  // Dynamicly import raw markdown
  const markdown = await import(`../../posts/${slug}.md?raw`)

  return {
    postMeta,
    markdown: markdown.default
  }
}

type BlogPostDetailsProps = {
  loaderData: {
    postMeta: PostMeta,
    markdown: string
  }
}

const BlogPostDetails = ({ loaderData }: BlogPostDetailsProps) => {
  const { postMeta, markdown } = loaderData

  return (
    <div className='max-w-3xl mx-auto py-12 px-6 bg-gray-900'>
      <h1 className="text-3xl text-blue-400 mb-2 font-bold">
        {postMeta.title}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {new Date(postMeta.date).toLocaleDateString('default', { year: 'numeric', month: 'short', day: 'numeric' })}
      </p>

      <div className="prose prose-invert max-w-none mb-12">
        <ReactMarkdown>
          {markdown}
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