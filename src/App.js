import { BrowserRouter } from 'react-router-dom';
import { Admin, Resource } from 'react-admin';
import woocommerceData from 'ra-data-woocommerce';
import orders from './orders';
import refunds from './refunds';
import products from './products';
import authProvider from './authProvider';
import LoginPage from './LoginPage.js';

const dataProvider = woocommerceData({
    woocommerceUrl: 'https://example.com',
    consumerKey: 'ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    consumerSecret: 'cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
})

const App = () => (
    <BrowserRouter>
        <Admin
            dataProvider={dataProvider}
            authProvider={authProvider}
            loginPage={LoginPage}
        >
            <Resource name="orders" {...orders} />
            <Resource name="orders/:id/refunds" {...refunds} />
            <Resource name="products" {...products} />
        </Admin>
    </BrowserRouter>
);

export default App;