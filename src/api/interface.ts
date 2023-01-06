import { AxiosRequestConfig } from "axios";

export interface IResultOr { // 定义interface规范返回结果的类型
  code: string;
  success: boolean;
  message: string;
  result: any;
}

// 定义房屋列表请求参数类型
export interface IRoomListParams extends AxiosRequestConfig {
  pageNo: number,
  pageSize: number,
  cityCode: string,
}

// 房屋详情请求参数类型
export interface IRoomDetailParams extends AxiosRequestConfig {
  id: number,
}