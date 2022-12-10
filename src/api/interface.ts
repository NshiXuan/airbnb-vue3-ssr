export interface IResultOr { // 定义interface规范返回结果的类型
  code: string;
  success: boolean;
  message: string;
  result: any;
}
