import { useRecordContext } from 'react-admin'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const CreateRefundButton = () => {
    const record = useRecordContext();
    return (
    <Button
      sx={{ mt: .8 }}
      variant="contained" 
      endIcon={<CurrencyExchangeIcon />}
      component={Link}
      to={{pathname: `/orders/${record.id}/refunds/create`}}
    >
      Refund
    </Button>
    );
};

export default CreateRefundButton;