import { httpGet } from '../main';
import { OrderSearchResult, StatusType } from '../order/shopOrders';

/**
 * 获取订单]
 * @param pageSize 页面大小
 * @param status 状态
 * @param pageNum 页数
 * */
export async function getManagerOrders(
  pageNum: number,
  status: StatusType | null,
  pageSize: number,
): Promise<OrderSearchResult> {
  const url =
    status !== null
      ? `/manage/AllOrders?orderBy=oid&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=ASC&status=${status}`
      : `/manage/AllOrders?orderBy=oid&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=ASC`;
  return await httpGet<undefined, OrderSearchResult>(url, undefined);
}
