import { useState } from 'react'
import type { Project, StrapiProject, StrapiResponse } from '~/type'
import type { Route } from './+types/index'
import ProjectCard from '~/components/ProjectCard'
import Pagination from '~/components/Pagination'
import { AnimatePresence, motion } from 'motion/react'

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "the Friendly Dev | Projects" },
    { name: "description", content: "My website portfolio!" },
  ]
}


export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects?populate=*`)
  const json: StrapiResponse<StrapiProject> = await res.json()

  const projects = json.data.map(item => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url
      ? `${item.image.url}`
      : '/images/no-image.png',
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  }))

  return { projects }
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

      <AnimatePresence>
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2"
        >
          {
            currentProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }} // instant exit
                transition={{
                  duration: 0.3,
                  delay: i * 0.09, // stagger animation on entrance
                  layout: { type: "spring", stiffness: 300, damping: 30 }
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))
          }
        </motion.div>
      </AnimatePresence >

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage} />
    </>
  )
}

export default Projects