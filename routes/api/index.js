const router = require("express").Router();
const userRoutes = require("./userRoutes");
// const thoughtRoutes = require("./thourghtRoutes");

router.use("/user", userRoutes);
// router.use("/thourghts", thoughtRoutes);

module.exports = router;