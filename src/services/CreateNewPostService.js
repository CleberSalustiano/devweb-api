class CreateNewPostService {
  execute({title, paragraph, username}) {
    const fs = require("fs");

    let data = fs.readFileSync("./database/posts.json", "utf-8");
		const postRepository = JSON.parse(data.toString());

    data = fs.readFileSync("./database/users.json", "utf-8");
		const userRepository = JSON.parse(data.toString());

    const user = userRepository.find(
			(user) => user.username === username
		);

    if (!user) throw new Error("Esse usuário não existe")

    const {id} = postRepository[postRepository.length - 1];

    const post = {id: id + 1 ,title, paragraph, username}

    postRepository.push(post);

    const jsonData = JSON.stringify(postRepository)

    fs.writeFile("./database/posts.json", jsonData, (err) => {
      if (err) {
        console.log(err);
      }
    })

    return post;
  }

}

module.exports = CreateNewPostService