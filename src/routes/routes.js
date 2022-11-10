const { Router, request } = require("express");
const authenticate = require("../middlewares/auth");
const AuthenticateUserService = require("../services/AuthenticateUserService");
const CreateNewPostService = require("../services/CreateNewPostService");
const CreateUserService = require("../services/CreateUserService");
const DeletePostService = require("../services/DeletePostService");
const FindAllUserPostService = require("../services/FindAllUserPostService");
const UpdatePostService = require("../services/UpdatePostService");

const routes = Router();

// Página principal
routes.get("/", authenticate, (request, response) => {
	const fs = require("fs");

	const data = fs.readFileSync("./database/posts.json", "utf-8");
	const postRepository = JSON.parse(data.toString());

	return response.json({posts: postRepository})
})

//MyPosts
routes.get("/myPosts", authenticate, (request, response) => {
	const user = request.user;

	const findAllUserPost = new FindAllUserPostService();

	const postUser = findAllUserPost.execute(user.username);

	user.posts = postUser;

	return response.json({ user });
});



// Entrar
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

// Cadastrar
routes.post("/signup", (request, response) => {
	try {
		const { username, password } = request.body;

		const createUser = new CreateUserService();

		const user = createUser.execute({ username, password });

		return response.json(user);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

// Posts
routes.post("/post", authenticate, (request, response) => {
	try {
		const { username } = request.user;
		const { title, paragraph } = request.body;

		const createNewPost = new CreateNewPostService();

		const post = createNewPost.execute({ title, paragraph, username });

		return response.json(post);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

routes.delete("/post/:id", authenticate, (request, response) => {
  try {
		const { username } = request.user;
    const { id } = request.params;

    const deletePost = new DeletePostService();

    deletePost.execute({username, id});
		
		return response.status(201).json({});
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
})

routes.put("/post/:id", authenticate, (request, response) => {
  try {
		const { username } = request.user;
    const { id } = request.params;
		const { title, paragraph } = request.body;

		const updatePost = new UpdatePostService();

		const post = updatePost.execute({ title, paragraph, username, id });

		return response.json(post);
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
})

module.exports = routes;
