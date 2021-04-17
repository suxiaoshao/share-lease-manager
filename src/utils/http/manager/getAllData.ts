import { httpGet } from '../main';
import { StatisticsData, StatisticsType } from '../shop/getStatistics';

/**
 * 获取图表数据
 * */
export async function getAllData(time: number, type: StatisticsType): Promise<StatisticsData[]> {
  return await httpGet(`/merchant/statistics?time=${time}&type=${type}`, undefined);
}
