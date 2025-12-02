// components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    // Scroll detection with Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target.id) {
          setActiveSection(visible.target.id)
        }
      },
      {
        root: null,
        threshold: [0.25, 0.5, 0.75],
        rootMargin: '-20% 0px -60% 0px',
      }
    )

    navItems.forEach((item) => {
      const section = document.getElementById(item.id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  // Smooth scroll handler
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="flex flex-col gap-4">
      <ul className="flex flex-col gap-4">
        {navItems.map((item) => (
          <li key={item.id} className="relative group">
            <a
              href={`#${item.id}`}
              onClick={(e) => handleScroll(e, item.id)}
              className="flex items-center gap-4 text-sm font-medium transition-all"
            >
              {/* Visual marker - grows & brightens on hover */}
              <span
                className={`nav-marker transition-all h-0.5 rounded-full
              ${
                activeSection === item.id
                  ? 'w-16 bg-current' // Active: full length, full opacity
                  : 'w-5 bg-current opacity-40 group-hover:w-16 group-hover:opacity-100' // Inactive: short & faded + hover
              }`}
              />

              {/* Text - brightens on hover */}
              <span
                className={`transition-all
              ${
                activeSection === item.id
                  ? 'opacity-100' // Active: full opacity
                  : 'opacity-60 group-hover:opacity-100' // Inactive: 60% + hover
              }`}
              >
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
