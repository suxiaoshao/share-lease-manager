import { httpGet } from '../main';
import { OrderSearchResult, StatusType } from '../order/shopOrders';

export type OrderRuleType = 'ASC' | 'DESC';

/**
 * 获取订单]
 * @param pageSize 页面大小
 * @param status 状态
 * @param pageNum 页数
 * @param orderRule 排序规则
 * */
export async function getManagerOrders(
  pageNum: number,
  status: StatusType | null,
  pageSize: number,
  orderRule: OrderRuleType,
): Promise<OrderSearchResult> {
  const url =
    status !== null
      ? `/manage/AllOrders?orderBy=oid&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${orderRule}&status=${status}`
      : `/manage/AllOrders?orderBy=oid&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${orderRule}`;
  return await httpGet<undefined, OrderSearchResult>(url, undefined);
}
