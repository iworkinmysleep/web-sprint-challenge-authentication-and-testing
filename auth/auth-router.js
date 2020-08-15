const router = require("express").Router();
const bcrypt = require("bcryptjs");
const users = require("../api/db-helpers.js");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

router.post("/register", async (req, res) => {
	// implement registration
	const user = req.body;
	const hash = bcrypt.hashSync(user.password, 5);
	user.password = hash;

	try {
		const newUser = await users.add(user);
		res.status(201).json(newUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/login", (req, res) => {
	// implement login
	let { username, password } = req.body;

	users
		.findBy({ username })
		.then(([user]) => {
    
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({ message: "Welcome to Dad Jokes Api!", token });
			} else {
				res.status(401).json({ message: "Invalid username or password" });
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
	};
	const options = {
		expiresIn: "3h",
	};
	const secret = secrets.jwtSecret;

	return jwt.sign(payload, secret, options);
}

module.exports = router;
