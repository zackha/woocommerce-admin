import { Fragment, useCallback } from 'react';
import { 
    Datagrid,
    List, 
    TextInput, 
    TextField, 
    useGetList, 
    useListContext, 
    FunctionField,
    BulkUpdateButton
} from 'react-admin';
import OrderShow from './OrderShow';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const completed = { status: "completed" };
const processing = { status: "processing" };

const ChangeStatusButtonCompleted = () => (<BulkUpdateButton label="Completed" data={completed} icon={<AssignmentTurnedInIcon/>} />);
const ChangeStatusButtonProcessing = () => (<BulkUpdateButton label="Processing" data={processing} icon={<AccessTimeIcon/>} />);
const StatusCompleted = () => (<ChangeStatusButtonCompleted />);
const StatusProcessing = () => (<ChangeStatusButtonProcessing />);

const OrderList = () => (
    <List 
        filters={orderFilters}
        filterDefaultValues={{ status: 'processing' }}
        sort={{ order: 'desc' }}
    >
        <TabbedDatagrid />
    </List>
);

const orderFilters = [<TextInput source="search" alwaysOn />];

const tabs = [
    { id: 'processing', name: 'processing' },
    { id: 'completed', name: 'completed' },
    { id: 'refunded', name: 'refunded' },
];

const useGetTotals = (filterValues) => {
    const { total: totalprocessing } = useGetList('orders', {
        filter: { ...filterValues, status: 'processing' },
    });
    const { total: totalcompleted } = useGetList('orders', {
        filter: { ...filterValues, status: 'completed' },
    });
    const { total: totalrefunded } = useGetList('orders', {
        filter: { ...filterValues, status: 'refunded' },
    });
    return {
        processing: totalprocessing,
        completed: totalcompleted,
        refunded: totalrefunded,
    };
};

const CustomEmpty = () => (<Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">No orders found</Typography>)

const TabbedDatagrid = () => {
    const dateSettings = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const listContext = useListContext();
    const { filterValues, setFilters, displayedFilters } = listContext;
    const totals = useGetTotals(filterValues);
    const handleChange = useCallback(
        (event, value) => {
        setFilters &&
            setFilters (
                { ...filterValues, status: value }, 
                displayedFilters, 
                false
            );
        }, 
        [displayedFilters, filterValues, setFilters]
    );

    return (
        <Fragment>
            <Tabs
                variant='fullWidth'
                centered
                value={filterValues.status}
                indicatorColor='primary'
                onChange={handleChange}
            >
                {tabs.map(choice => (
                    <Tab
                        key={choice.id}
                        label={
                            totals[choice.name]
                                ? `${choice.name} (${totals[choice.name]})`
                                : choice.name}
                            value={choice.id}
                    />
                ))}
            </Tabs>
            <Divider />
            {filterValues.status === 'processing' && (
                <Datagrid optimized rowClick='edit' expand={<OrderShow />} empty={<CustomEmpty />} bulkActionButtons={<StatusCompleted />}>
                    <TextField 
                        source="id" 
                        label="Order"
                    />
                    <FunctionField 
                        label="Date"
                        render={record => `${new Date(record.date_created).toLocaleDateString('tr-TR', dateSettings)}`}
                    />
                    <FunctionField 
                        label="Customer"
                        render={record => `${record.billing.first_name} ${record.billing.last_name}`} />
                    <FunctionField 
                        label="Items"
                        render={record => `${record.line_items.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)} item`}
                    />
                    <FunctionField 
                        label="Total" 
                        sx={{ fontWeight: 'bold' }} 
                        render={record => `${record.total} ${record.currency_symbol}`} 
                        textAlign="right"
                    />
                </Datagrid>
            )}
            {filterValues.status === 'completed' && (
                <Datagrid rowClick='edit' expand={<OrderShow />} bulkActionButtons={<StatusProcessing />}>
                    <TextField 
                        source="id" 
                        label="Order"
                    />
                    <FunctionField 
                        label="Date"
                        render={record => `${new Date(record.date_created).toLocaleDateString('tr-TR', dateSettings)}`}
                    />
                    <FunctionField 
                        label="Customer"
                        render={record => `${record.billing.first_name} ${record.billing.last_name}`} />
                    <FunctionField 
                        label="Items"
                        render={record => `${record.line_items.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)} item`}
                    />
                    <FunctionField 
                        label="Total" 
                        sx={{ fontWeight: 'bold' }} 
                        render={record => `${record.total} ${record.currency_symbol}`} 
                        textAlign="right"
                    />
                </Datagrid>
            )}
            {filterValues.status === 'refunded' && (
                <Datagrid rowClick='edit' expand={<OrderShow />}>
                    <TextField 
                        source="id" 
                        label="Order"
                    />
                    <FunctionField 
                        label="Date"
                        render={record => `${new Date(record.date_created).toLocaleDateString('tr-TR', dateSettings)}`}
                    />
                    <FunctionField 
                        label="Customer"
                        render={record => `${record.billing.first_name} ${record.billing.last_name}`} />
                    <FunctionField 
                        label="Items"
                        render={record => `${record.line_items.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)} item`}
                    />
                    <FunctionField 
                        label="Total" 
                        sx={{ fontWeight: 'bold' }} 
                        render={record => `${record.total} ${record.currency_symbol}`} 
                        textAlign="right"
                    />
                </Datagrid>
            )}
        </Fragment>
    )
};

export default OrderList;