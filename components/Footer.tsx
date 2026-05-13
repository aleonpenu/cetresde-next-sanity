'use client'

import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Empresa */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">CETRESDÉ</h3>
            <p className="text-sm text-gray-400">
              Soluciones innovadoras en impresión 3D para tus proyectos más especiales.
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-white font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Impresión Personalizada</Link></li>
              <li><Link href="#" className="hover:text-white transition">Regalos Personalizados</Link></li>
              <li><Link href="#" className="hover:text-white transition">Prototipos 3D</Link></li>
              <li><Link href="#" className="hover:text-white transition">Producciones en Serie</Link></li>
            </ul>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Portafolio</Link></li>
              <li><Link href="#" className="hover:text-white transition">Sobre Nosotros</Link></li>
              <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contacto</Link></li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h4 className="text-white font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition text-sm font-bold">
                f
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition text-sm font-bold">
                📷
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition text-sm font-bold">
                in
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} CETRESDÉ. Todos los derechos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition">Política de Privacidad</Link>
              <Link href="#" className="hover:text-white transition">Términos de Uso</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
