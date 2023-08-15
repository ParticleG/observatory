export interface DanmakuInfo
  extends Array<
    | number
    | string
    | null
    | DanmakuInfoConfig
    | DanmakuInfoUser
    | DanmakuInfoMedal
    | DanmakuInfoRank
    | DanmakuInfoOther
  > {
  /** 弹幕信息 */
  0: DanmakuInfoConfig;
  /** 弹幕内容 */
  1: string;
  /** 用户信息 */
  2: DanmakuInfoUser;
  /** 用户徽章 */
  3: DanmakuInfoMedal;
  /** 用户排行 */
  4: DanmakuInfoRank;
  /** teamId */
  5: number;
  /** 舰队等级 */
  6: number;
  7: number;
  8: null;
  9: DanmakuInfoOther;
}

export interface DanmakuInfoConfig extends Array<number | string> {
  0: number;
  /** 模式 */
  1: number;
  /** 字号 */
  2: number;
  /** 颜色 */
  3: number;
  /** 发送时间 */
  4: number;
  /** rnd */
  5: number | string;
  6: number;
  /** uid crc32 */
  7: string;
  8: number;
  9: number;
  10: number;
}

export interface DanmakuInfoUser extends Array<number | string> {
  /** 用户uid */
  0: number;
  /** 用户名 */
  1: string;
  /** 是否为管理员 */
  2: 0 | 1;
  /** 是否为月费老爷 */
  3: 0 | 1;
  /** 是否为年费老爷 */
  4: 0 | 1;
  /** 直播间内排行 */
  5: number;
  6: number;
  /** 用户名颜色, #32进制颜色代码 */
  7: string;
}

export interface DanmakuInfoMedal extends Array<number | string> {
  /** 徽章等级 */
  0: number;
  /** 勋章名 */
  1: string;
  /** 主播名 */
  2: string;
  /** 直播间, 字符串的貌似是原始房间号 */
  3: number | string;
  4: number;
  /** 特殊样式 */
  5: 'union' | string;
}

export interface DanmakuInfoRank extends Array<number | string> {
  /** 用户等级 */
  0: number;
  1: number;
  2: number;
  /** 等级排名, 具体值为number */
  3: number | string;
}

export interface DanmakuInfoOther {
  ts: number;
  ct: string;
}
