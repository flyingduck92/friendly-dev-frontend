import { Outlet } from 'react-router'
import type { Route } from '../home/+types'

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "the Friendly Dev" },
    { name: "description", content: "Custom webdev!" },
  ]
}

const MainLayout = () => {
  return (
    <>
      <section className='max-w-6xl mx-auto px-6 my-6'>
        <Outlet />
      </section>
    </>
  )
}

export default MainLayout