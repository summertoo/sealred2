export interface Translation {
  common: {
    play: string;
    wallet: string;
    back: string;
    connect: string;
    connected: string;
    testnet: string;
    mainnet: string;
    online: string;
    create: string;
    join: string;
    leave: string;
    start: string;
    waiting: string;
    full: string;
    playing: string;
    finished: string;
    refresh: string;
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
  };
  home: {
    title: string;
    subtitle: string;
    heroTitle: string;
    heroSubtitle: string;
    playNow: string;
    wallet: string;
    limitedEvent: string;
    stats: {
      onlinePlayers: string;
      prizePool: string;
      winRate: string;
      todayGames: string;
    };
    features: {
      fair: {
        title: string;
        description: string;
        highlight: string;
      };
      minority: {
        title: string;
        description: string;
        highlight: string;
      };
      instant: {
        title: string;
        description: string;
        highlight: string;
      };
    };
    guide: {
      title: string;
      subtitle: string;
      steps: {
        join: {
          title: string;
          description: string;
        };
        choose: {
          title: string;
          description: string;
        };
        wait: {
          title: string;
          description: string;
        };
        win: {
          title: string;
          description: string;
        };
      };
    };
    footer: {
      copyright: string;
      tagline: string;
    };
  };
  wallet: {
    title: string;
    subtitle: string;
    address: string;
    status: string;
    network: string;
    connected: string;
    disconnected: string;
    connectWallet: string;
    connectMessage: string;
    features: {
      title: string;
      create: {
        title: string;
        description: string;
      };
      join: {
        title: string;
        description: string;
      };
      history: {
        title: string;
        description: string;
      };
      stats: {
        title: string;
        description: string;
      };
    };
  };
  room: {
    title: string;
    subtitle: string;
    createRoom: string;
    joinRoom: string;
    roomList: string;
    roomDetails: string;
    players: string;
    betAmount: string;
    prizePool: string;
    status: string;
    waiting: string;
    full: string;
    playing: string;
    finished: string;
    playerList: string;
    gameResult: string;
    totalA: string;
    totalB: string;
    winnerChoice: string;
    winners: string;
    prizePerWinner: string;
    selectChoice: string;
    choiceA: string;
    choiceB: string;
    encryptChoice: string;
    revealChoice: string;
    waitingPlayers: string;
    gameInProgress: string;
    congratulations: string;
    minorityWins: string;
    createNewRoom: string;
    roomName: string;
    maxPlayers: string;
    enterRoomName: string;
    selectBetAmount: string;
    creatingRoom: string;
    joiningRoom: string;
    errorJoinRoom: string;
    errorCreateRoom: string;
    roomCreated: string;
    roomJoined: string;
    leftRoom: string;
    refreshRooms: string;
    noRoomsAvailable: string;
    createFirstRoom: string;
    backToHome: string;
  };
}

