import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface SignUpProps {
  isDark: boolean;
  onClose: () => void;
}

export default function SignUp({ isDark, onClose }: SignUpProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock sign up functionality
    console.log('Sign up attempted with:', formData);
    alert('Sign up functionality would be implemented here');
  };

  const handleGoogleSignUp = () => {
    // Mock Google sign up
    console.log('Google sign up attempted');
    alert('Google sign up would be implemented here');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-2xl p-8 ${
        isDark ? 'bg-black border border-gray-800' : 'bg-white border border-gray-200'
      }`}>
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 375 374.999991" className="w-12 h-12">
            <rect x="0" width="375" y="0" height="374.999991" fill="transparent"/>
            <path d="M 279.726562 326.953125 L 288.613281 322.355469 L 320.546875 221.902344 L 290.769531 164.371094 L 351.574219 154.339844 L 349.945312 144.472656 L 264.277344 83.054688 L 200.355469 93.597656 L 209.597656 32.671875 L 199.710938 31.171875 L 114.828125 93.667969 L 105.101562 157.714844 L 50.023438 130.09375 L 45.539062 139.03125 L 78.753906 239.070312 L 136.660156 268.113281 L 93.363281 311.964844 L 100.476562 318.988281 L 205.886719 318.320312 L 251.402344 272.222656 Z M 123.375 213.707031 L 119.042969 199.058594 L 147.476562 178.105469 L 155.027344 128.652344 L 167.617188 120.007812 L 196.339844 140.578125 L 245.703125 132.480469 L 257.808594 141.785156 L 247.125 175.457031 L 270.082031 219.90625 L 264.972656 234.292969 L 229.648438 234.535156 L 194.476562 270.101562 L 179.214844 269.691406 L 168.074219 236.171875 L 123.375 213.714844 Z M 123.375 213.707031" fill="#5e17eb"/>
          </svg>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-2xl font-light mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
            Create Account
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Join us to start generating amazing social media posts
          </p>
        </div>

        {/* Google Sign Up Button */}
        <button
          onClick={handleGoogleSignUp}
          className={`w-full p-4 rounded-xl border transition-all duration-200 flex items-center justify-center space-x-3 mb-6 ${
            isDark
              ? 'border-gray-700 hover:border-gray-600 text-white hover:bg-gray-900'
              : 'border-gray-300 hover:border-gray-400 text-black hover:bg-gray-50'
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative mb-6">
          <div className={`absolute inset-0 flex items-center`}>
            <div className={`w-full border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-2 ${isDark ? 'bg-black text-gray-400' : 'bg-white text-gray-500'}`}>
              Or continue with email
            </span>
          </div>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="relative">
            <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full pl-12 pr-4 py-4 rounded-xl border-0 transition-all duration-200 ${
                isDark
                  ? 'bg-gray-900 text-white placeholder-gray-500 focus:bg-gray-800'
                  : 'bg-gray-50 text-black placeholder-gray-400 focus:bg-gray-100'
              } focus:outline-none`}
              required
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-12 pr-4 py-4 rounded-xl border-0 transition-all duration-200 ${
                isDark
                  ? 'bg-gray-900 text-white placeholder-gray-500 focus:bg-gray-800'
                  : 'bg-gray-50 text-black placeholder-gray-400 focus:bg-gray-100'
              } focus:outline-none`}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full pl-12 pr-12 py-4 rounded-xl border-0 transition-all duration-200 ${
                isDark
                  ? 'bg-gray-900 text-white placeholder-gray-500 focus:bg-gray-800'
                  : 'bg-gray-50 text-black placeholder-gray-400 focus:bg-gray-100'
              } focus:outline-none`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                isDark ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full pl-12 pr-4 py-4 rounded-xl border-0 transition-all duration-200 ${
                isDark
                  ? 'bg-gray-900 text-white placeholder-gray-500 focus:bg-gray-800'
                  : 'bg-gray-50 text-black placeholder-gray-400 focus:bg-gray-100'
              } focus:outline-none`}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-4 px-6 rounded-xl transition-all duration-200 font-medium ${
              isDark
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <button
              onClick={onClose}
              className={`font-medium ${isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'}`}
            >
              Sign in
            </button>
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-all duration-200 ${
            isDark
              ? 'text-gray-400 hover:bg-gray-900 hover:text-white'
              : 'text-gray-400 hover:bg-gray-100 hover:text-black'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}