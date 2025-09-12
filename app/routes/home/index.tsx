import type { Route } from "./+types/index"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "the Friendly Dev | Welcome" },
    { name: "description", content: "Custom webdev!" },
  ]
}

export default function Home() {

  return (
    <>
      <>
        <p>Homepage</p>
      </>
    </>
  )
}
