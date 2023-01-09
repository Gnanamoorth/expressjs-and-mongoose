const user = require('./db')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const mongodb = require('mongodb');
const saltRounds = 10;
/*signup GET */
exports.getdata = async function (req, res) {
    const userDetails = await user.user_details.find()
    res.json(userDetails)
}
/*signup post */
exports.singnup = async function (req, res) {
    const password = await bcrypt.hash(req.body.password, saltRounds)
    const data = { ...req.body, password }
    const users = await user.user_details.create(data)
    await res.json("your data is stored")
}
/*signup Delete */
exports.trash = async function (req, res) {
    const id = req.params.id;
    constbooks = await user.user_details.deleteOne({ _id: mongodb.ObjectId(id) })
    res.status(204).json(books)
}
/* login Post */
exports.login = async function (req, res) {
    const users = await user.user_details.findOne({ email: req.body.email })
    if (!users) {
        res.send("user not found")
    }
    if (!(await bcrypt.compare(req.body.password, users.password))) {
        res.send("user not defined")
    }
    const token = jwt.sign(users.toJSON(), "verify-passwords")
    res.json({ users, token })
} 
