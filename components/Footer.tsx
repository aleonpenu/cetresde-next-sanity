export default function Footer() {
  return (
    <footer className="bg-[oklch(0.15_0_0)] text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            oklch(0.52 0.22 25) 2px,
            oklch(0.52 0.22 25) 4px
          )`
        }} />
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="h-20 mb-6 flex items-center">
              <h3 className="text-4xl font-bold tracking-tight text-white">
                ce<span className="text-[oklch(0.52_0.22_25)]">tres</span>dé
              </h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              Transformamos tus ideas en realidad con tecnología de impresión 3D de última generación
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-[oklch(0.52_0.22_25)] tracking-wide">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3 text-white/70">
              <li>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-[oklch(0.52_0.22_25)] transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[oklch(0.52_0.22_25)] transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[oklch(0.52_0.22_25)] transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-[oklch(0.52_0.22_25)] tracking-wide">
              Nuestros Servicios
            </h4>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-[oklch(0.52_0.22_25)] mt-1">•</span>
                <span>Impresión 3D Personalizada</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[oklch(0.52_0.22_25)] mt-1">•</span>
                <span>Diseño 3D a Medida</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[oklch(0.52_0.22_25)] mt-1">•</span>
                <span>Acabados Profesionales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[oklch(0.52_0.22_25)] mt-1">•</span>
                <span>Prototipado Rápido</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[oklch(0.52_0.22_25)]/30 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © 2024 <span className="text-[oklch(0.52_0.22_25)] font-semibold">cetresdé</span>. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
