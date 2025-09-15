import { Outlet } from 'react-router'
import Hero from '~/components/Hero'


const HomeLayout = () => {
  return (
    <>
      <Hero name='Brad Pitt' text='I am a full-stack JavaScript developer with a specialisation in UI design.' />
      <section className='max-w-6xl mx-auto px-6 my-6'>
        <Outlet />
      </section>
    </>
  )
}

export default HomeLayout