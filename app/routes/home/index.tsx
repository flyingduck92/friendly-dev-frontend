import type { Project } from '~/type'
import type { Route } from "./+types/index"
import FeaturedProjects from '~/components/FeaturedProjects'
import AboutPreview from '~/components/AboutPreview'

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "the Friendly Dev | Welcome" },
    { name: "description", content: "Custom webdev!" },
  ]
}

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`)

  const data = await res.json()

  return { projects: data }
}

const Home = ({ loaderData }: Route.ComponentProps) => {

  const { projects } = loaderData

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
    </>
  )
}

export default Home