import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { modelenceQuery, modelenceMutation } from '@modelence/react-query';
import { Settings as SettingsIcon, Save, Download, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Page from '../components/Page';
import { useTheme } from '../hooks/useTheme';

interface UserSettings {
  defaultPlatform: string;
  defaultTone: string;
  autoSave: boolean;
}

export default function SettingsPage() {
  const { isDark } = useTheme();
  const queryClient = useQueryClient();
  const [defaultPlatform, setDefaultPlatform] = useState('twitter');
  const [defaultTone, setDefaultTone] = useState('professional');
  const [autoSave, setAutoSave] = useState(true);

  const { data: settings } = useQuery(
    modelenceQuery<UserSettings>('postGenerator.getSettings')
  );

  const { mutateAsync: updateSettings } = useMutation(
    modelenceMutation('postGenerator.updateSettings')
  );

  const { mutateAsync: exportData } = useMutation(
    modelenceMutation('postGenerator.exportData')
  );

  const { mutateAsync: clearData } = useMutation(
    modelenceMutation('postGenerator.clearData')
  );

  useEffect(() => {
    if (settings) {
      setDefaultPlatform(settings.defaultPlatform);
      setDefaultTone(settings.defaultTone);
      setAutoSave(settings.autoSave);
    }
  }, [settings]);

  const platforms = [
    { value: 'twitter', label: 'Twitter/X' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'tiktok', label: 'TikTok' },
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'funny', label: 'Funny' },
    { value: 'inspiring', label: 'Inspiring' },
    { value: 'educational', label: 'Educational' },
    { value: 'promotional', label: 'Promotional' },
  ];

  const handleSaveSettings = async () => {
    try {
      await updateSettings({
        defaultPlatform,
        defaultTone,
        autoSave,
      });
      queryClient.invalidateQueries({ queryKey: ['postGenerator.getSettings'] });
      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    }
  };

  const handleExportData = async () => {
    try {
      const data = await exportData({});
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-post-generator-data-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Data exported successfully!');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export data');
    }
  };

  const handleClearData = async () => {
    if (!confirm('Are you sure you want to clear all data? This cannot be undone.')) return;
    
    try {
      await clearData({});
      queryClient.invalidateQueries();
      toast.success('All data cleared successfully!');
    } catch (error) {
      console.error('Error clearing data:', error);
      toast.error('Failed to clear data');
    }
  };

  return (
    <Page>
      <div className="flex-1 p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl font-light ${isDark ? 'text-white' : 'text-black'} mb-2`}>
            Settings
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Customize your AI post generator experience
          </p>
        </div>

        <div className="space-y-8">
          {/* Default Preferences */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <h2 className={`text-xl font-medium mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              Default Preferences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Default Platform
                </label>
                <select
                  value={defaultPlatform}
                  onChange={(e) => setDefaultPlatform(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border-0 transition-all duration-200 ${
                    isDark
                      ? 'bg-gray-800 text-white focus:bg-gray-700'
                      : 'bg-white text-black focus:bg-gray-100'
                  } focus:outline-none`}
                >
                  {platforms.map((platform) => (
                    <option key={platform.value} value={platform.value}>
                      {platform.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Default Tone
                </label>
                <select
                  value={defaultTone}
                  onChange={(e) => setDefaultTone(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border-0 transition-all duration-200 ${
                    isDark
                      ? 'bg-gray-800 text-white focus:bg-gray-700'
                      : 'bg-white text-black focus:bg-gray-100'
                  } focus:outline-none`}
                >
                  {tones.map((tone) => (
                    <option key={tone.value} value={tone.value}>
                      {tone.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* App Preferences */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <h2 className={`text-xl font-medium mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              App Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Auto-save posts to history
                  </label>
                  <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Automatically save generated posts to your history
                  </p>
                </div>
                <button
                  onClick={() => setAutoSave(!autoSave)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoSave
                      ? isDark ? 'bg-white' : 'bg-black'
                      : isDark ? 'bg-gray-700' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                      autoSave
                        ? isDark ? 'translate-x-6 bg-black' : 'translate-x-6 bg-white'
                        : isDark ? 'translate-x-1 bg-gray-400' : 'translate-x-1 bg-white'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <h2 className={`text-xl font-medium mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              Data Management
            </h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleExportData}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                    isDark
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-200 text-black hover:bg-gray-300'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </button>
                <button
                  onClick={handleClearData}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                    isDark
                      ? 'bg-red-900 text-red-300 hover:bg-red-800'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All Data</span>
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveSettings}
            className={`w-full py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 ${
              isDark
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-black text-white hover:bg-gray-800'
            } font-medium`}
          >
            <Save className="w-5 h-5" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </Page>
  );
}