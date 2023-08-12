import { WsWrapper } from 'types/WsWrapper';

export const ws = new WsWrapper(
  process.env.DEV ? 'ws://localhost:3000/device' : 'ws:///device'
);
