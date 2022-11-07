const { Schema, model, Types } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoguhtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        
            createdAt: {
                type: Date,
                default: Date.now,
            },
            username: {
                type: String,
                required: true,
            },
            // reactions: [reactionSchema],        
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

const Thought = thoughtSchema;

module.exports = Thought;