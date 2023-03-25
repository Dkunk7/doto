const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all User
router.get("/", (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET a single User by id
router.get("/:id", (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            user_id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this id."});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a User
router.post("/", (req, res) => {
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.user_id;
                req.session.email = dbUserData.email;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Login
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(400).json({ message: "Incorrect email or password." });
                console.log("Incorrect email or password.");
                return;
            }

            const validPassword = dbUserData.checkPassword(req.body.password);
            console.log(dbUserData)

            if (!validPassword) {
                res.status(400).json({ message: "Incorrect email or password." });
                console.log("Incorrect email or password.");
                return;
            }
            req.session.save(() => {
                req.session.user_id = dbUserData.user_id;
                req.session.email = dbUserData.email;
                req.session.loggedIn = true;

                res.json({ ok: true, user: dbUserData, message: "You're logged in! Start doing things. Now." });
                console.log("You're logged in! Start doing things. Now.");
            });
        });
});