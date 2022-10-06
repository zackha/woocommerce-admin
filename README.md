# WooCommerce Admin 

An alternative open source woocommerce admin panel developed with [React Admin](https://github.com/marmelab/react-admin)

<img src="https://raw.githubusercontent.com/zackha/zackha/main/woocommerce-admin.gif" height="300px">

### Installing

1. Clone this repo using terminal `git clone https://github.com/zackha/woocommerce-admin.git`
2. `cd woocommerce-admin`
3. `yarn install` 
4. Edit `App.js` and fill in `woocommerceUrl`, `consumerKey` and `consumerSecret` with your generated API keys
5. `yarn start`
6. Username: john | Password: 123

If your API is on another domain as the JS code, you'll need to whitelist this header with an Access-Control-Expose-Headers CORS header.

You need to allow access to the your IP number, from the firewall settings (whitelist - allowlist) of your server where your WooCommerce site is located.

## License

Licensed under the [MIT License](https://github.com/zackha/woocommerce-admin/blob/master/LICENSE)
