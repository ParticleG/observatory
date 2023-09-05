export interface DanmakuInfo
  extends Array<
    | Array<number>
    | number
    | string
    | null
    | DanmakuInfoConfig
    | DanmakuInfoUser
    | DanmakuInfoMedal
    | DanmakuInfoRank
    | DanmakuInfoOther
  > {
  0: DanmakuInfoConfig;
  1: string; // Content
  2: DanmakuInfoUser;
  3: DanmakuInfoMedal;
  4: DanmakuInfoRank;
  5: number; // TeamId
  6: number; // Crew Level
  7: number;
  8: null;
  9: DanmakuInfoOther;
  10: number;
  11: number;
  12: null;
  13: null;
  14: number;
  15: number;
  16: Array<number>;
}

export interface DanmakuInfoConfig extends Array<number | string> {
  0: number;
  1: number; // Mode
  2: number; // Font Size
  3: number; // Color
  4: number; // Send Time
  5: number | string; // rnd
  6: number;
  7: string; // uid crc32
  8: number;
  9: number;
  10: number;
  11: string;
  12: number;
  13: string;
  14: string;
}

export interface DanmakuInfoUser extends Array<number | string> {
  0: number; // uid
  1: string; // username
  2: 0 | 1; // admin
  3: 0 | 1; // monthly vip
  4: 0 | 1; // yearly vip
  5: number; // rank
  6: number;
  7: string; // username color
}

export interface DanmakuInfoMedal extends Array<number | string> {
  0: number; // Medal level
  1: string; // Medal name
  2: string; // Broadcaster name
  3: number | string; // Broadcast RoomId
  4: number; // Medal color
  5: 'union' | string; // Medal type
  6: number;
  7: number; // Color?
  8: number; // Color?
  9: number; // Color?
  10: number;
  11: number;
  12: number; // Broadcaster uid
}

export interface DanmakuInfoRank extends Array<number | string> {
  0: number; // User level
  1: number;
  2: number;
  3: number | string; // Rank
}

export interface DanmakuInfoOther {
  ts: number;
  ct: string;
}
