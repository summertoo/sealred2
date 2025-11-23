import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Shield, Users, Trophy } from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  icon: React.ReactNode;
  action?: {
    text: string;
    onClick: () => void;
  };
}

interface InteractiveTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const steps: TutorialStep[] = [
    {
      id: 'welcome',
      title: '欢迎来到 Seal 红包接龙',
      content: '这是一个基于 Sui 区块链和 Seal 加密技术的公平游戏。9名玩家押注 SUI，选择 A 或 B，少数方获胜所有奖金！',
      icon: <Trophy className="w-8 h-8 text-yellow-500" />
    },
    {
      id: 'how-to-play',
      title: '游戏规则',
      content: '1. 加入房间并押注 SUI\n2. 秘密选择 A 或 B（使用 Seal 加密）\n3. 等待所有玩家完成选择\n4. 公开解密，少数方获胜\n5. 赢家平分奖金池',
      icon: <Play className="w-8 h-8 text-blue-500" />
    },
    {
      id: 'encryption',
      title: 'Seal 加密保护',
      content: '你的选择使用 Seal 技术加密，确保：\n• 完全匿名 - 没人知道你选了什么\n• 公平透明 - 所有加密数据可验证\n• 无法作弊 - 选择后无法更改',
      icon: <Shield className="w-8 h-8 text-green-500" />
    },
    {
      id: 'strategy',
      title: '获胜策略',
      content: '这是心理博弈！\n• 观察其他玩家的行为模式\n• 避免随大流 - 少数方才能赢\n• 保持冷静，做出独立判断\n• 记住：4-5人选择同一方时，另一方获胜',
      icon: <Users className="w-8 h-8 text-purple-500" />
    },
    {
      id: 'demo',
      title: '体验演示房间',
      content: '现在你可以体验演示房间，了解完整的游戏流程。演示使用模拟数据，让你安全学习游戏机制。',
      icon: <Play className="w-8 h-8 text-orange-500" />,
      action: {
        text: '开始演示',
        onClick: () => {
          setIsCompleted(true);
          onComplete?.();
          onClose();
        }
      }
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      onComplete?.();
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setIsCompleted(true);
    onComplete?.();
    onClose();
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-hidden shadow-2xl transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1" />
            <div className="flex items-center justify-center space-x-3">
              {currentStepData.icon}
              <h2 className="text-2xl font-bold text-center">{currentStepData.title}</h2>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors p-1 rounded-lg hover:bg-white hover:bg-opacity-20"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Progress */}
          <div className="flex space-x-2 max-w-xs mx-auto">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-white shadow-lg'
                    : index < currentStep
                    ? 'bg-white bg-opacity-70'
                    : 'bg-white bg-opacity-30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="mb-8">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-lg">
              {currentStepData.content}
            </p>
          </div>

          {/* Action Button */}
          {currentStepData.action && (
            <button
              onClick={currentStepData.action.onClick}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 mb-6 text-lg shadow-lg"
            >
              {currentStepData.action.text}
            </button>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 hover:shadow-md'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">上一步</span>
            </button>

            <span className="text-sm text-gray-500 font-medium bg-gray-100 px-4 py-2 rounded-full">
              {currentStep + 1} / {steps.length}
            </span>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:shadow-md font-medium"
            >
              <span>{currentStep === steps.length - 1 ? '完成' : '下一步'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Skip Button */}
          {currentStep < steps.length - 1 && (
            <div className="mt-6 text-center">
              <button
                onClick={handleSkip}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors hover:underline"
              >
                跳过教程
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveTutorial;
