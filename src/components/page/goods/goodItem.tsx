import React from 'react';
import {
  Avatar,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import { GoodDetail } from '../../../utils/http/goods/getGoodDetail';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export interface GoodItemProp {
  /**
   * 商品信息
   * */
  goodItem: GoodDetail;
}

export default function GoodItem(props: GoodItemProp): JSX.Element {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size={'small'} onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{props.goodItem.name}</TableCell>
        <TableCell>
          <Avatar src={props.goodItem.picUrl} />
        </TableCell>
        <TableCell>{props.goodItem.type}</TableCell>
        <TableCell>{props.goodItem.info}</TableCell>
        <TableCell>{props.goodItem.price}</TableCell>
        <TableCell padding={'none'}>
          <ListItem>
            <ListItemText primary={props.goodItem.merchant.name} secondary={props.goodItem.merchant.info} />
          </ListItem>
        </TableCell>
        <TableCell>{props.goodItem.stock}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List>
              {props.goodItem.rents.length > 0 ? (
                props.goodItem.rents.map((rentItem) => (
                  <ListItemText
                    key={rentItem.rid}
                    primary={`${rentItem.rent}元 每 ${dayjs.duration({ seconds: rentItem.time }).humanize()}`}
                    secondary={`保证金 : ${rentItem.pledge}元`}
                  />
                ))
              ) : (
                <Typography>没有租金</Typography>
              )}
            </List>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
