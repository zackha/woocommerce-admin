import {useRecordContext} from 'react-admin';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';

export default function ListItemsField() {
const items = useRecordContext();
  return (
    <Card variant='outlined'>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Resim</TableCell>
              <TableCell>Ürün</TableCell>
              <TableCell>Fiyat</TableCell>
              <TableCell align="center">Adet</TableCell>
              <TableCell align="right">Toplam</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.line_items.map((item) => (
              <TableRow key={item.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row"><Avatar variant="rounded" src={item.image.src} sx={{ width: 60, height: 90 }}/></TableCell>
                <TableCell>{item.name}<br /><small>{item.sku} - {item.meta_data[0].display_value}</small><br /><small>{item.id}</small></TableCell>
                <TableCell>{item.subtotal} TL</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="right">{item.total} TL</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}