import Link from 'next/link'
import Container from '@/components/ui/Container'

const quickLinks = [
  {label: 'Nosotros', href: '/nosotros'},
  {label: 'Programación', href: '/programacion'},
  {label: 'Blog', href: '/blog'},
  {label: 'Contacto', href: '/contacto'},
  {label: 'Donar', href: '/donar'},
]

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-neutral-300 pt-12 pb-6">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {/* About */}
          <div>
            <h4 className="!text-white text-lg mb-3">SRF Bogotá</h4>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Grupo de Meditación de Self-Realization Fellowship en Bogotá, Colombia.
              Enseñanzas de Paramahansa Yogananda.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="!text-white text-lg mb-3">Enlaces</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-400 hover:text-secondary-400 no-underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="!text-white text-lg mb-3">Contacto</h4>
            <div className="space-y-2 text-sm text-neutral-400">
              <p className="m-0">centro@yogananda-bogota.org</p>
              <p className="m-0">+57 312 4202518</p>
              <div className="flex gap-3 mt-3">
                <a href="https://www.facebook.com/SRFBogota" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-secondary-400 no-underline">Facebook</a>
                <a href="https://www.instagram.com/srfbogota" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-secondary-400 no-underline">Instagram</a>
                <a href="https://www.youtube.com/@srfbogota" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-secondary-400 no-underline">YouTube</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-800 pt-6 text-center text-xs text-neutral-500">
          <p className="m-0">&copy; {new Date().getFullYear()} Self-Realization Fellowship Bogotá. Todos los derechos reservados.</p>
        </div>
      </Container>
    </footer>
  )
}
