import type { FC } from 'react'
import { Link } from 'react-router-dom'

const HomePage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-4xl font-bold text-gray-800">
        Welcome to React Boilerplate
      </h1>
      <p className="mb-4 text-lg text-gray-600">
        This is a modern React boilerplate with TypeScript, Tailwind CSS, and
        shadcn/ui.
      </p>

      <div className="mb-8">
        <Link
          to="/verify"
          className="inline-flex items-center rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          🎨 View Theme & Component Verification
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-xl font-semibold">TypeScript</h3>
          <p className="text-gray-600">
            Fully typed development experience with excellent IDE support.
          </p>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-xl font-semibold">Tailwind CSS v4</h3>
          <p className="text-gray-600">
            Latest version with simplified configuration and better performance.
          </p>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-xl font-semibold">shadcn/ui</h3>
          <p className="text-gray-600">
            Beautiful, accessible components built on Radix UI primitives.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
