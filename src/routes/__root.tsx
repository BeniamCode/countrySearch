import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Home, Search, Settings } from 'lucide-react'


export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <nav className="flex space-x-4">
              <NavLink to="/" icon={Home}>
                Home
              </NavLink>
              <NavLink to="/countries" icon={Search}>
                Search
              </NavLink>
              <NavLink to="/settings" icon={Settings}>
                Settings
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      <footer className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            This is just a nice little footer :).
          </p>
        </div>
      </footer>

      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </div>
  );

  function NavLink({ to, children, icon: Icon }) {
    return (
      <Link
        to={to}
        className={({ isActive }) =>
          `flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
            isActive
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`
        }
      >
        {Icon && <Icon size={18} className="mr-2" />}
        {children}
      </Link>
    );
  }
}



