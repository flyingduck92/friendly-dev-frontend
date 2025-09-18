import type { Project } from '~/type'
import type { Route } from "./+types/index"
import type { PostMeta } from '~/type'
import FeaturedProjects from '~/components/FeaturedProjects'
import AboutPreview from '~/components/AboutPreview'
import LatestPost from '~/components/LatestPost'

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "the Friendly Dev | Welcome" },
    { name: "description", content: "Custom webdev!" },
  ]
}

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  const url = new URL(request.url)

  const [projectRes, postRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects`),
    fetch(new URL('/posts-meta.json', url))
  ])

  if (!projectRes.ok || !postRes.ok) {
    throw new Error('Failed to fetch projects or posts')
  }

  const [projects, posts] = await Promise.all([
    projectRes.json(),
    postRes.json()
  ])

  return { projects, posts }
}

const Home = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <LatestPost posts={posts} />
      <AboutPreview />
    </>
  )
}

export default Home