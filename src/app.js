require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const app = express();

app.use(express.json());
app.use(cors());
// app.use(function (req, res, nex) {
// 	res.header("Access-Control-Allow-Origin", "*")
// 	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
// 	res.header("Access-Control-Allow-Credentials", true);
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, content-type, application/json");
// 	next();
// })

app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port, () => {
	console.log("Rodando em " + port);
});
