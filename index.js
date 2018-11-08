const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoute = require('./src/module/product/route');
const userRoute = require('./src/module/user/route');
const basketRoute = require('./src/module/basket/route');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/product', productRoute);
app.use('/user', userRoute);
app.use('/basket', basketRoute);

mongoose
    .connect('mongodb://marina-admin:Iforgotthis!2@ds127961.mlab.com:27961/react-shop', {useNewUrlParser: true})
    .then(() => {
        console.log('DB successfully connected');

        app.listen(port);
        console.log(`Backend running on port: ${port}`);
    });
