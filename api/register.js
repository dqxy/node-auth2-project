const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("./users/users-model.js");

router.post("/", (req, res) => {
    let newUser = req.body;
    const rounds  = process.env.HASH_ROUNDS ||14;
    const hash = bcrypt.hashSync(newUser.password, rounds );
    newUser.password = hash;
    Users.add(newUser)
    .then(saved => {
        res.status(201).json(saved);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: err.message });
        });
});

module.exports = router;