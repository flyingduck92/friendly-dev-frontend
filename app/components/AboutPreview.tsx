import { Link } from 'react-router'


const AboutPreview = () => {
  return (
    <section className='mt-12 p-10 flex flex-col md:flex-row items-center gap-8 bg-gray-900'>
      <img src="/images/profile.jpg"
        alt="profile"
        className='size-32 rounded-full object-cover border-4 border-blue-500 shadow-md'
      />
      <div>
        <h2 className="text-2xl text-white font-bold mb-2">
          About Me
        </h2>
        <p className="text-gray-200 mb-4 max-w-4xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita reprehenderit ducimus magni consequatur quasi tempore incidunt molestiae sit, accusamus, eos labore, deserunt quod enim atque dignissimos veritatis fuga harum quisquam.
          Hic, alias at. Doloribus vitae placeat cumque, a optio eos in voluptas maxime? Eius ratione fugit libero nam repellat laudantium amet cupiditate at sint! Veritatis aliquam veniam quam dignissimos consequuntur.
        </p>
        <Link to='/about' className='inline-block text-blue-400 hover:underline text-sm' >Learn more about me</Link>
      </div>
    </section>
  )
}

export default AboutPreview