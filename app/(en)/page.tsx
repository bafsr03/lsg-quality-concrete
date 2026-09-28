import { Header } from '@/components/site/header'
import { Hero } from '@/components/sections/hero'

export const dynamic = 'error'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
    </>
  )
}
