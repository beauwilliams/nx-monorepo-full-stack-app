import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ComputerDesktopIcon, SunIcon, MoonIcon } from '@heroicons/react/20/solid';

const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  console.log('userTheme', theme);

  const getThemeIcon = () => {
    if (theme === 'dark') {
      return <MoonIcon className="h-6 w-6 dark:text-white" />;
    } else if (theme === 'light') {
      return <SunIcon className="h-6 w-6 dark:text-white" />;
    } else if (theme === 'system') {
      return <ComputerDesktopIcon className="h-6 w-6 dark:text-white" />;
    }
  };

  return (
    <div className="flex space-x-1 items-center">
      {getThemeIcon()}
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="dark:text-white rounded dark:bg-gray-900 bg-gray-50"
      >
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  );
};

export default ThemeToggler;
