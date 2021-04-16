import React from 'react';
import MyDrawer from '../components/myDrawer';
import { useTablePageStyle } from './goods';
import { useTableData } from '../utils/hook/useTableData';
import { getAllUsers } from '../utils/http/manager/getAllUsers';
import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Loading } from '../components/common/loading';

/**
 * 用户页
 * */
export default function Users(): JSX.Element {
  const classes = useTablePageStyle();
  const { state, tablePage } = useTableData(getAllUsers);
  return (
    <MyDrawer>
      <TableContainer className={classes.table} component={Paper}>
        <Loading state={state}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>用户名</TableCell>
                <TableCell>邮箱</TableCell>
                <TableCell>电话号码</TableCell>
                <TableCell>头像</TableCell>
                <TableCell>用户类型</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.value?.list.map((userItem) => (
                <TableRow key={userItem.uid}>
                  <TableCell>{userItem.username}</TableCell>
                  <TableCell>{userItem.email}</TableCell>
                  <TableCell>{userItem.phone}</TableCell>
                  <TableCell>
                    <Avatar src={userItem.avatar ?? undefined} />
                  </TableCell>
                  <TableCell>
                    {userItem.level === 3 ? '管理员' : userItem.level === 2 ? '商店用户' : '普通用户'}
                  </TableCell>
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
