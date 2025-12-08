'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'

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

  const displayProjects = projects.slice(0, 3)

  return (
    <section id="projects" className="space-y-16 max-w-7xl mx-auto px-4">
      {displayProjects.map((project, index) => {
        const isImageLeft = index % 2 === 0

        return (
          <div key={project.id} className="relative h-[350px] w-full rounded-xl overflow-hidden">
            {/* Image with hover effects only on non-overlapping area */}
            <div
              className={`group absolute inset-y-5 ${isImageLeft ? 'left-0 right-[150px]' : 'right-0 left-[150px]'} max-md:inset-x-0 z-10 rounded-xl overflow-hidden transition-all duration-300 hover:z-40`}
            >
              <a
                href={project.github_repo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative"
              >
                <Image
                  src={project.screenshot_url || '/placeholder.jpg'}
                  alt={project.project_name}
                  fill
                  className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-95"
                  priority={index < 3}
                />
                {/* Blue overlay - fades slightly faster on hover */}
                <div className="absolute inset-0 bg-cyan-500/40 rounded-xl transition-opacity duration-700 ease-out group-hover:opacity-0" />
                {/* Effect trigger covers only visible image area */}
                <div
                  className={`absolute inset-0 ${isImageLeft ? 'pr-[340px]' : 'pl-[340px]'} max-md:p-0`}
                />
              </a>
            </div>

            {/* Description box - SLIGHTLY EXTENDED WIDTH (340px) on desktop, positioned at bottom on mobile */}
            <div
              className={`absolute ${isImageLeft ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 w-[340px] md:top-1/2 md:-translate-y-1/2 max-md:bottom-0 max-md:top-auto max-md:translate-y-0 max-md:left-0 max-md:right-0 max-md:w-full z-30 transition-all duration-300`}
            >
              <div className="bg-gray-200/95 dark:bg-slate-800/90 backdrop-blur-md border border-gray-400 dark:border-slate-700/50 p-5 md:p-5 max-md:p-3 shadow-2xl rounded-xl">
                <h3 className="text-2xl md:text-2xl max-md:text-lg font-bold text-gray-900 dark:text-slate-100 mb-3 md:mb-3 max-md:mb-2">
                  {project.project_name}
                </h3>
                <p className="text-sm md:text-sm max-md:text-xs text-gray-900 dark:text-slate-300 leading-relaxed md:leading-relaxed max-md:leading-snug mb-5 md:mb-5 max-md:mb-2.5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 md:gap-2 max-md:gap-1 mb-5 md:mb-5 max-md:mb-2.5">
                  {project.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 md:px-3 md:py-1 max-md:px-2 max-md:py-0.5 text-xs md:text-xs max-md:text-[10px] font-medium rounded-full bg-gray-300 dark:bg-slate-700/50 text-gray-700 dark:text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.github_repo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-4xl md:text-4xl max-md:text-2xl font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:scale-110 transition-all duration-200"
                  aria-label={`View ${project.project_name} repository`}
                >
                  →
                </a>
              </div>
            </div>
          </div>
        )
      })}

      <div className="mt-12 pt-8 border-t border-gray-400 dark:border-slate-700/50">
        <Link
          href="/records"
          className="text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors hover:underline"
        >
          View Projects Archives
        </Link>
      </div>
    </section>
  )
}
