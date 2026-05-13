export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-4">CETRESDÉ</h1>
        <p className="text-xl text-gray-600 mb-8">
          Impresión 3D Personalizada
        </p>
        <p className="text-gray-700 max-w-2xl">
          Bienvenido a tu web. Los componentes originales de Spark están siendo adaptados a Next.js + Sanity CMS.
        </p>

        <div className="mt-16 p-8 bg-blue-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Estado del Proyecto</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Next.js 16 + React 19</li>
            <li>✓ Tailwind CSS v3</li>
            <li>✓ Sanity CMS configurado (Project ID: 5inbyxem)</li>
            <li>✓ Componentes UI de Radix listos</li>
            <li>⏳ Adaptando componentes principales de Spark</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
