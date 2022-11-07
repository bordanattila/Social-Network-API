const { ObjectId } = require("mongoose").Types;
const { User, Thought, Reaction } = require("../models");



module.exports = {
    //Get all users
    getUser(req, res) {
        User.find()
        .then(async (users) => {
            const userObject = {
                users, 
            };
            return res.json(userObject);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
}