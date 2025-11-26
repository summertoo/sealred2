import { Room, Player, GameResult, CreateRoomRequest, JoinRoomRequest, EncryptChoiceRequest, RevealChoiceRequest, RoomStats, RoomStatus, GameChoice, DEFAULT_ROOM_CONFIG } from '../types/room';

// 模拟的房间数据存储（实际项目中应该使用后端API或区块链）
let mockRooms: Room[] = [];
let mockRoomIdCounter = 1;

// 生成随机房间ID
const generateRoomId = (): string => {
  return `room-${mockRoomIdCounter++}-${Date.now()}`;
};

// 生成随机玩家头像
const generateRandomAvatar = (): string => {
  const avatars = ['👤', '👨', '👩', '🧑', '👦', '👧', '👴', '👵', '👨‍🦱', '👩‍🦰', '👱‍♂️', '👱‍♀️'];
  return avatars[Math.floor(Math.random() * avatars.length)];
};

// 获取房间列表
export const getRooms = async (): Promise<Room[]> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 如果没有房间，创建一些示例房间
  if (mockRooms.length === 0) {
    await createSampleRooms();
  }
  
  return mockRooms.sort((a, b) => b.updatedAt - a.updatedAt);
};

// 创建示例房间
const createSampleRooms = async () => {
  const sampleRooms: CreateRoomRequest[] = [
    { name: '新手体验房', betAmount: 0.1, maxPlayers: 9 },
    { name: '标准游戏房', betAmount: 1.0, maxPlayers: 9 },
    { name: '高端对战房', betAmount: 10.0, maxPlayers: 9 }
  ];

  for (const roomData of sampleRooms) {
    const room = await createRoom(roomData, '0xcreator' + Math.random().toString(36).substr(2, 9));
    // 添加一些模拟玩家
    await addSamplePlayers(room.id);
  }
};

// 添加模拟玩家
const addSamplePlayers = async (roomId: string) => {
  const room = mockRooms.find(r => r.id === roomId);
  if (!room) return;

  const samplePlayers = [
    { address: '0xplayer1', name: 'Alice', avatar: '👩' },
    { address: '0xplayer2', name: 'Bob', avatar: '👨' },
    { address: '0xplayer3', name: 'Charlie', avatar: '🧑' }
  ];

  for (const playerData of samplePlayers.slice(0, Math.floor(Math.random() * 4) + 1)) {
    const player: Player = {
      address: playerData.address,
      name: playerData.name,
      avatar: playerData.avatar,
      joinTime: Date.now() - Math.random() * 3600000,
      hasEncrypted: Math.random() > 0.5,
      hasRevealed: false
    };
    
    room.players.push(player);
    room.currentPlayers = room.players.length;
    room.updatedAt = Date.now();
  }
};

// 创建房间
export const createRoom = async (request: CreateRoomRequest, creatorAddress: string): Promise<Room> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  const room: Room = {
    id: generateRoomId(),
    name: request.name,
    creator: creatorAddress,
    betAmount: request.betAmount,
    maxPlayers: request.maxPlayers,
    currentPlayers: 1,
    status: RoomStatus.WAITING,
    players: [{
      address: creatorAddress,
      name: 'Creator',
      avatar: generateRandomAvatar(),
      joinTime: Date.now(),
      hasEncrypted: false,
      hasRevealed: false
    }],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  mockRooms.push(room);
  return room;
};

// 加入房间
export const joinRoom = async (request: JoinRoomRequest, playerAddress: string): Promise<Room> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  const room = mockRooms.find(r => r.id === request.roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  if (room.status !== RoomStatus.WAITING) {
    throw new Error('Room is not accepting new players');
  }

  if (room.currentPlayers >= room.maxPlayers) {
    throw new Error('Room is full');
  }

  // 检查玩家是否已经在房间中
  if (room.players.find(p => p.address === playerAddress)) {
    throw new Error('Player already in room');
  }

  const player: Player = {
    address: playerAddress,
    name: `Player${room.currentPlayers + 1}`,
    avatar: generateRandomAvatar(),
    joinTime: Date.now(),
    hasEncrypted: false,
    hasRevealed: false
  };

  room.players.push(player);
  room.currentPlayers = room.players.length;
  room.updatedAt = Date.now();

  // 如果房间满了，开始游戏
  if (room.currentPlayers >= room.maxPlayers) {
    room.status = RoomStatus.PLAYING;
  }

  return room;
};

// 加密选择
export const encryptChoice = async (request: EncryptChoiceRequest, playerAddress: string): Promise<Room> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 200));

  const room = mockRooms.find(r => r.id === request.roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  const player = room.players.find(p => p.address === playerAddress);
  if (!player) {
    throw new Error('Player not in room');
  }

  if (player.hasEncrypted) {
    throw new Error('Choice already encrypted');
  }

  // 模拟加密过程
  player.encryptedChoice = `encrypted_${request.choice}_${Date.now()}_${Math.random().toString(36)}`;
  player.hasEncrypted = true;
  room.updatedAt = Date.now();

  // 检查是否所有玩家都已加密
  if (room.players.every(p => p.hasEncrypted)) {
    // 自动揭晓选择（模拟）
    await autoRevealChoices(room);
  }

  return room;
};

