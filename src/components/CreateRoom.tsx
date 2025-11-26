import React, { useState } from 'react';
import { createRoom } from '../services/roomService';
import { useLanguage } from '../hooks/useLanguage';
import { DEFAULT_ROOM_CONFIG } from '../types/room';
import { ArrowLeft, Plus, Coins, Users, AlertCircle, CheckCircle } from 'lucide-react';

interface CreateRoomProps {
  onBack: () => void;
  onRoomCreated: (roomId: string) => void;
  currentAccount?: string;
}

export const CreateRoom: React.FC<CreateRoomProps> = ({ onBack, onRoomCreated, currentAccount }) => {
  const { t } = useLanguage();
  const [roomName, setRoomName] = useState('');
  const [betAmount, setBetAmount] = useState(DEFAULT_ROOM_CONFIG.DEFAULT_BET_AMOUNTS[1]);
  const [maxPlayers, setMaxPlayers] = useState(9);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentAccount) {
      setError(t('common.error'));
      return;
    }

    if (!roomName.trim()) {
      setError(t('room.enterRoomName'));
      return;
    }

    if (betAmount < DEFAULT_ROOM_CONFIG.MIN_BET_AMOUNT || betAmount > DEFAULT_ROOM_CONFIG.MAX_BET_AMOUNT) {
      setError(`押注金额必须在 ${DEFAULT_ROOM_CONFIG.MIN_BET_AMOUNT} - ${DEFAULT_ROOM_CONFIG.MAX_BET_AMOUNT} SUI 之间`);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const room = await createRoom({
        name: roomName.trim(),
        betAmount,
        maxPlayers
      }, currentAccount);

      setSuccess(true);
      setTimeout(() => {
        onRoomCreated(room.id);
      }, 1500);
      
    } catch (error) {
      console.error('Failed to create room:', error);
      setError(t('room.errorCreateRoom'));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('room.roomCreated')}</h2>
          <p className="text-gray-600">正在跳转到房间...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-none px-[20%]">
        <div className="max-w-2xl mx-auto py-8">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{t('common.back')}</span>
              </button>
              
              <div className="flex items-center space-x-3">
                <Plus className="w-8 h-8 text-green-500" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{t('room.createRoom')}</h1>
                  <p className="text-gray-600">{t('room.createNewRoom')}</p>
                </div>
              </div>
              
              <div className="w-20" /> {/* Spacer for centering */}
            </div>
          </div>

          {/* Create Room Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Room Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('room.roomName')}
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder={t('room.enterRoomName')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  maxLength={50}
                />
                <div className="mt-1 text-sm text-gray-500">
                  {roomName.length}/50 字符
                </div>
              </div>

              {/* Bet Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('room.betAmount')} (SUI)
                </label>
                <div className="grid grid-cols-4 gap-3 mb-3">
                  {DEFAULT_ROOM_CONFIG.DEFAULT_BET_AMOUNTS.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setBetAmount(amount)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        betAmount === amount
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold">{amount}</div>
                      <div className="text-xs text-gray-500">SUI</div>
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0)}
                  min={DEFAULT_ROOM_CONFIG.MIN_BET_AMOUNT}
                  max={DEFAULT_ROOM_CONFIG.MAX_BET_AMOUNT}
                  step="0.1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <div className="mt-1 text-sm text-gray-500">
                  范围: {DEFAULT_ROOM_CONFIG.MIN_BET_AMOUNT} - {DEFAULT_ROOM_CONFIG.MAX_BET_AMOUNT} SUI
                </div>
              </div>

              {/* Max Players */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('room.maxPlayers')}
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[2, 3, 5, 9].map((players) => (
                    <button
                      key={players}
                      type="button"
                      onClick={() => setMaxPlayers(players)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        maxPlayers === players
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold">{players}</div>
                      <div className="text-xs text-gray-500">人</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Room Preview */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">房间预览</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">房间名称:</span>
                    <span className="font-medium">{roomName || '未设置'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">押注金额:</span>
                    <span className="font-medium">{betAmount} SUI</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">最大玩家:</span>
                    <span className="font-medium">{maxPlayers} 人</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">预计奖池:</span>
                    <span className="font-medium text-green-600">
                      {(betAmount * maxPlayers).toFixed(1)} SUI
                    </span>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !roomName.trim() || !currentAccount}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-bold text-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('room.creatingRoom') : t('room.createRoom')}
              </button>
            </form>
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">游戏规则说明</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                <p>创建房间后，您将成为房主，可以等待其他玩家加入</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                <p>房间满员后，所有玩家需要先加密自己的选择</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                <p>所有玩家加密完成后，需要揭晓自己的选择</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">4</div>
                <p>选择少数方的玩家将分享奖池，如果平局则随机选择获胜方</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
