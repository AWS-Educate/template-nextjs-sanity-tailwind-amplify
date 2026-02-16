import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="text-center max-w-lg">
        <h1 className="text-6xl mb-4">404</h1>
        <h2>Página no encontrada</h2>
        <p className="text-neutral-500 mb-8">La página que buscas no existe o ha sido movida.</p>
        <Button href="/">Volver al Inicio</Button>
      </Container>
    </section>
  )
}
