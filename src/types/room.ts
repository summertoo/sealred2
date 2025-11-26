export interface Room {
  id: string;
  name: string;
  creator: string;
  betAmount: number;
  maxPlayers: number;
  currentPlayers: number;
  status: 'waiting' | 'playing' | 'finished';
  players: Player[];
  gameResult?: GameResult;
  createdAt: number;
  updatedAt: number;
}

export interface Player {
  address: string;
  name?: string;
  avatar?: string;
  encryptedChoice?: string;
  revealedChoice?: 'A' | 'B';
  isWinner?: boolean;
  joinTime: number;
  hasEncrypted: boolean;
  hasRevealed: boolean;
}

export interface GameResult {
  totalA: number;
  totalB: number;
  winnerChoice: 'A' | 'B';
  winners: string[];
  prizePerWinner: number;
  revealedAt: number;
}

export interface CreateRoomRequest {
  name: string;
  betAmount: number;
  maxPlayers: number;
}

export interface JoinRoomRequest {
  roomId: string;
}

export interface EncryptChoiceRequest {
  roomId: string;
  choice: 'A' | 'B';
}

export interface RevealChoiceRequest {
  roomId: string;
  choice: 'A' | 'B';
  nonce: string;
}

export interface RoomStats {
  totalRooms: number;
  activeRooms: number;
  totalPlayers: number;
  totalPrizePool: number;
}

// 房间状态枚举
export enum RoomStatus {
  WAITING = 'waiting',
  PLAYING = 'playing',
  FINISHED = 'finished'
}

// 游戏选择枚举
export enum GameChoice {
  A = 'A',
  B = 'B'
}

// 默认房间配置
export const DEFAULT_ROOM_CONFIG = {
  MIN_PLAYERS: 2,
  MAX_PLAYERS: 9,
  MIN_BET_AMOUNT: 0.1,
  MAX_BET_AMOUNT: 100,
  DEFAULT_BET_AMOUNTS: [0.1, 0.5, 1, 5, 10, 50, 100]
};

// 房间状态颜色映射
export const ROOM_STATUS_COLORS = {
  [RoomStatus.WAITING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  [RoomStatus.PLAYING]: 'bg-blue-100 text-blue-800 border-blue-200',
  [RoomStatus.FINISHED]: 'bg-green-100 text-green-800 border-green-200'
};

// 房间状态图标映射
export const ROOM_STATUS_ICONS = {
  [RoomStatus.WAITING]: '⏳',
  [RoomStatus.PLAYING]: '🎮',
  [RoomStatus.FINISHED]: '✅'
};
