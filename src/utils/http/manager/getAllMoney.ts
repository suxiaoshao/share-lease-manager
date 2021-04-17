import { httpGet } from '../main';

export interface AllMoneyProp {
  /**
   * 总金额
   * */
  TotalBuyMoney: number;
  /**
   * 总押金
   * */
  TotalPledgeMoney: number;
}

export async function getAllMoney(): Promise<AllMoneyProp> {
  return await httpGet('/manage/TotalMoney', undefined);
}
