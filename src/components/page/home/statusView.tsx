import React from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useAsyncFnWithNotify } from '../../../utils/hook/useAsyncFnWithNotify';
import { Loading } from '../../common/loading';
import { getAllMoney } from '../../../utils/http/manager/getAllMoney';

const useClasses = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(2),
    },
    main: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    item: {
      width: `calc(25% - ${theme.spacing(2.25)}px)`,
    },
    itemContent: {
      textAlign: 'center',
    },
    button: {
      height: '100%',
    },
  }),
);

/**
 * 状态信息
 * */
export default function StatusView(): JSX.Element {
  /**
   * 样式
   * */
  const classes = useClasses();
  /**
   * 商店余额
   * */
  const [state, fn] = useAsyncFnWithNotify(
    async () => {
      return await getAllMoney();
    },
    undefined,
    [],
  );
  React.useEffect(() => {
    fn().then();
  }, [fn]);
  return (
    <>
      <Typography className={classes.header} variant={'h5'}>
        概览
      </Typography>
      <Box className={classes.main}>
        <Card className={classes.item}>
          <Loading state={{ ...state, retry: fn }}>
            {state.value && (
              <CardActionArea className={classes.button}>
                <CardContent className={classes.itemContent}>
                  <Typography variant={'h4'}>{state.value.TotalBuyMoney}</Typography>
                  <Typography color={'textSecondary'}>总金额</Typography>
                </CardContent>
              </CardActionArea>
            )}
          </Loading>
        </Card>
        <Card className={classes.item}>
          <Loading state={{ ...state, retry: fn }}>
            {state.value && (
              <CardActionArea className={classes.button}>
                <CardContent className={classes.itemContent}>
                  <Typography variant={'h4'}>{state.value.TotalPledgeMoney}</Typography>
                  <Typography color={'textSecondary'}>总押金</Typography>
                </CardContent>
              </CardActionArea>
            )}
          </Loading>
        </Card>
      </Box>
    </>
  );
}
