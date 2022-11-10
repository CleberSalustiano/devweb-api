const { sign } = require("jsonwebtoken");

class AuthenticateUserService {
	execute({ username, password }) {
		const fs = require("fs");

		const data = fs.readFileSync("./database/users.json", "utf-8");
		const userRepository = JSON.parse(data.toString());

		const user = userRepository.find(
			(user) => user.username === username && user.password === password
		);

		if (!user) throw new Error("Esse usuário não está cadastrado");

		const token = sign({ username }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRESIN,
		});

		return { user, token};
	}
}

module.exports = AuthenticateUserService;
