const { User, Thought } = require("../models");
// const { virtual } = require("../models/Reaction");
const { schema } = require("../models/Thought");

const reactionCount = schema.virtual("reactionCount");
reactionCount.get(async function () {
        return this.reactions.length;
    })

module.exports = {

    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .select("-__v")
            .then(async (thought) => {
                const thoughtObject = {
                    thought,
                    reactionCount: await reactionCount(),
                };
                return res.json(thoughtObject);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);;
            })
    },

    // Get single thought by _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .lean()
            .then(async (thought) =>
                !thought
                    ? res.status(404).json({ message: "This thought does not exist" })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },

    // Create new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                res.json(user))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    // Update thought by _id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "This thought does not exist" })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    // Delete thought by _id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "This thought does not exist" })
                    : res.status(200).json(thought)
            )
    },

    // Add reaction to thought
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true },
            // { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "This thought does not exist" })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    // Delete a reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true },
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "This thought does not exist" })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    }
};