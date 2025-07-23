import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import PostGenerator from './components/PostGenerator';
import PostHistory from './components/PostHistory';
import Favorites from './components/Favorites';
import Settings from './components/Settings';
import SignUp from './components/SignUp';

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  
  const [activeTab, setActiveTab] = useState('generate');
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [showSignUp, setShowSignUp] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('allPosts');
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedPosts) {
      setAllPosts(JSON.parse(savedPosts).map((post: any) => ({
        ...post,
        timestamp: new Date(post.timestamp)
      })));
    }
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites).map((post: any) => ({
        ...post,
        timestamp: new Date(post.timestamp)
      })));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('allPosts', JSON.stringify(allPosts));
  }, [allPosts]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handlePostGenerated = (posts: any[]) => {
    setAllPosts(prev => [...posts, ...prev]);
  };

  const handleAddToFavorites = (post: any) => {
    setFavorites(prev => {
      const exists = prev.find(p => p.id === post.id);
      if (!exists) {
        return [post, ...prev];
      }
      return prev;
    });
  };

  const handleRemoveFromFavorites = (postId: string) => {
    setFavorites(prev => prev.filter(post => post.id !== postId));
  };

  const handleDeletePost = (postId: string) => {
    setAllPosts(prev => prev.filter(post => post.id !== postId));
    setFavorites(prev => prev.filter(post => post.id !== postId));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'generate':
        return (
          <PostGenerator 
            isDark={isDark} 
            onPostGenerated={handlePostGenerated}
            onAddToFavorites={handleAddToFavorites}
          />
        );
      case 'history':
        return (
          <PostHistory 
            isDark={isDark} 
            posts={allPosts}
            onDeletePost={handleDeletePost}
          />
        );
      case 'favorites':
        return (
          <Favorites 
            isDark={isDark} 
            favorites={favorites}
            onRemoveFromFavorites={handleRemoveFromFavorites}
          />
        );
      case 'settings':
        return <Settings isDark={isDark} />;
      default:
        return (
          <PostGenerator 
            isDark={isDark} 
            onPostGenerated={handlePostGenerated}
            onAddToFavorites={handleAddToFavorites}
          />
        );
    }
  };

  return (
    <div className={`${isDark ? 'dark bg-black' : 'bg-white'} min-h-screen transition-colors duration-200`}>
      <div className="flex h-screen">
        <Sidebar 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSignUpClick={() => setShowSignUp(true)}
        />
        <main className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'} transition-colors duration-200`}>
          {renderContent()}
        </main>
        {showSignUp && (
          <SignUp 
            isDark={isDark} 
            onClose={() => setShowSignUp(false)} 
          />
        )}
      </div>
    </div>
  );
}

export default App;