import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { ProjectModal } from './ProjectModal'

const projects = [
  {
    id: 1,
    title: 'Digital Garage Platform',
    category: 'Next.js',
    image: 'images/Projects/TC.png',
    color: 'from-orange-500/20 to-amber-500/20',
    challenge: "A one of a kind digital platform for motorcycle enthusiats. The client wanted a landing page that meet the asthetic needs of the target market and gave them a detailed view into the product and its offerings.",
    solution: "I implemented an elegant and user-friendly interface using Next.js and Tailwind CSS. The website features a responsive design, smooth animations, and a modern color scheme that reflects the brand's identity. I also implimented a custom carousel to showcase the product in a unique way. Also the CTA doubles as a garage door to give visitors a unique feeling of opening their own garage when they submit for the beta user",
    outcome: "The project resulted in a 45% increase in conversion rate and a 30% reduction in bounce rate within the first quarter. The platform successfully sustained traffic peaks of 50k concurrent users without any degradation in performance.",
    links: { live: "https://www.throttlecove.com/", github: "#" }
  },
  {
    id: 2,
    title: 'Personal Portfolio',
    category: 'React',
    image: 'images/Projects/Am.png',
    color: 'from-emerald-500/20 to-teal-500/20',
    challenge: "This was a very fun project for me and the client. She wanted a portfolio that would showcase her skills and her personality packaged into one. She also wanted it to be very interactive and engaging for the visitors. ",
    solution: "I developed a custom animation for her that would give visitors a unique feeling of opening her portfolio when they visit. I also implemented a custom carousel to showcase her work in a unique way. The custom cursor also adds a unique touch to the website.",
    outcome: "The project was a success and the client was very happy with the result. The website was able to generate a lot of leads and the client was able to get a lot of clients from the website.",
    links: { live: "https://aimantuba.netlify.app/", github: "#" }
  },
  {
    id: 3,
    title: 'Ecommerce Website',
    category: 'Next.js / Tailwind CSS',
    image: 'images/Projects/He.png',
    color: 'from-orange-500/20 to-red-500/20',
    challenge: "The client had a very unique request. He wanted a website that could serve to extend his frozen food business; however, he didn't want the complexity of maintainiing a crm for order trackng and fullfillment.",
    solution: "The solution we came up with was to create a website that could serve as a platform for his business, but without the complexity of a crm. We implemented a system that would allow customers to place orders via Whatsapp. We also implemented a system that would allow the client to track orders and fullfill them.",
    outcome: "The project was a success and the client was very happy with the result. The website was able to generate a lot of leads and the client was able to get a lot of clients from the website.",
    links: { live: "https://heatneat.netlify.app/", github: "#" }
  },
  {
    id: 4,
    title: 'Mobile App',
    category: 'Flutter',
    image: 'images/Projects/tc app.png',
    color: 'from-pink-500/20 to-rose-500/20',
    challenge: "My most ambitious project yet. I wanted to create a platform that could serve as a one-stop shop for all things motorcycles. It serves as a platform for motorcycle enthusiasts to connect with each other and share their passion for motorcycles and keep track of their documents and maintanace.",
    solution: "In build process.",
    outcome: "In build process.",
    links: { live: "#", github: "#" }
  }
]

export function ProjectsSection() {
  const targetRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // We map the scroll progress to an x-translation
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])

  return (
    <section ref={targetRef} id="projects" className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">

        {/* Section Header */}
        <div className="absolute top-32 left-8 md:left-24 z-10 w-full max-w-md">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-foreground uppercase">
            Work.
          </h2>
        </div>

        {/* Horizontal Scroll Track */}
        <motion.div style={{ x }} className="flex gap-12 px-8 md:px-24 pt-32 w-max">
          {projects.map((project) => (
            <motion.div
              layoutId={`project-card-${project.id}`}
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="relative w-[75vw] md:w-[45vw] lg:w-[35vw] h-[45vh] max-h-[450px] flex-shrink-0 rounded-[40px] overflow-hidden group bg-white border-[1px] border-foreground/5 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} z-10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                loading="lazy"
              />

              {/* Content Box */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 bg-gradient-to-t from-background/95 via-background/60 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-secondary font-bold text-xs uppercase tracking-widest mb-4">
                  0{project.id} — {project.category}
                </p>
                <h3 className="text-3xl md:text-5xl font-black text-foreground tracking-tighter uppercase">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  )
}
