const express = require('express');
const app = express.Router();
const connect = require("./db");
const mongodb = require('mongodb');
const path = require('path');
const test = require('./midelware')

app.use(test.login_middelware).
    route("/")
    .get(async function (req, res) {
        const movie = await connect.movie_schema.find()
        res.status(200).json(movie)
    })
    .post(async function (req, res) {
        try {
            const movie_details = await connect.movie_schema.create(req.body)
            await res.send(movie_details)
        }
        catch (errors) {
            res.status(400).send("your missed the term is :" + errors)
        }

    })

app.
    route("/:id")
    .get(async function (req, res) {
        const id = req.params.id;
       const movie = await connect.movie_schema.find({ _id: mongodb.ObjectId(id) })
        res.status(200).json(movie)
    })
    .patch(async function (req, res) {
        const id = req.params.id;
       const movies= await connect.movie_schema.updateOne({ _id: mongodb.ObjectId(id) }, { $set: req.body })
        res.status(202).json(movies)
    })
    .delete(async function (req, res) {
        const id = req.params.id;
       const movie = await connect.movie_schema.deleteOne({ _id: mongodb.ObjectId(id) })
        res.status(204).json(movie)
    })

module.exports = app

