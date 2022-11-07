const { Schema, model, Types } = require("mongoose");

// Schema to create Reaction model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionbody: {
            type: String,
            required: true,
            max_lenght: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        }
    }
);

const Reaction = reactionSchema;

module.exports = Reaction;