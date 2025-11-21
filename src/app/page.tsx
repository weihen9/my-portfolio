'use client'
import { ModeToggle } from './components/ModeToggle'

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row h-screen justify-center ">
      <div className="flex flex-col md:flex-row md:w-7/10 min-h-screen gap-6 border border-white">
        <div className="flex flex-col w-full min-h-screen md:min-h-0 border justify-center border-blue-500">
          <div className="flex flex-col w-full h-8/10 border border-orange-500">
            <section className="w-full border border-green-500"></section>
          </div>
        </div>
        <div className="w-full border border-purple-500"></div>
      </div>
      <div className="absolute top-5 right-5 hidden md:block">
        <ModeToggle />
      </div>
    </div>
  )
}
