import { useParams } from 'react-router-dom';
import { 
  Create, 
  Form, 
  useGetOne, 
  Loading, 
  TextInput,
  SaveButton,
  NumberInput,
  ArrayInput,
  SimpleFormIterator
} from 'react-admin';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import WestIcon from '@mui/icons-material/West';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export default function RefundCreate() {
  const { data, isLoading } = useGetOne('orders', useParams());
  const { id } = useParams();
  if (isLoading) { return <Loading />; }
  return (<>
    <Box sx={{ pt: 2 }}>
      <Grid container>
        <Grid item xs={1}>
          <Button color='primary' href={`/orders/${data.id}`} variant="contained" startIcon={<WestIcon sx={{mr: -2, ml: -.5}} />} />
        </Grid>
        <Grid item xs={3}>
          <Typography component="div" variant="h6">
            <strong>İade</strong>
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Create resource={`orders/${id}/refunds`} sx={{ mt: 1 }}>
      <Form>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Card variant='outlined' sx={{ mb: 2 }}>
                  <CardContent>
                    <ArrayInput label='' source="line_items">
                      <SimpleFormIterator inline disableRemove disableReordering>
                        <TextInput variant="outlined" source="id" />
                        <NumberInput variant="outlined" label="Adet" source="quantity" />
                        <NumberInput variant="outlined" label="Tutar" source="refund_total" />
                      </SimpleFormIterator>
                    </ArrayInput>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card variant="outlined">
                  <CardContent>
                    <TextInput source="amount" label="İade Tutarı" variant="outlined" fullWidth />
                    <SaveButton label="İade Et" icon={<CurrencyExchangeIcon />} fullWidth />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Form>
    </Create>
  </>)
}