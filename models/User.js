const { Schema, model} = require("mongoose");
const thoughtsSchema = require("./Thought");

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true, 
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        },
        thoughts: [thoughtsSchema],
        friends: [userSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

const User = model("user", userSchema);

module.exports = User;