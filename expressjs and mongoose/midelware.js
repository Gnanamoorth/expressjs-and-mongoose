const { Schema, default: mongoose } = require("mongoose");
const user = require('./db')

var jwt = require('jsonwebtoken');
const { userInfo } = require('os');
const { ObjectId } = require("mongodb");

exports.login_middelware = async function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[1]) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            const decoded = await jwt.verify(token, "verify-passwords")
            await user.user_details.findOne({ _id: ObjectId(decoded.user_id) })
            next()
        } catch (error) {
            res.json({ err: "unauthorized" })
        }
    }
}
