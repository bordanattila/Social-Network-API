const connection = require("../config/connection");
const { User, Thought } = require("../models");

const userData = [
    {
        username: "Parker",
        email: "parker@mail.com",
    },
    {
        username: "Stark",
        email: "stark@mail.com",
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