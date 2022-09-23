import {useRecordContext} from 'react-admin';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';

export default function ListItemsField() {
const items = useRecordContext();
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.line_items.map((item) => (
            <TableRow key={item.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row"><Link href={`https://rays.com.tr/?s=${item.sku}&post_type=product`} target='_blank'><Avatar variant="rounded" src={item.image.src} sx={{ width: 60, height: 90 }}/></Link></TableCell>
              <TableCell>{item.name}<br /><small>{item.sku} - {item.meta_data[0].display_value}</small><br /><small>{item.id}</small></TableCell>
              <TableCell>{item.subtotal} {items.currency_symbol}</TableCell>
              <TableCell align="center">{item.quantity}</TableCell>
              <TableCell align="right">{item.total} {items.currency_symbol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}