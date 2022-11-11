const router = require("express").Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require("../../controllers/thoughtController.js");

//api/thoughts
router.route("/").get(getThoughts).post(createThought)

//api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought)

//api/thoughts/:thoughtId/reaction
router.route("/:thoughtId/reaction").post(createReaction);

//api/thoughts/:thoughtId/reactionId
router.route("/:thoughtId/:reactionId").delete(deleteReaction);

module.exports = router;