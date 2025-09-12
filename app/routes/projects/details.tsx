import type { Route } from './+types/details'
import type { Project } from '~/type'

export async function clientLoader({ request, params }: Route.ClientLoaderArgs): Promise<Project> {
  const res = await fetch(`http://localhost:3000/projects/${params.id}`)

  if (!res.ok) throw new Response(`Project not found`, { status: 404 })

  const project: Project = await res.json()
  return project
}

export function HydrateFallback() {
  return <div>Loading...</div>
}

const ProjectDetails = ({ loaderData }: Route.ComponentProps) => {

  const project = loaderData
  console.log(project)

  return (
    <>
      <div>
        <h2>Project Details</h2>
      </div>
    </>
  )
}

export default ProjectDetails