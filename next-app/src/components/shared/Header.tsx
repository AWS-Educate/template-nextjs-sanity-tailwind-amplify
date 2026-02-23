import Link from 'next/link'
import Container from '@/components/ui/Container'
import MobileNav from './MobileNav'

interface SubNavItem {
  label: string
  href: string
}

interface NavItem {
  label: string
  href: string
  submenu?: SubNavItem[]
}

const navItems: NavItem[] = [
  {label: 'Home', href: '/'},
  {label: 'About', href: '/nosotros'},
  {label: 'Schedule', href: '/programacion'},
  {label: 'Blog', href: '/blog'},
  {label: 'Store', href: '/libreria'},
  {label: 'Contact', href: '/contacto'},
  {label: 'Donate', href: '/donar'},
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="font-heading text-xl font-bold text-primary-500">{'{{PROJECT_NAME}}'}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link href={item.href} className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-500 no-underline transition-colors">
                  {item.label}
                </Link>
                {item.submenu && item.submenu.length > 0 && (
                  <div className="absolute left-0 top-full pt-1 hidden group-hover:block">
                    <div className="bg-white rounded-lg shadow-lg border border-neutral-100 py-2 min-w-50">
                      {item.submenu.map((sub: SubNavItem) => (
                        <Link key={sub.href} href={sub.href} className="block px-4 py-2 text-sm text-neutral-600 hover:bg-primary-50 hover:text-primary-600 no-underline">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Nav */}
          <MobileNav items={navItems} />
        </div>
      </Container>
    </header>
  )
}
