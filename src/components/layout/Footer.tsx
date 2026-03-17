export function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-card-border mt-32">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted font-mono">
          © {new Date().getFullYear()} Arafat. All rights reserved.
        </p>
        
        <div className="flex items-center gap-6">
          {[
            { name: 'GitHub', href: 'https://github.com/AIarafatnoob' },
            { name: 'LinkedIn', href: 'https://www.linkedin.com/in/arafat-rahman-97898214b/' }
          ].map(social => (
            <a 
              key={social.name} 
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted hover:text-secondary transition-colors"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
