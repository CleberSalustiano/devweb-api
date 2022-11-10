class CreateUserService {
  execute({username, password}) {
    const fs = require("fs");

		const data = fs.readFileSync("./database/users.json", "utf-8");
		const userRepository = JSON.parse(data.toString());

    const user = userRepository.find(
			(user) => user.username === username
		);

    if (user) throw new Error("Esse usuário já existe")
    
    userRepository.push({username, password});

    const jsonData = JSON.stringify(userRepository)

    fs.writeFile("./database/users.json", jsonData, (err) => {
      if (err) {
        console.log(err);
      }
    })

    return {username, password};
  }
}

module.exports = CreateUserService