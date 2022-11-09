const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");

const userData = [
    {
        username: "Parker",
        email: "parker@mail.com",
    },
    {
        username: "Start",
        email: "startk@mail.com",
    },
    {
        username: "Rogers",
        email: "rogers@mail.com",
    }
];

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("Connected to database");

    // Drop existing users
    await User.deleteMany({});

    // Drop existing thoughts
    await Thought.deleteMany({});

    // Seed database
    await User.insertMany(userData);

    console.info('Seeding complete! 🌱');
    process.exit(0);
});