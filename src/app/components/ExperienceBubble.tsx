// components/ExperienceSection.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Job {
  id: number
  start_date: string
  end_date: string | null
  company_name: string
  job_position: string
  description: string
  technologies: string[]
}

export default function ExperienceSection() {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await supabase.from('job_history').select('*')

      // ✅ Sort by id (newest first - largest id values)
      const sorted = (data || []).sort((a, b) => b.id - a.id)

      setJobs(sorted)
    }
    fetchJobs()

    // Realtime subscription
    const subscription = supabase
      .channel('job_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'job_history' }, () => {
        fetchJobs() // Re-fetch and re-sort on DB change
      })
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  // ✅ Get the 3 most recent jobs (largest id values)
  const recentJobs = jobs.slice(0, 3)

  return (
    <section id="experience" className="space-y-8">
      {/* Display only 3 newest experience bubbles */}
      {recentJobs.map((job) => (
        <div
          key={job.id}
          className="group bg-gray-200 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-400 dark:border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:translate-x-1"
        >
          {/* Job header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {job.job_position}
              </h3>
              <p className="text-lg font-medium text-cyan-600 dark:text-cyan-400">
                {job.company_name}
              </p>
            </div>
            <span className="font-mono text-sm text-gray-600 dark:text-slate-400 bg-gray-300 dark:bg-slate-900/50 px-3 py-1 rounded-full">
              {job.start_date} — {job.end_date || 'Present'}
            </span>
          </div>

          {/* Description */}
          <div className="space-y-4 mb-6">
            {job.description.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-900 dark:text-slate-300 leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {job.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium rounded-full bg-gray-300 dark:bg-slate-700/50 text-gray-700 dark:text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all cursor-pointer"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* Resume button - appears below the 3 bubbles */}
      <div className="mt-12 pt-8 border-t border-gray-400 dark:border-slate-700/50">
        <a
          href="/documents/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors hover:underline"
        >
          View Resume
        </a>
      </div>
    </section>
  )
}