// 自动揭晓选择
const autoRevealChoices = async (room: Room) => {
  // 模拟随机选择
  const choices: ('A' | 'B')[] = [];
  room.players.forEach(player => {
    const choice = Math.random() > 0.5 ? GameChoice.A : GameChoice.B;
    player.revealedChoice = choice;
    player.hasRevealed = true;
    choices.push(choice);
  });

  // 计算结果
  const totalA = choices.filter(c => c === GameChoice.A).length;
  const totalB = choices.filter(c => c === GameChoice.B).length;
  const winnerChoice = totalA < totalB ? GameChoice.A : GameChoice.B;
  const winners = room.players.filter(p => p.revealedChoice === winnerChoice);
  const prizePerWinner = (room.currentPlayers * room.betAmount) / winners.length;

  // 标记获胜者
  winners.forEach(winner => {
    winner.isWinner = true;
  });

  room.gameResult = {
    totalA,
    totalB,
    winnerChoice,
    winners: winners.map(w => w.address),
    prizePerWinner,
    revealedAt: Date.now()
  };

  room.status = RoomStatus.FINISHED;
  room.updatedAt = Date.now();
};

// 揭晓选择
export const revealChoice = async (request: RevealChoiceRequest, playerAddress: string): Promise<Room> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 200));

  const room = mockRooms.find(r => r.id === request.roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  const player = room.players.find(p => p.address === playerAddress);
  if (!player) {
    throw new Error('Player not in room');
  }

  if (!player.hasEncrypted) {
    throw new Error('Choice not encrypted yet');
  }

  if (player.hasRevealed) {
    throw new Error('Choice already revealed');
  }

  player.revealedChoice = request.choice;
  player.hasRevealed = true;
  room.updatedAt = Date.now();

  // 检查是否所有玩家都已揭晓
  if (room.players.every(p => p.hasRevealed)) {
    await calculateGameResult(room);
  }

  return room;
};

// 计算游戏结果
const calculateGameResult = async (room: Room) => {
  const choices = room.players.map(p => p.revealedChoice).filter(Boolean) as ('A' | 'B')[];
  const totalA = choices.filter(c => c === GameChoice.A).length;
  const totalB = choices.filter(c => c === GameChoice.B).length;
  
  // 如果平局，随机选择一个获胜方
  let winnerChoice: 'A' | 'B';
  if (totalA === totalB) {
    winnerChoice = Math.random() > 0.5 ? GameChoice.A : GameChoice.B;
  } else {
    winnerChoice = totalA < totalB ? GameChoice.A : GameChoice.B;
  }

  const winners = room.players.filter(p => p.revealedChoice === winnerChoice);
  const prizePerWinner = (room.currentPlayers * room.betAmount) / winners.length;

  // 标记获胜者
  winners.forEach(winner => {
    winner.isWinner = true;
  });

  room.gameResult = {
    totalA,
    totalB,
    winnerChoice,
    winners: winners.map(w => w.address),
    prizePerWinner,
    revealedAt: Date.now()
  };

  room.status = RoomStatus.FINISHED;
  room.updatedAt = Date.now();
};

// 获取房间详情
export const getRoomDetails = async (roomId: string): Promise<Room> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 200));

  const room = mockRooms.find(r => r.id === roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  return room;
};

// 获取房间统计
export const getRoomStats = async (): Promise<RoomStats> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  const totalRooms = mockRooms.length;
  const activeRooms = mockRooms.filter(r => r.status === RoomStatus.WAITING || r.status === RoomStatus.PLAYING).length;
  const totalPlayers = mockRooms.reduce((sum, room) => sum + room.currentPlayers, 0);
  const totalPrizePool = mockRooms
    .filter(room => room.status === RoomStatus.WAITING || room.status === RoomStatus.PLAYING)
    .reduce((sum, room) => sum + (room.currentPlayers * room.betAmount), 0);

  return {
    totalRooms,
    activeRooms,
    totalPlayers,
    totalPrizePool
  };
};

// 离开房间
export const leaveRoom = async (roomId: string, playerAddress: string): Promise<void> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 200));

  const room = mockRooms.find(r => r.id === roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  const playerIndex = room.players.findIndex(p => p.address === playerAddress);
  if (playerIndex === -1) {
    throw new Error('Player not in room');
  }

  // 如果是创建者且房间还没开始，删除房间
  if (room.creator === playerAddress && room.status === RoomStatus.WAITING) {
    const roomIndex = mockRooms.findIndex(r => r.id === roomId);
    mockRooms.splice(roomIndex, 1);
    return;
  }

  // 移除玩家
  room.players.splice(playerIndex, 1);
  room.currentPlayers = room.players.length;
  room.updatedAt = Date.now();

  // 如果房间空了，删除房间
  if (room.players.length === 0) {
    const roomIndex = mockRooms.findIndex(r => r.id === roomId);
    mockRooms.splice(roomIndex, 1);
  }
};

// 刷新房间状态
export const refreshRoomStatus = async (roomId: string): Promise<Room> => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 100));

  const room = mockRooms.find(r => r.id === roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  return room;
};
