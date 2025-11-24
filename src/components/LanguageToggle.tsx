import { useLanguage } from '../hooks/useLanguage';
import { Languages } from 'lucide-react';

const LanguageToggle = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-300 group"
      title={currentLanguage === 'zhCN' ? 'Switch to English' : '切换到中文'}
    >
      <Languages className="w-4 h-4 text-gray-800 group-hover:scale-110 transition-transform duration-300" />
      <span className="text-gray-800 font-medium text-sm">
        {currentLanguage === 'zhCN' ? 'EN' : '中'}
      </span>
    </button>
  );
};

export default LanguageToggle;
