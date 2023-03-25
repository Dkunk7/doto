const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const editRoutes = require("./edit-routes"); // Is this one necessary? Unsure.

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/edit", editRoutes); // Might not need this either.

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;