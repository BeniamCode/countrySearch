import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Home, Search, Settings } from 'lucide-react';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <nav className="flex space-x-4">
              <Link
                to="/"
                className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <Home size={18} className="mr-2" />
                Home
              </Link>
              <Link
                to="/countries"
                className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <Search size={18} className="mr-2" />
                Search
              </Link>
              <Link
                to="/settings"
                className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <Settings size={18} className="mr-2" />
                Settings
              </Link>
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
}

export default RootComponent;