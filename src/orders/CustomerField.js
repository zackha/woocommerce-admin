import {useRecordContext} from 'react-admin';
import Typography from '@mui/material/Typography';

export default function CustomerField() {
const customer = useRecordContext();
    return (
        <Typography>
            {customer.billing.address_1} 
            <br />
            {customer.billing.state} / {customer.billing.city}
            <br/>
            Telefon: {customer.billing.phone}
        </Typography>
    )
};