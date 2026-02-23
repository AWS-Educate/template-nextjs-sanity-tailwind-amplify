import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="text-center max-w-lg">
        <h1 className="text-6xl mb-4">404</h1>
        <h2>Page Not Found</h2>
        <p className="text-neutral-500 mb-8">The page you are looking for does not exist or has been moved.</p>
        <Button href="/">Go Home</Button>
      </Container>
    </section>
  )
}
