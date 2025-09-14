import { useState } from 'react'
import type { Project } from '~/type'
import type { Route } from './+types/index'
import ProjectCard from '~/components/ProjectCard'
import Pagination from '~/components/Pagination'

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch('http://localhost:3000/projects')
  const data = await res.json()

  return { projects: data }
}

const Projects = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const projectPerPage = 10

  const { projects } = loaderData as { projects: Project[] }
  // get unique categories
  const categories = ['All', ...new Set(projects.map(project => project.category))]

  // filter project based on category
  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter(project => project.category === selectedCategory)

  // calculate totalPages
  const totalPages = Math.ceil(filteredProjects.length / projectPerPage)

  // get current pages projects 
  const indexOfLast = currentPage * projectPerPage
  const indexOfFirst = indexOfLast - projectPerPage
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast)

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-8">
        🚀Projects
      </h2>

      <div className="flex flex-wrap gap-2 mb-8">
        {
          categories.map(category => (
            <button key={category}
              className={`cursor-pointer px-3 py-1 rounded text-sm ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}
              onClick={() => {
                setSelectedCategory(category)
                setCurrentPage(1)
              }}
            >
              {category}
            </button>
          ))
        }
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {
          currentProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))
        }
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage} />
    </>
  )
}

export default Projects