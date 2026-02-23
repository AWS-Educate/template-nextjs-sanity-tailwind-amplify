import Link from 'next/link'
import Container from '@/components/ui/Container'

const quickLinks = [
  {label: 'About', href: '/nosotros'},
  {label: 'Schedule', href: '/programacion'},
  {label: 'Blog', href: '/blog'},
  {label: 'Contact', href: '/contacto'},
  {label: 'Donate', href: '/donar'},
]

export default function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 pt-12 pb-6">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {/* About */}
          <div>
            <h4 className="text-lg mb-3" style={{color: 'var(--color-primary-500)'}}>{'{{PROJECT_NAME}}'}</h4>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Your project description. Edit this in the Footer component or configure via Sanity Site Settings.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg mb-3" style={{color: 'var(--color-primary-500)'}}>Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-neutral-600 hover:text-secondary-500 no-underline transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg mb-3" style={{color: 'var(--color-primary-500)'}}>Contact</h4>
            <div className="space-y-2 text-sm text-neutral-600">
              <p className="m-0">{'{{CONTACT_EMAIL}}'}</p>
              <p className="m-0">{'{{CONTACT_PHONE}}'}</p>
              <div className="flex gap-3 mt-3">
                {/* Add your social media links here */}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-6 text-center text-xs text-neutral-400">
          <p className="m-0">&copy; {new Date().getFullYear()} {'{{PROJECT_NAME}}'}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
