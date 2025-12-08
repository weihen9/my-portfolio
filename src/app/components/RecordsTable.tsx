'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Project {
  id: number
  project_name: string
  year: number
  made_at: string
  technologies: string[]
  github_repo_link: string
}

export default function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('year', { ascending: true })

      if (error) {
        console.error('Error fetching projects:', error)
      }

      setProjects(data || [])
      setLoading(false)
    }

    fetchProjects()

    const subscription = supabase
      .channel('project_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        fetchProjects()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
              Year
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
              Title
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100 max-md:hidden">
              Made at
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100 max-md:hidden">
              Built with
            </th>
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
              Link
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              onClick={() => {
                if (project.github_repo_link) {
                  window.open(project.github_repo_link, '_blank', 'noopener,noreferrer')
                }
              }}
              className={`transition-colors ${
                project.github_repo_link
                  ? 'hover:bg-gray-200 dark:hover:bg-slate-800 cursor-pointer'
                  : ''
              }`}
            >
              <td className="py-3 px-4 text-sm text-cyan-600 dark:text-cyan-400">{project.year}</td>
              <td className="py-3 px-4 text-sm font-bold text-gray-900 dark:text-gray-100">
                {project.project_name}
              </td>
              <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100 max-md:hidden">
                {project.made_at}
              </td>
              <td className="py-3 px-4 text-sm font-light text-gray-900 dark:text-gray-100 max-md:hidden">
                {project.technologies?.join(' · ')}
              </td>
              <td className="py-3 px-4">
                {project.github_repo_link ? (
                  <a
                    href={project.github_repo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-900 dark:text-gray-100 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    aria-label={`View ${project.project_name} link`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
