import { UserMenu } from '@modelence/auth-ui';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export default function Header() {
  const { isDark } = useTheme();
  
  return (
    <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-800 bg-black' : 'border-gray-200 bg-white'}`}>
      <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 375 374.999991" className="w-8 h-8">
          <rect x="0" width="375" y="0" height="374.999991" fill="transparent"/>
          <path d="M 279.726562 326.953125 L 288.613281 322.355469 L 320.546875 221.902344 L 290.769531 164.371094 L 351.574219 154.339844 L 349.945312 144.472656 L 264.277344 83.054688 L 200.355469 93.597656 L 209.597656 32.671875 L 199.710938 31.171875 L 114.828125 93.667969 L 105.101562 157.714844 L 50.023438 130.09375 L 45.539062 139.03125 L 78.753906 239.070312 L 136.660156 268.113281 L 93.363281 311.964844 L 100.476562 318.988281 L 205.886719 318.320312 L 251.402344 272.222656 Z M 123.375 213.707031 L 119.042969 199.058594 L 147.476562 178.105469 L 155.027344 128.652344 L 167.617188 120.007812 L 196.339844 140.578125 L 245.703125 132.480469 L 257.808594 141.785156 L 247.125 175.457031 L 270.082031 219.90625 L 264.972656 234.292969 L 229.648438 234.535156 L 194.476562 270.101562 L 179.214844 269.691406 L 168.074219 236.171875 L 123.375 213.714844 Z M 123.375 213.707031" fill="#5e17eb"/>
        </svg>
        <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          AI Post Generator
        </span>
      </Link>
      <UserMenu
        menuItems={[
          {
            href: '/profile',
            label: 'Profile',
          },
        ]}
        renderLink={({ href, className, children }) => (
          <Link to={href} className={className}>{children}</Link>
        )}
      />
    </div>
  );
}