'use client'

import { Github, Linkedin, Instagram } from 'lucide-react'
import Link from 'next/link'

const socials = [
  { name: 'GitHub', href: 'https://github.com/weihen9', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/wei-heng-kee-156841391/', icon: Linkedin },
  { name: 'Instagram', href: 'https://instagram.com/yourusername', icon: Instagram },
]

export default function SocialBar() {
  return (
    <div className="flex items-center gap-6">
      {socials.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className="group transition-all duration-200"
        >
          <social.icon className="h-6 w-6 text-foreground opacity-40 group-hover:opacity-100 transition-opacity duration-200" />
        </Link>
      ))}
    </div>
  )
}
