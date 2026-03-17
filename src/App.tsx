import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HomeHero } from './components/home/HomeHero'
import { ProjectsSection } from './components/projects/ProjectsSection'
import { ExperienceSection } from './components/experience/ExperienceSection'
import { ContactSection } from './components/contact/ContactSection'
import { ToolsSection } from './components/tools/ToolsSection'
import { PresentationsSection } from './components/presentations/PresentationsSection'
import { GridBackground } from './components/layout/GridBackground'
import Lenis from 'lenis'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    })
    
    // @ts-ignore
    window.lenis = lenis
    
    return () => {
      lenis.destroy()
      // @ts-ignore
      window.lenis = undefined
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-secondary/30 selection:text-secondary">
      <GridBackground />
      <Navbar />
      
      <main className="flex-1 w-full relative z-10">
        <HomeHero />
        
        <ProjectsSection />

        <ToolsSection />

        <PresentationsSection />

        <ExperienceSection />
        <ContactSection />
      </main>


      <Footer />
    </div>
  )
}

export default App
