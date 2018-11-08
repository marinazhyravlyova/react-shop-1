const express = require('express');
const UserModel = require('../user/model');
const ProductModel = require('../product/model');
const router = express.Router();

router.use((req, res, next) => next());

router.post('/add', async (req, res) => {
    const { productId, userId } = req.body;

    const user = await UserModel.findById(userId);
    const product = await ProductModel.findById(productId);

    user.basket.push(product);
    user.save();

    res.send('OK');
});

router.post('', async (req, res) => {
    const { userId } = req.body;
    const user = await UserModel.findById(userId).populate('basket');

    res.send(user.basket);
});

router.post('/delete', async (req, res) => {
    const { productId, userId } = req.body;
    const user = await UserModel.findById(userId).populate('basket');

    user.basket = user.basket.filter(({ id }) => id !== productId);

    await user.save();

    res.send('OK');
});

module.exports = router;
