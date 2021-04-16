import { useQuery } from './useQuery';
import { OrderRuleType } from '../http/manager/getManagerOrders';
import { useHistory } from 'react-router';
import { useAsyncFnWithNotify } from './useAsyncFnWithNotify';
import React from 'react';
import { LoadingState } from '../../components/common/loading';
import TablePaginationActions from '../../components/common/mgyTable/tablePaginationActions';
import { TablePagination } from '@material-ui/core';
import { AllProp } from '../http/manager/getAllGoods';

/**
 * 获取 表格数据
 * */
export function useTableData<T>(
  asyncFn: (pageNum: number, pageSize: number, orderRule: OrderRuleType) => Promise<AllProp<T>>,
): { state: LoadingState<AllProp<T>>; tablePage: React.ReactNode } {
  /**
   * 页码
   * */
  const pageNum = Number(useQuery('pageNum') ?? 0);
  /**
   * 每页大小
   * */
  const pageSize = Number(useQuery('pageSize') ?? 10);
  /**
   * 排序规则
   * */
  const orderRule = (useQuery('orderRule') as OrderRuleType) ?? 'DESC';
  /**
   * 路由切换
   * */
  const pageHistory = useHistory();
  /**
   * 数据
   * */
  const [state, fn] = useAsyncFnWithNotify(
    async () => {
      return await asyncFn(pageNum, pageSize, orderRule);
    },
    undefined,
    [pageNum, pageSize, orderRule],
  );
  /**
   * 更改路由
   * */
  const changeRouter = React.useCallback(
    (num: number, size: number, rule: OrderRuleType) => {
      const searchUrl = `?pageNum=${num}&pageSize=${size}&orderRule=${rule}`;
      pageHistory.push({ search: searchUrl });
    },
    [pageHistory],
  );
  React.useEffect(() => {
    changeRouter(0, pageSize, orderRule);
  }, [changeRouter, orderRule, pageSize]);
  React.useEffect(() => {
    fn().then();
  }, [fn]);
  return {
    state: { ...state, retry: fn },
    tablePage: (
      <TablePagination
        count={state.value?.total ?? 0}
        onChangePage={(event, page) => {
          changeRouter(page, pageSize, orderRule);
        }}
        page={pageNum}
        rowsPerPage={pageSize}
        onChangeRowsPerPage={(event) => {
          changeRouter(pageNum, parseInt(event.target.value), orderRule);
        }}
        rowsPerPageOptions={[5, 10, 20]}
        ActionsComponent={TablePaginationActions}
      />
    ),
  };
}
