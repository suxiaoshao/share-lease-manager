import { OrderRuleType } from './getManagerOrders';
import { httpGet } from '../main';
import { MerchantInfo } from '../shop/getMerchantMyself';
import { AllProp } from './getAllGoods';

export async function getAllShops(
  pageNum: number,
  pageSize: number,
  orderRule: OrderRuleType,
): Promise<AllProp<MerchantInfo>> {
  return await httpGet(
    `/manage/AllMerchants?orderBy=mid&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${orderRule}`,
    undefined,
  );
}
