import { DanmakuInfo } from 'types/bililive/danmaku';

export interface IGenericMessage {
  cmd: string;
  is_report: boolean;
  msg_id: string;
  send_time: number;
}

export interface IDanmakuMessage extends IGenericMessage {
  dm_v2: string;
  info: DanmakuInfo;
}

export class DanmakuMessage {
  time: Date;

  constructor(rawMessage: IDanmakuMessage) {
    this.time = new Date(rawMessage.send_time * 1000);
    const [
      config,
      content,
      user,
      medal,
      rank,
      teamId,
      level,
      info7,
      info8,
      other,
    ] = rawMessage.info;
    const [
      config0,
      mode,
      fontSize,
      color,
      sendTime,
      rnd,
      config6,
      uidCrc32,
      config8,
      config9,
      config10,
    ] = config;
  }
}
