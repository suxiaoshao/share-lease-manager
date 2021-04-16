import { GoodDetail } from '../goods/getGoodDetail';
import { httpGet } from '../main';
import { OrderRuleType } from './getManagerOrders';

export interface AllProp<T> {
  /**
   * 总数
   * */
  total: number;
  /**
   * 商品列表
   * */
  list: T[];
}

/**
 * 获取全部商品
 * @param pageSize 页面大小
 * @param pageNum 页数
 * @param orderRule 排序规则
 * */
export async function getAllGoods(
  pageNum: number,
  pageSize: number,
  orderRule: OrderRuleType,
): Promise<AllProp<GoodDetail>> {
  return await httpGet(
    `/manage/AllGoods?orderBy=gid&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${orderRule}`,
    undefined,
  );
}
