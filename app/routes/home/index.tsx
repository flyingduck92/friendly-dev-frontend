import Hero from '~/components/Hero'
import type { Route } from "./+types/index"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "the Friendly Dev | Welcome" },
    { name: "description", content: "Custom webdev!" },
  ]
}

export default function Home() {

  console.log('Hello from Home')

  return (
    <>
      <section>
        <Hero name='Sekti Wicaksono' text='I am a full-stack JavaScript developer with a specialisation in UI design.' />
      </section>
    </>
  )
}
