import { Edit, Form, useRecordContext} from 'react-admin';
import { Box, Grid } from '@mui/material';
import ListItemsField from './ListItemsField';
import CustomerField from './CustomerField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import WestIcon from '@mui/icons-material/West';
import OrderNotes from './OrderNotes';
import OrderTotal from './OrderTotal';
import CreateRefundButton from './CreateRefundButton';

const OrderEdit = () => (
    <Edit component="div">
      <OrderForm />
    </Edit>
);

const OrderForm = () => {
const dateSettings = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
const record = useRecordContext();
  return (
    <Form>
      <Box mb={2}>
        <Grid container>
          <Grid item xs={1}>
            <Button color='primary' href="/orders" variant="contained" startIcon={<WestIcon sx={{mr: -2, ml: -.5}} />} />
          </Grid>
          <Grid item xs={3}>
            <Typography component="div" variant="h6">
              <strong>Sipariş #{record.id}</strong>
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              {new Date(record.date_created).toLocaleDateString('tr-TR', dateSettings)}
            </Typography>
          </Grid>
          <Grid item xs={8} align='right'>
            <CreateRefundButton />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
            <Box mb={2}>
              <ListItemsField />
            </Box>
            <Box>
              <OrderTotal />
            </Box>
        </Grid>
          <Grid item xs={4}>
            <Card sx={{ mb: 2 }} variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {record.billing.first_name} {record.billing.last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <CustomerField />
                </Typography>
              </CardContent>
            </Card>
          <OrderNotes />
        </Grid>
      </Grid>
    </Form>
  );
};

export default OrderEdit;