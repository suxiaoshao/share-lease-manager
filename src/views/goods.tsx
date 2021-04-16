import React from 'react';
import MyDrawer from '../components/myDrawer';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { getAllGoods } from '../utils/http/manager/getAllGoods';
import { Loading } from '../components/common/loading';
import GoodItem from '../components/page/goods/goodItem';
import { useTableData } from '../utils/hook/useTableData';

export const useTablePageStyle = makeStyles((theme) =>
  createStyles({
    table: {
      margin: theme.spacing(2),
      width: `calc(100% - ${theme.spacing(4)}px)`,
      overflow: 'auto',
      height: `calc(100% - ${theme.spacing(4)}px)`,
    },
  }),
);

/**
 * 商品设置
 * */
export default function Goods(): JSX.Element {
  const classes = useTablePageStyle();
  const { state, tablePage } = useTableData(getAllGoods);
  return (
    <MyDrawer>
      <TableContainer className={classes.table} component={Paper}>
        <Loading state={state}>
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
            {tablePage}
          </Table>
        </Loading>
      </TableContainer>
    </MyDrawer>
  );
}
