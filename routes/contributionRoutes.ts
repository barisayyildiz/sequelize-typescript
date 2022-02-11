import express, { Request, Response } from "express"
import db from "../models"

const router = express.Router()

router.get("/devrepos", async (req:Request, res:Response) => {
	try {
		const result = await db.DeveloperRepos.findAll()
		res.json(result)		
	} catch (error) {
		res.json(error)
	}
})

router.get("/contributions/dev/:id", async (req:Request, res:Response) => {
	try {
		const devs = await db.Developer.findOne({
			include:[{
				model:db.Repository,
				as:'contribution'
			}],
			where:{
				id:req.params.id
			}
		})
		res.json(devs)		
	} catch (error) {
		console.log(error)
		res.json(error)
	}
})

router.get("/contributions/repo/:id", async (req:Request, res:Response) => {
	try {
		const devs = await db.Repository.findOne({
			include:[{
				model:db.Developer,
				as:'contribution',
			}],
			where:{
				id:req.params.id
			}
		})
		res.json(devs)		
	} catch (error) {
		console.log(error)
		res.json(error)
	}
})


router.post("/devrepos", async (req:Request, res:Response) => {
	try {
		const devrepo = await db.DeveloperRepos.create({
			...req.body
		})
		res.json(devrepo)
	} catch (error) {
		res.json(error)
	}
})


export default router
