const express = require('express');
const ProductModel = require('./model');
const router = express.Router();

router.use((req, res, next) => { next() });

router.get('/all', (req, res) => {
    ProductModel.find().then(products => {
        res.send(products);
    });
});

router.get('/:id', (req, res) => {
    ProductModel.findById(req.params.id).then(product => {
        res.send(product);
    });
});

router.post('', (req, res) => {
    const productToCreate = req.body.product;

    ProductModel.create(productToCreate).then((createdProduct) => {
        res.send(createdProduct);
    });
});

router.put('/:id', (req, res) => {
    const productId = req.params.id;
    const productToUpdate = req.body.product;

    ProductModel.findById(productId).then((foundedProduct) => {
        foundedProduct.set(productToUpdate);

        foundedProduct.save().then(() => {
            res.send('OK');
        });
    });
});

router.delete('/:id', (req, res) => {
    const productId = req.params.id;

    ProductModel.deleteOne({ _id: productId }).then(() => {
        res.send('OK');
    });
});

module.exports = router;