const { Router } = require("express");
const authenticate = require("../middlewares/auth");
const AuthenticateUserService = require("../services/AuthenticateUserService");

const routes = Router();

routes.get("/", authenticate ,(request, response) => {
  const user = request.user;

  return response.json({user})
})

routes.post("/session", (request, response) => {
	try {
		const { username, password } = request.body;

		const authenticaseUser = new AuthenticateUserService();
		const { user, token } = authenticaseUser.execute({ username, password });

		delete user.password;

    return response.json({ user, token });
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

module.exports = routes;
