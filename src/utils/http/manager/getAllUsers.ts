import { OrderRuleType } from './getManagerOrders';
import { httpGet } from '../main';
import { UserInfo } from '../user/getInfo';
import { AllProp } from './getAllGoods';

/**
 * 获取所有用户
 * */
export async function getAllUsers(
  pageNum: number,
  pageSize: number,
  orderRule: OrderRuleType,
): Promise<AllProp<UserInfo>> {
  return await httpGet(
    `/manage/AllUsers?orderBy=uid&pageSize=${pageSize}&pageNum=${pageNum}&orderRule=${orderRule}`,
    undefined,
  );
}
