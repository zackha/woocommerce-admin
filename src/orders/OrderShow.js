import { useRecordContext } from 'react-admin';
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
                            <CustomerField />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" gutterBottom align="right">
                                <strong>Invoice:</strong> {record.id}
                            </Typography>
                            <Typography gutterBottom variant='body2' align="right">
                                <strong>Date:</strong> {new Date(record.date_created).toLocaleDateString()}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Card variant='outlined'>
                    <ListItemsField />
                </Card>
            </CardContent>
        </Card>
    );
};