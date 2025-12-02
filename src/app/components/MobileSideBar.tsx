'use client'

import { useSidebar } from '@/app/imported_ui_templates/sidebar'
import { ModeToggle } from './ModeToggle'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/app/imported_ui_templates/sidebar'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
]

export function AppSidebar() {
  const { setOpenMobile } = useSidebar()

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar>
      {/* Theme toggle at same Y as X button */}
      <div className="md:hidden absolute top-5 left-5 z-[1001]">
        <ModeToggle />
      </div>
      <SidebarHeader className="flex flex-row items-center p-4 border-b border-sidebar-border">
        <h2 className="text-lg font-semibold">Menu</h2>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleScroll(e, item.id)}
                  className="flex items-center gap-4 text-sm font-medium transition-all group"
                >
                  {/* Visual marker - hover only */}
                  <span className="h-0.5 rounded-full w-5 bg-current opacity-40 group-hover:w-16 group-hover:opacity-100 transition-all" />

                  {/* Text - hover only */}
                  <span className="opacity-60 group-hover:opacity-100 transition-all">
                    {item.label}
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
