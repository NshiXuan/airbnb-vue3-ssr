import { http } from '@/utils/http';
import { IResultOr as IResult, IRoomListParams } from '../interface';

// 真实接口：获取房源列表
export function fetchRoomList(params: IRoomListParams): Promise<IResult> {
  // return http.get('/api/room/room/getRoomList?pageNo=1&pageSize=3', {})
  return http.get('/api/room/room/getRoomList', params)
}