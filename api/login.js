  
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // ----> npm i jsonwebtoken

const Users = require("./users/users-model.js");

const secrets = require("../api/secrets.js");

router.post("/", (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .then(([thisUser]) => {
            if (thisUser && bcrypt.compareSync(password, thisUser.password)) {
                const token = generateToken(thisUser);
                // send the token to the client
                res.status(200).json({ message: "Welcome!", token });
            } else {
                res.status(401).json({ message: "Authentication problem. You shall not pass." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: err.message });
        })
})

function generateToken(user) {
    // the data
    const payload = {
      userId: user.id,
      username: user.username,
    };
    const secret = secrets.jwtSecret;
    const options = {
      expiresIn: "1d",
    };
  
    return jwt.sign(payload, secret, options);
  }

module.exports = router;