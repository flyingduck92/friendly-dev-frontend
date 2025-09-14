import { useState } from 'react'
import type { Project } from '~/type'
import type { Route } from './+types/index'
import ProjectCard from '~/components/ProjectCard'

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch('http://localhost:3000/projects')
  const data = await res.json()

  return { projects: data }
}

const Projects = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] }

  const [currentPage, setCurrentPage] = useState(1)
  const projectPerPage = 10

  // calculate totalPages
  const totalPages = Math.ceil(projects.length / projectPerPage)

  // get current pages projects 
  const indexOfLast = currentPage * projectPerPage
  const indexOfFirst = indexOfLast - projectPerPage
  const currentProjects = projects.slice(indexOfFirst, indexOfLast)

  // Pagination button render
  const renderPagination = () => (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: totalPages }, (_, index) => (
        <button key={index + 1}
          className={`px-3 py-1 cursor-pointer rounded 
        ${currentPage === (index + 1) ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-8">
        🚀Projects
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {
          currentProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))
        }
      </div>
      {totalPages > 1 && renderPagination()}
    </>
  )
}

export default Projects