import type { Route } from "./+types/index"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "the Friendly Dev | Welcome" },
    { name: "description", content: "Custom webdev!" },
  ]
}

export default function Home() {
  return (
    <section>
      <h1>My Apps</h1>
    </section>
  )
}
