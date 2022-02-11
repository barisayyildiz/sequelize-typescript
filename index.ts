require('dotenv').config()
import express, { Request, Response } from "express"

import devRoutes from "./routes/devRoutes"
import repoRoutes from "./routes/repoRoutes"
import contributionRoutes from "./routes/contributionRoutes"

import db from "./models"
const app = express()

// bodyparser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/", (req:Request, res:Response) => {
	res.send("Hello World")
})

app.use("/api", devRoutes)
app.use("/api", repoRoutes)
app.use("/api", contributionRoutes)

const {
	PORT
} = process.env

db.sequelize.sync({force:true}).then(() => {
	app.listen(PORT, () => console.log(`http://localhost:${PORT}/`))	
})

