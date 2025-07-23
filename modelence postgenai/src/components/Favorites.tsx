import React, { useState } from 'react';
import { Heart, Copy, Check, Search, Trash2 } from 'lucide-react';

interface FavoritesProps {
  isDark: boolean;
  favorites: any[];
  onRemoveFromFavorites: (postId: string) => void;
}

export default function Favorites({ isDark, favorites, onRemoveFromFavorites }: FavoritesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredFavorites = favorites.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.topic?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="flex-1 p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className={`text-3xl font-light ${isDark ? 'text-white' : 'text-black'} mb-6`}>
          Favorite Posts
        </h1>
        
        {favorites.length > 0 && (
          <div className="relative mb-6">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border-0 transition-all duration-200 ${
                isDark
                  ? 'bg-gray-900 text-white placeholder-gray-500 focus:bg-gray-800'
                  : 'bg-gray-50 text-black placeholder-gray-400 focus:bg-gray-100'
              } focus:outline-none`}
            />
          </div>
        )}
      </div>

      {filteredFavorites.length === 0 ? (
        <div className={`text-center py-16 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">
            {favorites.length === 0 ? 'No favorite posts yet' : 'No favorites match your search'}
          </p>
          <p className="text-sm">
            {favorites.length === 0 ? 'Heart posts you love to save them here' : 'Try adjusting your search'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
            {filteredFavorites.length} favorite post{filteredFavorites.length !== 1 ? 's' : ''}
          </div>
          
          {filteredFavorites.map((post) => (
            <div
              key={post.id}
              className={`p-6 rounded-xl transition-all duration-200 border-l-4 border-red-500 ${
                isDark
                  ? 'bg-gray-900 hover:bg-gray-800'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
                  </span>
                  {post.tone && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {post.tone}
                    </span>
                  )}
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {formatDate(post.timestamp)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyToClipboard(post.content, post.id)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      isDark
                        ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        : 'text-gray-400 hover:bg-gray-200 hover:text-black'
                    }`}
                  >
                    {copiedId === post.id ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => onRemoveFromFavorites(post.id)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      isDark
                        ? 'text-red-400 hover:bg-red-900'
                        : 'text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className={`${isDark ? 'text-gray-200' : 'text-gray-800'} leading-relaxed mb-3`}>
                {post.content}
              </p>
              {post.topic && (
                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mb-2`}>
                  Topic: {post.topic}
                </div>
              )}
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {post.characterCount} characters
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}