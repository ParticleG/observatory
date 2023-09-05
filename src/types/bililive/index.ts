import { DanmakuInfo } from 'types/bililive/danmaku';

export interface IGenericMessage {
  cmd: string;
  is_report?: boolean;
  msg_id?: string;
  send_time?: number;
}

export interface IDanmakuMessage extends IGenericMessage {
  dm_v2: string;
  info: DanmakuInfo;
}

export class DanmakuMessage {
  time: Date;

  constructor(rawMessage: IDanmakuMessage) {
    console.log(rawMessage);
    const [config, content, user, medal, rank, teamId, level] = rawMessage.info;
    const [, mode, fontSize, color, sendTime, rnd, , uidCrc32] = config;
    this.time = new Date(sendTime);
  }
}
