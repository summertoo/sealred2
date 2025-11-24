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
    online: "在线"
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
    online: "Online"
  },
  home: {
    title: "🎮 Seal Red Packet Game",
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
