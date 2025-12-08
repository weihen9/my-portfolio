import Link from 'next/link'
import ProjectsTable from '@/app/components/RecordsTable'

export default function RecordsPage() {
  return (
    <div className="flex flex-row w-screen h-screen md:px-40">
      <div className="w-full px-8 py-24 ">
        <Link
          href="/"
          className="fixed top-8 left-8 hidden md:block text-gray-900 dark:text-gray-100 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-gray-900 dark:text-gray-100 mb-2">Records</h1>
          <p className="text-cyan-600 dark:text-cyan-400 text-sm">
            {`A big list of all the projects I've made`}
          </p>
        </div>

        {/* Table */}
        <ProjectsTable />
      </div>
    </div>
  )
}
