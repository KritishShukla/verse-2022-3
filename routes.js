const routes = require('next-routes')()

console.log('in routes');

routes
    .add('/collection/:address','/collection')
    .add('/create/:address','/create')
    .add('/saledashboard1/:address','/saledashboard1')
    .add('/saledashboard2/:address','/saledashboard2')
    .add('/saledashboard3/:address','/saledashboard3')
    .add('/additemtosale/:address','/additemtosale')
    .add('/createsale/:address','/createsale')
    .add('/saleitem/:id','/saleitem')
    .add('/sales/:address','/sales')
    .add('/index','/index');


module.exports = routes;