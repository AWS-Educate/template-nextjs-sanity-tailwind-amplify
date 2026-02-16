'use client'

import {useState} from 'react'
import Link from 'next/link'

interface NavItem {
  label: string
  href: string
  submenu?: {label: string; href: string}[]
}

export default function MobileNav({items}: {items: NavItem[]}) {
  const [open, setOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  return (
    <div className="lg:hidden">
      <button onClick={() => setOpen(!open)} className="p-2 text-neutral-700" aria-label="Menú">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-16 bg-white border-b border-neutral-200 shadow-lg z-50">
          <nav className="py-4 px-6 space-y-1">
            {items.map(item => (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <Link href={item.href} onClick={() => setOpen(false)} className="block py-2 text-neutral-700 no-underline font-medium">
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <button onClick={() => setExpandedItem(expandedItem === item.href ? null : item.href)} className="p-2 text-neutral-400">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d={expandedItem === item.href ? 'M4 10l4-4 4 4' : 'M4 6l4 4 4-4'} />
                      </svg>
                    </button>
                  )}
                </div>
                {item.submenu && expandedItem === item.href && (
                  <div className="pl-4 space-y-1">
                    {item.submenu.map(sub => (
                      <Link key={sub.href} href={sub.href} onClick={() => setOpen(false)} className="block py-1.5 text-sm text-neutral-500 no-underline hover:text-primary-500">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
