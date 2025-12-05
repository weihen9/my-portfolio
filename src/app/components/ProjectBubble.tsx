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

  // Always show only 3 most recent projects
  const displayProjects = projects.slice(0, 3)

  return (
    <section id="projects" className="space-y-16 max-w-7xl mx-auto px-4">
      {displayProjects.map((project, index) => {
        const isImageLeft = index % 2 === 0

        return (
          <div
            key={project.id}
            className="relative h-[350px] w-full group rounded-xl overflow-hidden"
          >
            {/* Image container - EXTENDED WIDTH, ROUNDED EDGES, hover z-index change */}
            <div
              className={`peer absolute inset-y-5 ${isImageLeft ? 'left-0 right-[150px]' : 'right-0 left-[150px]'} overflow-hidden z-10 hover:z-20 transition-all duration-300 rounded-xl`}
            >
              <a
                href={project.github_repo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full group"
              >
                <Image
                  src={project.screenshot_url || '/placeholder.jpg'}
                  alt={project.project_name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
                  priority={index < 3}
                />
                {/* Blue filter overlay - fades on hover */}
                <div className="absolute inset-0 bg-cyan-500/30 transition-opacity duration-300 group-hover:opacity-0 rounded-xl" />
              </a>
            </div>

            {/* Description box - SLIGHTLY SHORTER, rounded edges, responds to peer hover */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 ${isImageLeft ? 'right-0' : 'left-0'} w-[400px] z-20 peer-hover:z-10 transition-all duration-300`}
            >
              <div className="bg-gray-200/95 dark:bg-slate-800/90 backdrop-blur-md border border-gray-400 dark:border-slate-700/50 p-5 shadow-2xl rounded-xl">
                {/* Project Title */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-3">
                  {project.project_name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-900 dark:text-slate-300 leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tech Stack - BUBBLES restored */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-gray-300 dark:bg-slate-700/50 text-gray-700 dark:text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Large Arrow Button */}
                <a
                  href={project.github_repo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-4xl font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:scale-110 transition-all duration-200"
                  aria-label={`View ${project.project_name} repository`}
                >
                  →
                </a>
              </div>
            </div>
          </div>
        )
      })}
      {/* Resume button - appears below the 3 bubbles */}
      <div className="mt-12 pt-8 border-t border-gray-400 dark:border-slate-700/50">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors hover:underline"
        >
          View Projects Archives
        </a>
      </div>
    </section>
  )
}
