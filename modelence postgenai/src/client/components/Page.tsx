import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useTheme } from '../hooks/useTheme';

interface PageProps {
  children: ReactNode;
  className?: string;
}

export default function Page({ children, className = '' }: PageProps) {
  const { isDark } = useTheme();
  
  return (
    <div className={`${isDark ? 'dark bg-black' : 'bg-white'} min-h-screen transition-colors duration-200`}>
      <div className="flex h-screen">
        <Sidebar />
        <main className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'} transition-colors duration-200 ${className}`}>
          <Header />
          <div className="flex-1 min-h-0 overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}