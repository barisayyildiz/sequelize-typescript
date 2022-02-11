import express, { Request, Response } from "express"
import db from "../models"

const router = express.Router()

router.get("/repos", async (req:Request, res:Response) => {
	try{
		const repos = await db.Repository.findAll({
			include:[{
				model:db.Developer,
				as:'developer'
			}
		]
		})
		res.json(repos)
	}catch(error){
		console.log(error)
		res.json(error)
	}
})

router.get("/repos/:id", async (req:Request, res:Response) => {
	try{
		const repo = await db.Repository.findOne({
			where:{
				id:req.params.id
			},
			include:[{
				model:db.Developer
			}
		]
		})
		res.json(repo)
	}catch(error){
		res.json(error)
	}
})

router.post("/repos", async (req:Request, res:Response) => {
	try{
		const repos = await db.Repository.create({
			...req.body
		})
		res.json(repos)
	}catch(error){
		res.json(error)
	}
})

router.put("/repos/:id", async (req:Request, res:Response) => {
	try{
		const repo = await db.Repository.findByPk(req.params.id)
		repo.set({
			...req.body
		})
		await repo.save()
		res.json(repo)
	}catch(error){
		res.json(error)
	}
})

router.delete("/repos/:id", async (req:Request, res:Response) => {
	try{
		const repo = await db.Repository.findByPk(req.params.id)
		await repo.destroy()
		res.json({
			msg:"repository silindi..."
		})
	}catch(error){
		res.json(error)
	}
})



router.delete("/devs/:id", async (req:Request, res:Response) => {
	try{
		const dev = await db.Developer.findByPk(req.params.id)
		await dev.destroy()	
		res.json({
			msg:"developer silindi..."
		})
	}catch(error){
		res.json(error)
	}
})

export default router
