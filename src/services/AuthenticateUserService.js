const { sign } = require("jsonwebtoken");

class AuthenticateUserService {
	execute({ username, password }) {
		const fs = require("fs");

		const data = fs.readFileSync("./database/users.json", "utf-8");
		const userRepository = JSON.parse(data.toString());

		const user = userRepository.find(
			(user) => user.username === username
		);

		if (!user) throw new Error("Usuário/Senha Inválida");

		if (user.password != password) throw new Error("Usuário/Senha Inválida")

		const token = sign({ username }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRESIN,
		});

		return { user, token};
	}
}

module.exports = AuthenticateUserService;
