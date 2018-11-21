const express = require('express');
const UserModel = require('../user/model');
const HealthyFoodModel = require('./model');
const DayModel = require('./day/model');
const EatingTimeModel = require('./eating-time/model');
const ProductDescriptionModel = require('./product-description/model');
const ProductModel = require('../product/model');
const router = express.Router();

router.use((req, res, next) => { next() });

const getHealthyFood = (id) => HealthyFoodModel
    .findById(id)
    .populate({
        path: "days",
        model: "Day",
        populate: {
            path: "eatingTimes",
            model: "EatingTime",
            populate: {
                path: "productsDescription",
                model: "ProductDescription",
                populate: {
                    path: "product",
                    model: "Product",
                }
            },
        }
    });

router.get('/:id', async (req, res) => {
    const healthyFoodId = req.params.id;
    const healthyFood = await getHealthyFood(healthyFoodId);

    res.send(healthyFood);
});

router.post('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const healthyFood = await HealthyFoodModel.create(req.body.healthyFood);
    const user = await UserModel.findById(userId);

    user.healthyFood = healthyFood;

    await user.save();

    res.send(healthyFood);
});

router.delete('/:healthyFoodId', async (req, res) => {
    const { healthyFoodId } = req.params;

    await HealthyFoodModel.deleteOne({ _id: healthyFoodId });

    res.send('OK');
});

router.post('/:healthyFoodId/day', async (req, res) => {
    const { healthyFoodId } = req.params;
    const { day } = req.body;

    try {
        const createdDay = await DayModel.create(day);
        await createdDay.save();
        const healthyFood = await getHealthyFood(healthyFoodId);
        healthyFood.days.push(createdDay);
        await healthyFood.save();
        const updatedHealthyFood = await getHealthyFood(healthyFoodId);

        return res.send(updatedHealthyFood);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.put('/:healthyFoodId/day/:dayId', async (req, res) => {
    const { healthyFoodId, dayId } = req.params;
    const { day } = req.body;

    try {
        await DayModel.update({ _id: dayId }, day);
        const healthyFood = await getHealthyFood(healthyFoodId);

        return res.send(healthyFood);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.delete('/:healthyFoodId/day/:dayId', async (req, res) => {
    const { healthyFoodId, dayId } = req.params;

    try {
        await DayModel.deleteOne({ _id: dayId });
        const healthyFood = await getHealthyFood(healthyFoodId);

        return res.send(healthyFood);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.post('/:healthyFoodId/day/:dayId/eatingTime', async (req, res) => {
    const { healthyFoodId, dayId } = req.params;
    const { eatingTime } = req.body;

    try {
        const createdEatingTime = await EatingTimeModel.create(eatingTime);
        const day = await DayModel.findById(dayId);

        day.eatingTimes.push(createdEatingTime);

        await day.save();
        await createdEatingTime.save();

        const healthyFood = await getHealthyFood(healthyFoodId);

        return res.send(healthyFood);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.put('/:healthyFoodId/day/:dayId/eatingTime/:eatingTimeId', async (req, res) => {
    const { healthyFoodId, dayId, eatingTimeId } = req.params;
    const { eatingTime } = req.body;

    try {
        await EatingTimeModel.update({ _id: eatingTimeId }, eatingTime);
        const healthyFood = await getHealthyFood(healthyFoodId);

        return res.send(healthyFood);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.delete('/:healthyFoodId/day/:dayId/eatingTime/:eatingTimeId', async (req, res) => {
    const { healthyFoodId, dayId, eatingTimeId } = req.params;

    try {
        await EatingTimeModel.deleteOne({ _id: eatingTimeId });
        const healthyFood = await getHealthyFood(healthyFoodId);

        return res.send(healthyFood);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.post('/:healthyFoodId/day/:dayId/eatingTime/:eatingTimeId/productDescription', async (req, res) => {
    const { healthyFoodId, dayId, eatingTimeId } = req.params;
    const { productDescription } = req.body;

    try {
        const createdProductDescription = await ProductDescriptionModel.create({
            weight: productDescription.weight,
        });
        createdProductDescription.product = await ProductModel.findById(productDescription.product.id);
        await createdProductDescription.save();

        const eatingTime = await EatingTimeModel.findById(eatingTimeId);
        eatingTime.productsDescription.push(createdProductDescription);
        await eatingTime.save();

        const healthyFood = await getHealthyFood(healthyFoodId);

        return res.send(healthyFood);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.put('/:healthyFoodId/day/:dayId/eatingTime/:eatingTimeId/productDescription/:productDescriptionId', async (req, res) => {
    const { healthyFoodId, dayId, eatingTimeId, productDescriptionId } = req.params;
    const { productDescription } = req.body;

    try {
        await ProductDescriptionModel.update({ _id: productDescriptionId }, productDescription);
        const healthyFood = await getHealthyFood(healthyFoodId);

        return res.send(healthyFood);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.delete('/:healthyFoodId/day/:dayId/eatingTime/:eatingTimeId/productDescription/:productDescriptionId', async (req, res) => {
    const { healthyFoodId, dayId, eatingTimeId, productDescriptionId } = req.params;

    try {
        await ProductDescriptionModel.deleteOne({ _id: productDescriptionId });
        const healthyFood = await getHealthyFood(healthyFoodId);

        return res.send(healthyFood);
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;