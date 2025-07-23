import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useTheme } from '../hooks/useTheme';

export default function NotFoundPage() {
  const { isDark } = useTheme();
  
  return (
    <div className={`h-screen flex flex-col ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Header />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-8">
            <h1 className={`text-9xl font-bold mb-4 ${isDark ? 'text-gray-700' : 'text-gray-300'}`}>404</h1>
            <h2 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>Page Not Found</h2>
            <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link to="/">
              <button className={`px-6 py-3 text-lg rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 ${
                isDark
                  ? 'bg-white text-black hover:bg-gray-100 focus:ring-white'
                  : 'bg-black text-white hover:bg-gray-800 focus:ring-black'
              }`}>
                Go Home
              </button>
            </Link>
            
            <div className="text-sm">
              <button 
                onClick={() => window.history.back()}
                className={`underline ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'}`}
              >
                Go back to previous page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}