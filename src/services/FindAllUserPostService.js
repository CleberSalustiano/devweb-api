class FindAllUserPostService {
  execute(username) {
    const fs = require("fs");

    const data = fs.readFileSync("./database/posts.json", "utf-8");
		const postRepository = JSON.parse(data.toString());

    const postsUser = postRepository.filter(post => post.username === username);

    return postsUser;
  
    
  }
}

module.exports = FindAllUserPostService;