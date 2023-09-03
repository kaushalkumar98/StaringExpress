// app.js file
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop'); 

app.use(bodyParser.urlencoded({extended: false}));

app.use('/shop', shopRoutes);
app.use('/admin',adminRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>page not found</h1>');
});
 
 app.listen(3000);

//admin.js file
const express  = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><input type="text" name="size"><button type="submit">Add Product</button></form>')
});
 router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
 });

module.exports = router;

//shop.js file
const express  = require('express');

const router = express.Router();

router.get('/', (req, res, next) => { 
    res.send('<h1>Hello from Express!</h1>');
 });

 module.exports = router;
