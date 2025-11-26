import React, { useState, useEffect } from 'react';
import { Room, RoomStatus, ROOM_STATUS_COLORS, ROOM_STATUS_ICONS, RoomStats } from '../types/room';
import { getRooms, getRoomStats } from '../services/roomService';
import { useLanguage } from '../hooks/useLanguage';
import { Users, Trophy, Coins, RefreshCw, Plus, Play, Clock, CheckCircle } from 'lucide-react';

interface RoomListProps {
  onJoinRoom: (roomId: string) => void;
  onCreateRoom: () => void;
  onBackToHome?: () => void;
  currentAccount?: string;
}

export const RoomList: React.FC<RoomListProps> = ({ onJoinRoom, onCreateRoom, onBackToHome, currentAccount }) => {
  const { t } = useLanguage();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [stats, setStats] = useState<RoomStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const [roomsData, statsData] = await Promise.all([
        getRooms(),
        getRoomStats()
      ]);
      setRooms(roomsData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const [roomsData, statsData] = await Promise.all([
        getRooms(),
        getRoomStats()
      ]);
      setRooms(roomsData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to refresh rooms:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const getStatusText = (status: RoomStatus): string => {
    switch (status) {
      case RoomStatus.WAITING:
        return t('room.waiting');
      case RoomStatus.PLAYING:
        return t('room.playing');
      case RoomStatus.FINISHED:
        return t('room.finished');
      default:
        return status;
    }
  };

  const canJoinRoom = (room: Room): boolean => {
    return room.status === RoomStatus.WAITING && 
           room.currentPlayers < room.maxPlayers &&
           !room.players.find(p => p.address === currentAccount);
  };

  const isPlayerInRoom = (room: Room): boolean => {
    return room.players.some(p => p.address === currentAccount);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-none px-[20%]">
        <div className="max-w-6xl mx-auto py-8">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{t('room.title')}</h1>
                  <p className="text-gray-600">{t('room.subtitle')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {onBackToHome && (
                  <button
                    onClick={onBackToHome}
                    className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                    <span>{t('room.backToHome')}</span>
                  </button>
                )}
                
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                  <span>{t('room.refreshRooms')}</span>
                </button>
                
                <button
                  onClick={onCreateRoom}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-bold">{t('room.createRoom')}</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalRooms}</div>
                  <div className="text-sm text-blue-800">{t('home.stats.todayGames')}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.activeRooms}</div>
                  <div className="text-sm text-green-800">{t('room.status')}</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.totalPlayers}</div>
                  <div className="text-sm text-purple-800">{t('home.stats.onlinePlayers')}</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{stats.totalPrizePool.toFixed(1)} SUI</div>
                  <div className="text-sm text-yellow-800">{t('home.stats.prizePool')}</div>
                </div>
              </div>
            )}
          </div>

          {/* Room List */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Play className="w-5 h-5 text-blue-600" />
              <span>{t('room.roomList')}</span>
            </h2>
            
            {rooms.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t('room.noRoomsAvailable')}</h3>
                <p className="text-gray-600 mb-6">{t('room.createFirstRoom')}</p>
                <button
                  onClick={onCreateRoom}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
                >
                  {t('room.createRoom')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-200"
                  >
                    {/* Room Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-800 truncate">{room.name}</h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${ROOM_STATUS_COLORS[room.status]}`}>
                        <span className="mr-1">{ROOM_STATUS_ICONS[room.status]}</span>
                        {getStatusText(room.status as RoomStatus)}
                      </div>
                    </div>

                    {/* Room Info */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Coins className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-600">{t('room.betAmount')}</span>
                        </div>
                        <span className="font-bold text-gray-800">{room.betAmount} SUI</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-600">{t('room.players')}</span>
                        </div>
                        <span className="font-bold text-gray-800">
                          {room.currentPlayers}/{room.maxPlayers}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{t('room.prizePool')}</span>
                        </div>
                        <span className="font-bold text-green-600">
                          {(room.currentPlayers * room.betAmount).toFixed(1)} SUI
                        </span>
                      </div>
                    </div>

                    {/* Players Preview */}
                    <div className="mb-4">
                      <div className="flex -space-x-2">
                        {room.players.slice(0, 5).map((player, index) => (
                          <div
                            key={player.address}
                            className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs"
                            title={player.name || player.address.slice(0, 6)}
                          >
                            {player.avatar || '👤'}
                          </div>
                        ))}
                        {room.players.length > 5 && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                            +{room.players.length - 5}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      {isPlayerInRoom(room) ? (
                        <button
                          onClick={() => onJoinRoom(room.id)}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium"
                        >
                          {room.status === RoomStatus.WAITING ? t('room.waitingPlayers') : t('room.gameInProgress')}
                        </button>
                      ) : canJoinRoom(room) ? (
                        <button
                          onClick={() => onJoinRoom(room.id)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-medium hover:scale-105"
                        >
                          {t('room.joinRoom')}
                        </button>
                      ) : (
                        <button
                          disabled
                          className="flex-1 bg-gray-100 text-gray-400 px-4 py-2 rounded-lg cursor-not-allowed font-medium"
                        >
                        {room.status === 'finished' ? t('room.finished') : 
                           room.currentPlayers >= room.maxPlayers ? t('room.full') : 
                           t('room.playing')}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomList;
