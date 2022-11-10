const { User, Thought } = require("../models");

module.exports = {

    //Get all users
    getUsers(req, res) {
        User.find()
            .select("-__v")
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

    // Get single user by _id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .populate("thoughts")
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: "This user does not exist" })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },

    // Create new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // Update user by _id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "This user does not exist" })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    // Delete user by _id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "This user does not exist" })
                    : Thought.find({username: user.username}).remove()
                    
                    )
                    res.status(200).json({ message: "The user is deleted" })
    },

    // Add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true },
            // { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "This user does not exist" })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    // Delete a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true },
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "This user does not exist" })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    }
};