export const zhCN: Translation = {
  common: {
    play: "立即开玩",
    wallet: "钱包",
    back: "返回游戏",
    connect: "连接",
    connected: "已连接",
    testnet: "测试网",
    mainnet: "主网",
    online: "在线",
    create: "创建",
    join: "加入",
    leave: "离开",
    start: "开始",
    waiting: "等待中",
    full: "已满",
    playing: "游戏中",
    finished: "已结束",
    refresh: "刷新",
    loading: "加载中",
    error: "错误",
    success: "成功",
    cancel: "取消",
    confirm: "确认"
  },
  home: {
    title: "🎮 Seal 红包接龙",
    subtitle: "公平游戏 • 赢取大奖",
    heroTitle: "🎯 瞄准\n少数胜利",
    heroSubtitle: "🎰 9人房间 • 🎲 心理博弈 • 💰 公平开奖 • 🏆 赢取SUI",
    playNow: "🎮 立即开玩",
    wallet: "💰 钱包",
    limitedEvent: "🔥 限时活动进行中 • 奖金翻倍",
    stats: {
      onlinePlayers: "在线玩家",
      prizePool: "奖池",
      winRate: "胜率",
      todayGames: "今日游戏"
    },
    features: {
      fair: {
        title: "🔒 绝对公平",
        description: "Seal加密技术保证无人作弊",
        highlight: "100%透明"
      },
      minority: {
        title: "👥 少数获胜",
        description: "选择少数方分享奖金池",
        highlight: "策略游戏"
      },
      instant: {
        title: "🎁 即时开奖",
        description: "区块链验证公平开奖",
        highlight: "秒到账"
      }
    },
    guide: {
      title: "🎮 游戏攻略",
      subtitle: "四步成为赢家",
      steps: {
        join: {
          title: "加入房间",
          description: "选择房间押注"
        },
        choose: {
          title: "秘密选择",
          description: "加密你的选择"
        },
        wait: {
          title: "等待开奖",
          description: "等待其他玩家"
        },
        win: {
          title: "赢得奖金",
          description: "少数方获胜"
        }
      }
    },
    footer: {
      copyright: "© 2025 Seal 红包接龙",
      tagline: "🎮 公平游戏 • 💰 透明开奖 • 🏆 赢取SUI"
    }
  },
  wallet: {
    title: "💰 钱包中心",
    subtitle: "管理你的游戏资产",
    address: "🏠 钱包地址",
    status: "✅ 连接状态",
    network: "🌐 网络",
    connected: "已连接",
    disconnected: "未连接",
    connectWallet: "🔗 连接钱包",
    connectMessage: "连接钱包开始游戏赢取SUI",
    features: {
      title: "🎮 游戏功能",
      create: {
        title: "🎁 创建红包",
        description: "创建新的游戏房间"
      },
      join: {
        title: "🎯 加入游戏",
        description: "参与其他玩家的游戏"
      },
      history: {
        title: "📊 我的记录",
        description: "查看游戏历史记录"
      },
      stats: {
        title: "💎 奖金统计",
        description: "查看收益统计"
      }
    }
  },
  room: {
    title: "🎮 游戏房间",
    subtitle: "加入或创建房间开始游戏",
    createRoom: "创建房间",
    joinRoom: "加入房间",
    roomList: "房间列表",
    roomDetails: "房间详情",
    players: "玩家",
    betAmount: "押注金额",
    prizePool: "奖金池",
    status: "状态",
    waiting: "等待中",
    full: "已满",
    playing: "游戏中",
    finished: "已结束",
    playerList: "玩家列表",
    gameResult: "游戏结果",
    totalA: "选择A的人数",
    totalB: "选择B的人数",
    winnerChoice: "获胜选项",
    winners: "获胜者",
    prizePerWinner: "每人获得",
    selectChoice: "选择你的选项",
    choiceA: "选项 A",
    choiceB: "选项 B",
    encryptChoice: "加密选择",
    revealChoice: "揭晓选择",
    waitingPlayers: "等待其他玩家加入...",
    gameInProgress: "游戏进行中...",
    congratulations: "🎉 恭喜获胜者！",
    minorityWins: "少数方 {choice} 赢得了游戏！",
    createNewRoom: "创建新房间",
    roomName: "房间名称",
    maxPlayers: "最大玩家数",
    enterRoomName: "请输入房间名称",
    selectBetAmount: "选择押注金额",
    creatingRoom: "正在创建房间...",
    joiningRoom: "正在加入房间...",
    errorJoinRoom: "加入房间失败",
    errorCreateRoom: "创建房间失败",
    roomCreated: "房间创建成功",
    roomJoined: "成功加入房间",
    leftRoom: "已离开房间",
    refreshRooms: "刷新房间列表",
    noRoomsAvailable: "暂无可用房间",
    createFirstRoom: "创建第一个房间开始游戏",
    backToHome: "返回主界面"
  }
};

