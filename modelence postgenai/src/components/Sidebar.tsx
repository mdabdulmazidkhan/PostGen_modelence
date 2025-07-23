import React from 'react';
import { PlusCircle, Clock, Heart, Settings, Sun, Moon } from 'lucide-react';

interface SidebarProps {
  isDark: boolean;
  toggleTheme: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSignUpClick: () => void;
}

export default function Sidebar({ isDark, toggleTheme, activeTab, setActiveTab, onSignUpClick }: SidebarProps) {
  const menuItems = [
    { id: 'generate', label: 'Generate', icon: PlusCircle },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'favorites', label: 'Favorites', icon: Heart },
  ];

  return (
    <div className={`w-16 h-screen ${isDark ? 'bg-black' : 'bg-white'} border-r ${isDark ? 'border-gray-800' : 'border-gray-200'} flex flex-col items-center py-6`}>
      <div className="mb-8">
        <div className="w-10 h-10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 375 374.999991" className="w-full h-full">
            <rect x="0" width="375" y="0" height="374.999991" fill="transparent"/>
            <path d="M 279.726562 326.953125 L 288.613281 322.355469 L 320.546875 221.902344 L 290.769531 164.371094 L 351.574219 154.339844 L 349.945312 144.472656 L 264.277344 83.054688 L 200.355469 93.597656 L 209.597656 32.671875 L 199.710938 31.171875 L 114.828125 93.667969 L 105.101562 157.714844 L 50.023438 130.09375 L 45.539062 139.03125 L 78.753906 239.070312 L 136.660156 268.113281 L 93.363281 311.964844 L 100.476562 318.988281 L 205.886719 318.320312 L 251.402344 272.222656 Z M 123.375 213.707031 L 119.042969 199.058594 L 147.476562 178.105469 L 155.027344 128.652344 L 167.617188 120.007812 L 196.339844 140.578125 L 245.703125 132.480469 L 257.808594 141.785156 L 247.125 175.457031 L 270.082031 219.90625 L 264.972656 234.292969 L 229.648438 234.535156 L 194.476562 270.101562 L 179.214844 269.691406 L 168.074219 236.171875 L 123.375 213.714844 Z M 123.375 213.707031" fill="#5e17eb"/>
          </svg>
        </div>
      </div>

      <nav className="flex-1">
        <div className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  activeTab === item.id
                    ? isDark
                      ? 'bg-white text-black'
                      : 'bg-black text-white'
                    : isDark
                    ? 'text-gray-400 hover:bg-gray-900 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </nav>

      <div className="space-y-3">
        <button
          onClick={toggleTheme}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
            isDark
              ? 'text-gray-400 hover:bg-gray-900 hover:text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-black'
          }`}
          title="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
            activeTab === 'settings'
              ? isDark
                ? 'bg-white text-black'
                : 'bg-black text-white'
              : isDark
              ? 'text-gray-400 hover:bg-gray-900 hover:text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-black'
          }`}
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
        
        <button
          onClick={onSignUpClick}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
            isDark
              ? 'text-gray-400 hover:bg-gray-900 hover:text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-black'
          }`}
          title="Sign Up"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}