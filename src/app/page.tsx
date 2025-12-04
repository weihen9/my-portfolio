'use client'
import ExperienceSection from './components/ExperienceBubble'
import Navbar from './components/MainNavBar'
import { ModeToggle } from './components/ModeToggle'
import ProjectsSection from './components/ProjectBubble'
import SocialBar from './components/SocialBar'

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row md:px-40 gap-6 ">
      <div className="md:sticky md:top-0 md:w-1/2 h-screen py-40 md:py-28 px-12">
        <div className="flex flex-col h-full gap-6">
          <div className="flex flex-col gap-2">
            <div className="accentWords font-medium text-lg text-cyan-400 ">Hi, Im</div>
            <div className="text-6xl font-black">Wei Heng.</div>
            <div className="text-6xl font-black">And Im a newbie.</div>
          </div>
          <div className="w-9/10 font-medium text-base">
            Exploring different IT specializations to find my focus—currently dabbling in front-end
            development, UI/UX design, and cloud computing with AI integration.
          </div>
          <div className="hidden md:block">
            <Navbar />
          </div>
          <div className="md:mt-auto">
            <SocialBar />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="space-y-32 py-28 px-12">
          <section id="about" className="space-y-4">
            <div className="flex items-center gap-4 mb-16">
              <span className="font-mono text-xl text-cyan-500">01.</span>
              <h2 className="text-3xl font-bold ">About Me</h2>
              <div className="h-px flex-1 bg-current"></div>
            </div>
            <p>{`I'm a recent Information Technology graduate from Ngee Ann Polytechnic currently exploring the diverse landscape of IT to find my specialization. My curiosity spans cloud computing with AI integration, UI/UX design, and front-end development—areas Ive been actively experimenting with since my polytechnic days.`}</p>
            <p>{`My most substantial experience came as a Full Stack Engineer intern at PwC, where I single-handedly developed a centralized Service Hub software from the ground up. Using Power Apps, Power Automate, and SharePoint as the backbone, I created a self-service platform that streamlined administrative processes and simplified onboarding for new employees (think leave applications, medical claims, and procedural guidance—all in one place).`}</p>
            <p>{`Beyond development, I also designed the entire hub's UI/UX experience from scratch, transforming a theoretical requirements list into a functional, user-friendly interface. While my attempt at Copilot integration remained a work-in-progress by the of the internship, the experience was invaluable—it not only sharpened my technical skills but also ignited my genuine interest in AI applications.`}</p>
            <p>{`This hands-on exposure taught me that I thrive when bridging technical implementation with thoughtful design, and Im now eager to deepen my expertise in cloud architecture and AI integration while maintaining my passion for creating intuitive user experiences.`}</p>
          </section>

          <section id="experience" className="space-y-4">
            <div className="flex items-center gap-4 mb-16">
              <span className="font-mono text-xl text-cyan-500">02.</span>
              <h2 className="text-3xl font-bold">Experience</h2>
              <div className="h-px flex-1 bg-current"></div>
            </div>
            <ExperienceSection />
          </section>

          <section id="projects" className="space-y-4">
            <div className="flex items-center gap-4 mb-16">
              <span className="font-mono text-xl text-cyan-500">03.</span>
              <h2 className="text-3xl font-bold">Projects</h2>
              <div className="h-px flex-1 bg-current"></div>
            </div>
            <ProjectsSection />
          </section>
        </div>
      </div>
      <div className="fixed top-5 right-5 hidden md:block">
        <ModeToggle />
      </div>
    </div>
  )
}
