import { BrowserRouter } from 'react-router-dom';
import { Admin, Resource } from 'react-admin';
import woocommerceData from 'ra-data-woocommerce';
import orders from './orders';
import refunds from './refunds';
import products from './products';
import authProvider from './authProvider';
import LoginPage from './LoginPage.js';

const dataProvider = woocommerceData({
    woocommerceUrl: 'https://rays.com.tr',
    consumerKey: 'ck_439fa39f6e74f3d935a8380d10b57d2d4496e863',
    consumerSecret: 'cs_0949742191ee4ece4ca859336ab3f80337447fdf',
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