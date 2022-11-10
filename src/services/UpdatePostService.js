class UpdatePostService {
  execute({username, title, paragraph, id}) {
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
    const postIndex = postRepository.findIndex(post => post.id === +id)

    if (!post) throw new Error("this post doesnt exist")

    if (post.username !== username) throw new Error("This user cannot delete another user post")

    post.title = title;
    post.paragraph = paragraph;

    postRepository.splice(postIndex, 1, post);

    const jsonData = JSON.stringify(postRepository)

    fs.writeFile("./database/posts.json", jsonData, (err) => {
      if (err) {
        console.log(err);
      }
    })

    return post;
  }
}

module.exports = UpdatePostService;