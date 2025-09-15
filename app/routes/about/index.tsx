import { li } from 'motion/react-client'

const About = () => {
  return (
    <div className='max-w-6xl mx-auto px-6 py-16 bg-gray-900'>
      {/* Intro */}
      <div className="flex flex-col items-center gap-10 mb-12 md:flex-row md:items-start">
        <img src="/images/profile.jpg"
          alt="profile"
          className='size-40 rounded-full object-cover border-4 border-blue-500 shadow-md'
        />
        <div>
          <h1 className='text-3xl font-bold text-white mb-2'>
            Hello I'm Brad
          </h1>
          <p className="text-gray-300 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam natus magnam suscipit molestiae accusamus vitae dolores, sapiente ipsam rem eos laudantium itaque, eveniet velit animi, nisi corrupti inventore id quasi?
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">
          My Mission
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit blanditiis perspiciatis dignissimos quas reprehenderit commodi, animi harum iure necessitatibus ut, molestias sunt! Quasi quam repellendus neque amet sed maxime omnis!
          Aut sapiente ab repellendus ullam eaque fugit, obcaecati eum eos dolore dicta. Praesentium, corrupti blanditiis animi, officiis aut facere illum necessitatibus veniam nemo, voluptas ut reprehenderit quod. Amet, corporis blanditiis?
        </p>
      </div>

      {/* Tech Stack */}
      <h2 className="text-2xl font-semibold text-white mb-4">
        Tech I use
      </h2>
      <ul className="flex flex-wrap gap-2 text-sm text-gray-300">
        {
          [
            'React',
            'NextJS',
            'HTML',
            'CSS',
            'TailwindCSS',
            'PostgreSQL',
            'Sequelize',
          ].map(tech => (
            <li key={tech} className='bg-gray-700 px-3 py-1 rounded-md'>
              {tech}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default About