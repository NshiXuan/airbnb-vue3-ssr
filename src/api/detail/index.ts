import { http } from '@/utils/http';
import { IResultOr as IResult, IRoomDetailParams } from '../interface';

// 房屋详情
export function fetchRoomDetail(params: IRoomDetailParams): Promise<IResult> {
  return http.get('/api/room/room/getRoomDetail', params)
}
