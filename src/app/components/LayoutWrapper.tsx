'use client'
import { usePathname } from 'next/navigation'
import { MobileSidebarTrigger } from '@/app/imported_ui_templates/sidebar'
import { AppSidebar } from '@/app/components/MobileSideBar'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isRecordsPage = pathname === '/records'

  return (
    <>
      {!isRecordsPage && <MobileSidebarTrigger />}
      {!isRecordsPage && (
        <div className="md:hidden">
          <AppSidebar />
        </div>
      )}
      <div className="relative">
        <main>{children}</main>
      </div>
    </>
  )
}
