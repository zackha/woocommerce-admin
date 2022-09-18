import {useRecordContext, ReferenceField} from 'react-admin';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ListItemsField from './ListItemsField';
import CustomerField from './CustomerField';

export default function OrderShow() {
    const record = useRecordContext();
    return (
        <Card sx={{ width: 768, margin: '15px auto' }} variant="outlined">
            <CardContent>
                <Box margin="10px 15px 25px">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography>
                                <ReferenceField source="customer_id" reference="customers">
                                    {record.billing.first_name} {record.billing.last_name}
                                </ReferenceField>
                            </Typography>
                            <CustomerField />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" gutterBottom align="right">
                                Fatura: {record.id}
                            </Typography>
                            <Typography gutterBottom align="right">
                                Tarih: {new Date(record.date_created).toLocaleDateString()}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box margin="10px 15px">
                    <ListItemsField />
                </Box>
            </CardContent>
        </Card>
    );
};