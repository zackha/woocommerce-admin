import InboxIcon from '@mui/icons-material/Inbox';
import OrderList from './OrderList';
import OrderEdit from './OrderEdit';

export default {
    list: OrderList,
    edit: OrderEdit,
    icon: InboxIcon,
    recordRepresentation: (record) => `${record.billing.first_name} ${record.billing.last_name}`,
    options: { label: 'Orders' }
};