export const enUS: Translation = {
  common: {
    play: "Play Now",
    wallet: "Wallet",
    back: "Back to Game",
    connect: "Connect",
    connected: "Connected",
    testnet: "Testnet",
    mainnet: "Mainnet",
    online: "Online",
    create: "Create",
    join: "Join",
    leave: "Leave",
    start: "Start",
    waiting: "Waiting",
    full: "Full",
    playing: "Playing",
    finished: "Finished",
    refresh: "Refresh",
    loading: "Loading",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    confirm: "Confirm"
  },
  home: {
    title: "🎮 Seal Red Packet Game v 1.0.0",
    subtitle: "Fair Game • Win Big Prizes",
    heroTitle: "🎯 Aim for\nMinority Victory",
    heroSubtitle: "🎰 9 Players • 🎲 Strategy • 💰 Fair Draw • 🏆 Win SUI",
    playNow: "🎮 Play Now",
    wallet: "💰 Wallet",
    limitedEvent: "🔥 Limited Event • Double Rewards",
    stats: {
      onlinePlayers: "Online Players",
      prizePool: "Prize Pool",
      winRate: "Win Rate",
      todayGames: "Today's Games"
    },
    features: {
      fair: {
        title: "🔒 Absolutely Fair",
        description: "Seal encryption ensures no cheating",
        highlight: "100% Transparent"
      },
      minority: {
        title: "👥 Minority Wins",
        description: "Choose minority side to share prize pool",
        highlight: "Strategy Game"
      },
      instant: {
        title: "🎁 Instant Draw",
        description: "Blockchain verified fair drawing",
        highlight: "Instant Payout"
      }
    },
    guide: {
      title: "🎮 Game Guide",
      subtitle: "Four Steps to Win",
      steps: {
        join: {
          title: "Join Room",
          description: "Select room and bet"
        },
        choose: {
          title: "Secret Choice",
          description: "Encrypt your choice"
        },
        wait: {
          title: "Wait for Draw",
          description: "Wait for other players"
        },
        win: {
          title: "Win Prize",
          description: "Minority side wins"
        }
      }
    },
    footer: {
      copyright: "© 2025 Seal Red Packet Game",
      tagline: "🎮 Fair Game • 💰 Transparent Draw • 🏆 Win SUI"
    }
  },
  wallet: {
    title: "💰 Wallet Center",
    subtitle: "Manage Your Game Assets",
    address: "🏠 Wallet Address",
    status: "✅ Connection Status",
    network: "🌐 Network",
    connected: "Connected",
    disconnected: "Disconnected",
    connectWallet: "🔗 Connect Wallet",
    connectMessage: "Connect wallet to start playing and win SUI",
    features: {
      title: "🎮 Game Features",
      create: {
        title: "🎁 Create Red Packet",
        description: "Create new game room"
      },
      join: {
        title: "🎯 Join Game",
        description: "Join other players' games"
      },
      history: {
        title: "📊 My Records",
        description: "View game history"
      },
      stats: {
        title: "💎 Prize Statistics",
        description: "View earnings statistics"
      }
    }
  },
  room: {
    title: "🎮 Game Rooms",
    subtitle: "Join or create rooms to start playing",
    createRoom: "Create Room",
    joinRoom: "Join Room",
    roomList: "Room List",
    roomDetails: "Room Details",
    players: "Players",
    betAmount: "Bet Amount",
    prizePool: "Prize Pool",
    status: "Status",
    waiting: "Waiting",
    full: "Full",
    playing: "Playing",
    finished: "Finished",
    playerList: "Player List",
    gameResult: "Game Result",
    totalA: "Total A Choices",
    totalB: "Total B Choices",
    winnerChoice: "Winner Choice",
    winners: "Winners",
    prizePerWinner: "Prize Per Winner",
    selectChoice: "Select Your Choice",
    choiceA: "Choice A",
    choiceB: "Choice B",
    encryptChoice: "Encrypt Choice",
    revealChoice: "Reveal Choice",
    waitingPlayers: "Waiting for other players to join...",
    gameInProgress: "Game in progress...",
    congratulations: "🎉 Congratulations to the winners!",
    minorityWins: "Minority side {choice} won the game!",
    createNewRoom: "Create New Room",
    roomName: "Room Name",
    maxPlayers: "Max Players",
    enterRoomName: "Please enter room name",
    selectBetAmount: "Select bet amount",
    creatingRoom: "Creating room...",
    joiningRoom: "Joining room...",
    errorJoinRoom: "Failed to join room",
    errorCreateRoom: "Failed to create room",
    roomCreated: "Room created successfully",
    roomJoined: "Successfully joined room",
    leftRoom: "Left room",
    refreshRooms: "Refresh room list",
    noRoomsAvailable: "No rooms available",
    createFirstRoom: "Create the first room to start playing",
    backToHome: "Back to Home"
  }
};

export type Language = 'zhCN' | 'enUS';

// 创建严格的翻译键类型
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKey = NestedKeyOf<Translation>;

export const translations = {
  zhCN,
  enUS
} as const;
