import { List, Datagrid, useRecordContext } from 'react-admin';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


const MyUrlField = () => {
  const record = useRecordContext();
  return record ? (
    <Link href={record.permalink} target='_blank' underline="none">
      <ListItem sx={{paddingLeft: 0 }}>
        <ListItemAvatar>
          <Avatar variant="rounded" alt={record.name} src={record.images[0].src} sx={{ width: 40, height: 60 }} />
        </ListItemAvatar>
        <ListItemText primary={
            <Typography variant="body2" color="text.primary" >
              {record.name}
            </Typography>
          } 
          secondary={
            <small>{record.sku}</small>
          } 
        />
      </ListItem>
    </Link>
  ) : null;
}

const ProductList = () => (
  <List>
      <Datagrid>
          <MyUrlField label='Product' />
      </Datagrid>
  </List>
);

export default ProductList;