import React from 'react';
import MyDrawer from '../components/myDrawer';
import { useTableData } from '../utils/hook/useTableData';
import { useTablePageStyle } from './goods';
import { getAllShops } from '../utils/http/manager/getAllShops';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Loading } from '../components/common/loading';

/**
 * 商店页
 * */
export default function Shops(): JSX.Element {
  const classes = useTablePageStyle();
  const { state, tablePage } = useTableData(getAllShops);
  return (
    <MyDrawer>
      <TableContainer className={classes.table} component={Paper}>
        <Loading state={state}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>商店 id</TableCell>
                <TableCell>店名</TableCell>
                <TableCell>描述</TableCell>
                <TableCell>所有者 id</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.value?.list.map((shopItem) => (
                <TableRow key={shopItem.mid}>
                  <TableCell>{shopItem.mid}</TableCell>
                  <TableCell>{shopItem.name}</TableCell>
                  <TableCell>{shopItem.info}</TableCell>
                  <TableCell>{shopItem.uid}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            {tablePage}
          </Table>
        </Loading>
      </TableContainer>
    </MyDrawer>
  );
}
