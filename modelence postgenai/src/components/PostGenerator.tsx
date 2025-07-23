import React, { useState } from 'react';
import { Send, Loader2, Copy, Check, Heart, Download, RefreshCw } from 'lucide-react';
import { generatePosts } from '../services/aiService';
import { modelenceService } from '../services/modelenceService';

interface PostGeneratorProps {
  isDark: boolean;
  onPostGenerated: (posts: any[]) => void;
  onAddToFavorites: (post: any) => void;
}

interface GeneratedPost {
  id: string;
  content: string;
  platform: string;
  tone: string;
  topic: string;
  characterCount: number;
  timestamp: Date;
  isFavorite?: boolean;
}

export default function PostGenerator({ isDark, onPostGenerated, onAddToFavorites }: PostGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('twitter');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [numPosts, setNumPosts] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const platforms = [
    { value: 'twitter', label: 'Twitter/X', limit: 280 },
    { value: 'facebook', label: 'Facebook', limit: 2000 },
    { value: 'instagram', label: 'Instagram', limit: 2200 },
    { value: 'linkedin', label: 'LinkedIn', limit: 1300 },
    { value: 'tiktok', label: 'TikTok', limit: 150 },
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'funny', label: 'Funny' },
    { value: 'inspiring', label: 'Inspiring' },
    { value: 'educational', label: 'Educational' },
    { value: 'promotional', label: 'Promotional' },
  ];

  const lengths = [
    { value: 'short', label: 'Short' },
    { value: 'medium', label: 'Medium' },
    { value: 'long', label: 'Long' },
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    try {
      const posts = await generatePosts({
        topic,
        platform,
        tone,
        length,
        count: numPosts,
      });

      const formattedPosts = posts.map((content: string, index: number) => ({
        id: `${Date.now()}-${index}`,
        content,
        platform,
        tone,
        topic,
        characterCount: content.length,
        timestamp: new Date(),
        isFavorite: false,
      }));

      setGeneratedPosts(formattedPosts);
      onPostGenerated(formattedPosts);

      // Log analytics data to Modelence
      await modelenceService.logPostGeneration({
        topic,
        platform,
        tone,
        length,
        count: numPosts,
        generatedCount: posts.length,
        timestamp: new Date().toISOString(),
        success: true,
      });
    } catch (error) {
      console.error('Error generating posts:', error);
      
      // Log error to Modelence
      await modelenceService.logPostGeneration({
        topic,
        platform,
        tone,
        length,
        count: numPosts,
        timestamp: new Date().toISOString(),
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const toggleFavorite = (post: GeneratedPost) => {
    const updatedPost = { ...post, isFavorite: !post.isFavorite };
    setGeneratedPosts(prev => 
      prev.map(p => p.id === post.id ? updatedPost : p)
    );
    if (updatedPost.isFavorite) {
      onAddToFavorites(updatedPost);
    }
  };

  const exportPosts = () => {
    const content = generatedPosts.map((post, index) => 
      `Post ${index + 1} (${post.platform}):\n${post.content}\n\n`
    ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `social-posts-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedPlatform = platforms.find(p => p.value === platform);

  return (
    <div className="flex-1 flex flex-col h-screen max-w-5xl mx-auto">
      <div className="p-8 pb-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-3xl font-light ${isDark ? 'text-white' : 'text-black'}`}>
            Generate Posts
          </h1>
          {generatedPosts.length > 0 && (
            <div className="flex space-x-2">
              <button
                onClick={exportPosts}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                  isDark
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button
                onClick={() => setGeneratedPosts([])}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                  isDark
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 pt-0">
        <div className="space-y-6">
          <div>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What would you like to post about? Be specific for better results..."
              className={`w-full p-4 rounded-xl border-0 transition-all duration-200 ${
                isDark
                  ? 'bg-gray-900 text-white placeholder-gray-500 focus:bg-gray-800'
                  : 'bg-gray-50 text-black placeholder-gray-400 focus:bg-gray-100'
              } focus:outline-none resize-none`}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border-0 transition-all duration-200 ${
                  isDark
                    ? 'bg-gray-900 text-white focus:bg-gray-800'
                    : 'bg-gray-50 text-black focus:bg-gray-100'
                } focus:outline-none`}
              >
                {platforms.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              {selectedPlatform && (
                <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Limit: {selectedPlatform.limit} chars
                </p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border-0 transition-all duration-200 ${
                  isDark
                    ? 'bg-gray-900 text-white focus:bg-gray-800'
                    : 'bg-gray-50 text-black focus:bg-gray-100'
                } focus:outline-none`}
              >
                {tones.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Length
              </label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border-0 transition-all duration-200 ${
                  isDark
                    ? 'bg-gray-900 text-white focus:bg-gray-800'
                    : 'bg-gray-50 text-black focus:bg-gray-100'
                } focus:outline-none`}
              >
                {lengths.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Count
              </label>
              <select
                value={numPosts}
                onChange={(e) => setNumPosts(Number(e.target.value))}
                className={`w-full px-4 py-3 rounded-lg border-0 transition-all duration-200 ${
                  isDark
                    ? 'bg-gray-900 text-white focus:bg-gray-800'
                    : 'bg-gray-50 text-black focus:bg-gray-100'
                } focus:outline-none`}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} post{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!topic.trim() || isGenerating}
            className={`w-full py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 ${
              isDark
                ? 'bg-white text-black hover:bg-gray-100 disabled:bg-gray-800 disabled:text-gray-500'
                : 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400'
            } disabled:cursor-not-allowed font-medium`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating amazing posts...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Generate Posts</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8">
        {generatedPosts.length > 0 && (
          <div className="space-y-4">
            <h2 className={`text-xl font-medium mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              Generated Posts ({generatedPosts.length})
            </h2>
            {generatedPosts.map((post, index) => (
              <div
                key={post.id}
                className={`p-6 rounded-xl transition-all duration-200 ${
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
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Post {index + 1}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleFavorite(post)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        post.isFavorite
                          ? 'text-red-500 hover:bg-red-50'
                          : isDark
                          ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                          : 'text-gray-400 hover:bg-gray-200 hover:text-black'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isFavorite ? 'fill-current' : ''}`} />
                    </button>
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
                  </div>
                </div>
                <p className={`${isDark ? 'text-gray-200' : 'text-gray-800'} leading-relaxed mb-4`}>
                  {post.content}
                </p>
                <div className="flex justify-between items-center text-xs">
                  <span className={`${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {post.characterCount} characters • {post.tone} tone
                  </span>
                  <span className={`${
                    post.characterCount > (selectedPlatform?.limit || 280)
                      ? 'text-red-500'
                      : isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {selectedPlatform && `${selectedPlatform.limit - post.characterCount} chars remaining`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}