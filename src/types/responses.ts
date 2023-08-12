import { WsAction } from 'types/actions';
import { DeviceEvent } from 'types/devices';

type WsResult = 'success' | 'failure' | 'error';

export interface WsResponse {
  result: WsResult;
  action: WsAction;
  data: unknown;
}

export interface WsSuccessResponse extends WsResponse {
  result: 'success';
}

export interface WsFailureResponse extends WsResponse {
  result: 'failure';
  data: {
    message: string;
    reasons: string[];
  };
}

export interface WsErrorResponse extends WsResponse {
  result: 'error';
  data: {
    message: string;
    reasons: string[];
  };
}

export interface ResponseDevice extends WsSuccessResponse {
  action: WsAction.Device;
  data: DeviceEvent;
}
