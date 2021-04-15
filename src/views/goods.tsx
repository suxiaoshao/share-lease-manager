import React from 'react';
import MyDrawer from '../components/myDrawer';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import { useQuery } from '../utils/hook/useQuery';
import { OrderRuleType } from '../utils/http/manager/getManagerOrders';
import { useHistory } from 'react-router';
import { useAsyncFnWithNotify } from '../utils/hook/useAsyncFnWithNotify';
import { getAllGoods } from '../utils/http/manager/getAllGoods';
import { Loading } from '../components/common/loading';
import GoodItem from '../components/page/goods/goodItem';
import TablePaginationActions from '../components/common/mgyTable/tablePaginationActions';

const useStyle = makeStyles((theme) =>
  createStyles({
    table: {
      margin: theme.spacing(2),
      width: `calc(100% - ${theme.spacing(4)}px)`,
      overflow: 'auto',
      maxHeight: `calc(100% - ${theme.spacing(4)}px)`,
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  }),
);

/**
 * 商品设置
 * */
export default function Goods(): JSX.Element {
  const classes = useStyle();
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
      return await getAllGoods(pageNum, pageSize, orderRule);
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
  return (
    <MyDrawer className={classes.main}>
      <TableContainer className={classes.table} component={Paper}>
        <Loading state={{ ...state, retry: fn }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>名字</TableCell>
                <TableCell>图片</TableCell>
                <TableCell>类型</TableCell>
                <TableCell>描述</TableCell>
                <TableCell>价格</TableCell>
                <TableCell>商店</TableCell>
                <TableCell>库存</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.value?.list.map((goodItem) => (
                <GoodItem goodItem={goodItem} key={goodItem.gid} />
              ))}
            </TableBody>
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
          </Table>
        </Loading>
      </TableContainer>
    </MyDrawer>
  );
}
