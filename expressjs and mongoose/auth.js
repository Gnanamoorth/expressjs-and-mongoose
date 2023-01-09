const express = require('express');
const authRouter = express.Router();
const authcontroller = require('./authcontroler')
/* signup route */
authRouter.route('/singup')
    .get(authcontroller.getdata)
    .post(authcontroller.singnup)
    .delete(authcontroller.trash)
/* login */
authRouter.post('/login', authcontroller.login)

module.exports.routing = authRouter