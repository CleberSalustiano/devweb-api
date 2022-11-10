class DeletePostService {
  execute({username, id}) {
    const fs = require("fs");

    let data = fs.readFileSync("./database/posts.json", "utf-8");
		const postRepository = JSON.parse(data.toString());

    data = fs.readFileSync("./database/users.json", "utf-8");
		const userRepository = JSON.parse(data.toString());

    const user = userRepository.find(
			(user) => user.username === username
		);

    if (!user) throw new Error("This user doesn't exist")

    const post = postRepository.find(post => post.id === +id);

    if (!post) throw new Error("this post doesnt exist")

    if (post.username !== username) throw new Error("This user cannot delete another user post")

    const newPostRepository = postRepository.filter(post => post.id !== +id);

    const jsonData = JSON.stringify(newPostRepository)

    fs.writeFile("./database/posts.json", jsonData, (err) => {
      if (err) {
        console.log(err);
      }
    })

    return post;
  }

}

module.exports = DeletePostService;