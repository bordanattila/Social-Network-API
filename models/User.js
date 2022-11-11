const { Schema, model } = require("mongoose");

// Schema to create User model
const usersSchema = new Schema(
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
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "thought"
        }],
        friends: [this],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

// Create virtuals for friend count
usersSchema.virtual("friendCount").get(function () {
    return this.friends.length;
})

const User = model("user", usersSchema);

module.exports = User;