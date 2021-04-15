import { GoodDetail } from '../goods/getGoodDetail';
import { httpGet } from '../main';
import { OrderRuleType } from './getManagerOrders';

export interface AllGoodsProp {
  /**
   * 总数
   * */
  total: number;
  /**
   * 商品列表
   * */
  list: GoodDetail[];
}

/**
 * 获取全部商品
 * @param pageSize 页面大小
 * @param pageNum 页数
 * @param orderRule 排序规则
 * */
export async function getAllGoods(pageNum: number, pageSize: number, orderRule: OrderRuleType): Promise<AllGoodsProp> {
  return await httpGet(
    `/manage/AllGoods?orderBy=gid&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${orderRule}`,
    undefined,
  );
}
