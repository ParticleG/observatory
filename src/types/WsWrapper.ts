import { Notify } from 'quasar';
import { ActionBase, WsAction } from 'types/actions';
import {
  WsErrorResponse,
  WsFailureResponse,
  WsResponse,
} from 'types/responses';

export type WsHandler<T extends WsResponse> = (
  message: T | WsFailureResponse | WsErrorResponse
) => void;

export class WsWrapper {
  private _onMessageHandlers: Map<WsAction, WsHandler<never>> = new Map();
  private _onOpenHandlers: (() => void)[] = [
    () =>
      Notify.create({
        type: 'positive',
        message: 'WebSocket connected',
        icon: 'check',
      }),
  ];
  private _ws: WebSocket;

  constructor(url: string) {
    this._ws = new WebSocket(url);
    this._initWs(url);
  }

  private _initWs(url: string) {
    this._ws.onopen = () => {
      console.log('WebSocket connected');
      this._onOpenHandlers.forEach((handler) => handler());
    };
    this._ws.onclose = () => {
      Notify.create({
        type: 'negative',
        message: 'WebSocket closed, reconnecting...',
        icon: 'close',
      });
      setTimeout(() => {
        this._ws = new WebSocket('url');
        this._initWs(url);
      }, 3000);
    };
    this._ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (this._onMessageHandlers.has(message.action)) {
        this._onMessageHandlers.get(message.action)?.call(this, message);
      }
    };
  }

  addOnOpenHandler(handler: () => void) {
    this._onOpenHandlers.push(handler);
  }

  isOpen() {
    return this._ws.readyState === WebSocket.OPEN;
  }

  setHandler<T extends WsResponse>(action: WsAction, handler: WsHandler<T>) {
    this._onMessageHandlers.set(action, handler);
  }

  // noinspection JSUnusedGlobalSymbols
  deleteHandler(action: WsAction) {
    this._onMessageHandlers.delete(action);
  }

  send(object: ActionBase) {
    this.sendRaw(JSON.stringify(object));
  }

  private sendRaw(message: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (this.isOpen()) {
      this._ws?.send(message);
    } else {
      console.log('WebSocket not connected');
    }
  }
}
