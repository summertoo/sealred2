import React, { useState, useEffect } from 'react';
import { Room, RoomStatus, GameChoice, DEFAULT_ROOM_CONFIG } from '../types/room';
import { getRoomDetails, joinRoom, encryptChoice, revealChoice, leaveRoom } from '../services/roomService';
import { useLanguage } from '../hooks/useLanguage';
import { ArrowLeft, Users, Trophy, Coins, Lock, Eye, Clock, CheckCircle, AlertCircle, LogOut } from 'lucide-react';

interface RoomDetailsProps {
  roomId: string;
  onBack: () => void;
  currentAccount?: string;
}

export const RoomDetails: React.FC<RoomDetailsProps> = ({ roomId, onBack, currentAccount }) => {
  const { t } = useLanguage();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadRoomDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const roomData = await getRoomDetails(roomId);
      setRoom(roomData);
    } catch (error) {
      console.error('Failed to load room details:', error);
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoomDetails();
    
    // 设置定时刷新
    const interval = setInterval(loadRoomDetails, 5000);
    return () => clearInterval(interval);
  }, [roomId]);

  const handleJoinRoom = async () => {
    if (!currentAccount) return;
    
    try {
      setActionLoading(true);
      setError(null);
      await joinRoom({ roomId }, currentAccount);
      await loadRoomDetails();
    } catch (error) {
      console.error('Failed to join room:', error);
      setError(t('room.errorJoinRoom'));
    } finally {
      setActionLoading(false);
    }
  };

  const handleEncryptChoice = async () => {
    if (!currentAccount || !selectedChoice) return;
    
    try {
      setActionLoading(true);
      setError(null);
      await encryptChoice({ roomId, choice: selectedChoice }, currentAccount);
      await loadRoomDetails();
      setSelectedChoice(null);
    } catch (error) {
      console.error('Failed to encrypt choice:', error);
      setError(t('common.error'));
    } finally {
      setActionLoading(false);
    }
  };

  const handleRevealChoice = async (choice: 'A' | 'B') => {
    if (!currentAccount) return;
    
    try {
      setActionLoading(true);
      setError(null);
      await revealChoice({ roomId, choice, nonce: 'mock-nonce' }, currentAccount);
      await loadRoomDetails();
    } catch (error) {
      console.error('Failed to reveal choice:', error);
      setError(t('common.error'));
    } finally {
      setActionLoading(false);
    }
  };

  const handleLeaveRoom = async () => {
    if (!currentAccount) return;
    
    try {
      setActionLoading(true);
      setError(null);
      await leaveRoom(roomId, currentAccount);
      onBack();
    } catch (error) {
      console.error('Failed to leave room:', error);
      setError(t('common.error'));
    } finally {
      setActionLoading(false);
    }
  };

  const getCurrentPlayer = () => {
    if (!room || !currentAccount) return null;
    return room.players.find(p => p.address === currentAccount);
  };

  const canJoinRoom = () => {
    return room && 
           room.status === RoomStatus.WAITING && 
           room.currentPlayers < room.maxPlayers &&
           !getCurrentPlayer();
  };

  const canEncryptChoice = () => {
    const player = getCurrentPlayer();
    return player && !player.hasEncrypted && room?.status === RoomStatus.WAITING;
  };

  const canRevealChoice = () => {
    const player = getCurrentPlayer();
    return player && player.hasEncrypted && !player.hasRevealed && room?.status === RoomStatus.PLAYING;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('common.error')}</h2>
          <button
            onClick={onBack}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {t('common.back')}
          </button>
        </div>
      </div>
    );
  }

  const currentPlayer = getCurrentPlayer();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-none px-[20%]">
        <div className="max-w-4xl mx-auto py-8">
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
                <Trophy className="w-8 h-8 text-yellow-500" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{t('room.roomDetails')}</h1>
                  <p className="text-gray-600">{room.name}</p>
                </div>
              </div>
              
              {currentPlayer && (
                <button
                  onClick={handleLeaveRoom}
                  disabled={actionLoading}
                  className="flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('room.leftRoom')}</span>
                </button>
              )}
            </div>

            {/* Room Info */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{room.betAmount} SUI</div>
                  <div className="text-sm text-blue-100">{t('room.betAmount')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{room.currentPlayers}/{room.maxPlayers}</div>
                  <div className="text-sm text-blue-100">{t('room.players')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{(room.currentPlayers * room.betAmount).toFixed(1)} SUI</div>
                  <div className="text-sm text-blue-100">{t('room.prizePool')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold capitalize">{room.status}</div>
                  <div className="text-sm text-blue-100">{t('room.status')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Player Actions */}
          {currentAccount && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t('room.selectChoice')}</h2>
              
              {!currentPlayer && canJoinRoom() && (
                <div className="text-center">
                  <button
                    onClick={handleJoinRoom}
                    disabled={actionLoading}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-bold text-lg hover:scale-105 disabled:opacity-50"
                  >
                    {actionLoading ? t('room.joiningRoom') : t('room.joinRoom')}
                  </button>
                </div>
              )}

              {canEncryptChoice() && (
                <div>
                  <p className="text-gray-600 mb-4">{t('room.encryptChoice')}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <button
                      onClick={() => setSelectedChoice(GameChoice.A)}
                      className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                        selectedChoice === GameChoice.A
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl font-bold mb-2">{t('room.choiceA')}</div>
                      <div className="text-sm text-gray-600">选择选项A</div>
                    </button>
                    <button
                      onClick={() => setSelectedChoice(GameChoice.B)}
                      className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                        selectedChoice === GameChoice.B
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl font-bold mb-2">{t('room.choiceB')}</div>
                      <div className="text-sm text-gray-600">选择选项B</div>
                    </button>
                  </div>
                  <button
                    onClick={handleEncryptChoice}
                    disabled={!selectedChoice || actionLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-bold disabled:opacity-50"
                  >
                    {actionLoading ? t('common.loading') : t('room.encryptChoice')}
                  </button>
                </div>
              )}

              {canRevealChoice() && (
                <div>
                  <p className="text-gray-600 mb-4">{t('room.revealChoice')}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleRevealChoice(GameChoice.A)}
                      disabled={actionLoading}
                      className="bg-blue-100 text-blue-700 px-6 py-4 rounded-lg hover:bg-blue-200 transition-colors font-bold disabled:opacity-50"
                    >
                      {t('room.choiceA')}
                    </button>
                    <button
                      onClick={() => handleRevealChoice(GameChoice.B)}
                      disabled={actionLoading}
                      className="bg-purple-100 text-purple-700 px-6 py-4 rounded-lg hover:bg-purple-200 transition-colors font-bold disabled:opacity-50"
                    >
                      {t('room.choiceB')}
                    </button>
                  </div>
                </div>
              )}

              {currentPlayer && currentPlayer.hasEncrypted && currentPlayer.hasRevealed && (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-green-700 font-bold text-lg">{t('common.success')}</p>
                </div>
              )}
            </div>
          )}

          {/* Players List */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>{t('room.playerList')}</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {room.players.map((player, index) => (
                <div
                  key={player.address}
                  className={`border rounded-lg p-4 ${
                    player.isWinner 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{player.avatar || '👤'}</span>
                      <span className="font-medium">{player.name || player.address.slice(0, 6)}</span>
                      {player.isWinner && (
                        <Trophy className="w-4 h-4 text-yellow-500" />
                      )}
                      {player.address === room.creator && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">创建者</span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">#{index + 1}</span>
                  </div>
                  
                  <div className="text-xs text-gray-600 mb-2">
                    {player.address.slice(0, 6)}...{player.address.slice(-4)}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${
                        player.encryptedChoice ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <span className="text-xs text-gray-600">
                        {player.encryptedChoice ? '已加密' : '未加密'}
                      </span>
                    </div>
                    
                    {room.status === RoomStatus.FINISHED && player.revealedChoice && (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        player.revealedChoice === GameChoice.A 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {player.revealedChoice}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Game Result */}
          {room.status === RoomStatus.FINISHED && room.gameResult && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>{t('room.gameResult')}</span>
              </h2>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">{t('room.totalA')}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{t('room.choiceA')}:</span>
                        <span className="text-sm font-bold text-blue-600">
                          {room.gameResult.totalA} 人
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{t('room.choiceB')}:</span>
                        <span className="text-sm font-bold text-purple-600">
                          {room.gameResult.totalB} 人
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">{t('room.winners')}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{t('room.winnerChoice')}:</span>
                        <span className="text-sm font-bold text-green-600">
                          {room.gameResult.winnerChoice}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{t('room.winners')}:</span>
                        <span className="text-sm font-bold text-green-600">
                          {room.gameResult.winners.length} 人
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{t('room.prizePerWinner')}:</span>
                        <span className="text-sm font-bold text-yellow-600">
                          {room.gameResult.prizePerWinner} SUI
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-100 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800 text-center">
                    🎉 {t('room.minorityWins').replace('{choice}', room.gameResult.winnerChoice)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
