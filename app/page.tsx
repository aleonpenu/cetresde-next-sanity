export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            🎉 CETRESDÉ Web
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300">
            Next.js + Sanity CMS + Tailwind CSS
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-4 text-left">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              ✅ Setup Completado
            </h2>

            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li>✓ Next.js 16 + React 19</li>
              <li>✓ Sanity CMS (Project ID: 5inbyxem)</li>
              <li>✓ Tailwind CSS v3</li>
              <li>✓ Radix UI Components (listos para copiar)</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              📋 Próximos pasos:
            </h3>

            <ol className="text-left bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-3 inline-block">
              <li className="text-gray-700 dark:text-gray-300">
                1. Copiar componentes UI desde spark-template
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                2. Crear contenido en Sanity
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                3. Conectar páginas con datos de Sanity
              </li>
              <li className="text-gray-700 dark:text-gray-300">
                4. Deployar en Vercel
              </li>
            </ol>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            Repo: github.com/aleonpenu/cetresde-next-sanity
          </div>
        </div>
      </div>
    </div>
  );
}
