// components/ProjectsSection.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

interface Project {
  id: number
  project_name: string
  description: string
  technologies: string[]
  github_repo_link: string
  screenshot_url: string
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from('projects').select('*')
      const sorted = (data || []).sort((a, b) => b.id - a.id)
      setProjects(sorted)
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

  const recentProjects = projects.slice(0, 3)

  return (
    <section id="projects" className="space-y-12">
      {recentProjects.map((project) => (
        <div
          key={project.id}
          className="group bg-gray-200 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-gray-400 dark:border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden"
        >
          {/* Layout: Image left, Content right */}
          <div className="flex flex-col md:flex-row">
            {/* Left: Image - Clickable to GitHub */}
            <a
              href={project.github_repo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="md:w-1/2 block group-hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="relative h-64 md:h-full">
                <Image
                  src={project.screenshot_url || '/placeholder.jpg'}
                  alt={project.project_name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </a>

            {/* Right: Content box */}
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              {/* Top: Project Name + Description */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-slate-100 mb-4">
                  {project.project_name}
                </h3>
                <p className="text-gray-900 dark:text-slate-300 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Bottom: Tech Stack + Go to Button */}
              <div>
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-gray-300 dark:bg-slate-700/50 text-gray-700 dark:text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all cursor-pointer"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Go to Button */}
                <a
                  href={project.github_repo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                >
                  Go to →
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
