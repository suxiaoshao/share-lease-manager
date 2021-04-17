import React from 'react';
import MyDrawer from '../components/myDrawer';
import StatisticsView from '../components/page/home/StatisticsView';
import { createStyles } from '@material-ui/core/styles';
import { Box, makeStyles } from '@material-ui/core';
import StatusView from '../components/page/home/statusView';

const useClass = makeStyles(() =>
  createStyles({
    main: {
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      flex: '0 0 auto',
    },
    content: {
      flex: '1 1 0',
      overflow: 'auto',
    },
  }),
);
export default function HomePage(): JSX.Element {
  const classes = useClass();
  return (
    <MyDrawer className={classes.main}>
      <Box padding={3} className={classes.content}>
        <StatusView />
        <StatisticsView />
      </Box>
    </MyDrawer>
  );
}
