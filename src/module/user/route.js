const express = require('express');
const UserModel = require('./model');
const router = express.Router();

const generateToken = userData => {
    return `1234567112545${userData.id}`;
};

router.use((req, res, next) => {
    next()
});

router.post('/sign-up', async (req, res) => {
    const userToCreate = req.body;
    const user = await UserModel.create(userToCreate);

    user.token = generateToken(user);
    await user.save();

    res.send(user);
});

router.post('/sign-in', async (req, res) => {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    try {
        const user = await UserModel.findOne({email: userEmail, password: userPassword});

        if (user) {
            user.token = generateToken(user);
            await user.save();

            res.send(user);
        } else {
            res.send('EMAIL_OR_PASSWORD_NOT_EXIST');
        }

    } catch (error) {
        res.error(error)
    }
});

router.get('/sign-out', (req, res) => {
    const token = req.headers['Authorization'];

    UserModel.findOne({ token })
        .then((user) => {
            if (user) {
                user.token = null;
                user.save().then(() => res.send('OK'));
            } else {
                res.send('TOKEN_NOT_VALID');
            }
        })
        .catch(error => res.send(error));
});

router.post('/authorize', (req, res) => {
    const userToken = req.body.token;

    UserModel.findOne({ token: userToken })
        .then((user) => {
            if (user) {
                res.send(user);
            } else {
                res.send('TOKEN_NOT_VALID');
            }
        })
        .catch(error => res.send(error));
});

module.exports = router;