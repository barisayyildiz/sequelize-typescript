import express, { Request, Response } from "express"
import db from "../models"

const router = express.Router()

router.get("/devs", async (req:Request, res:Response) => {
	try{
		const devs = await db.Developer.findAll({
			include:[{
				model:db.Repository,
				as:'repository'
			}
		]
		})
		res.json(devs)
	}catch(error){
		console.log(error)
		res.json(error)
	}
})

router.get("/devs/:id", async (req:Request, res:Response) => {
	try{
		const devs = await db.Developer.findOne({
			include:[{
				model:db.Repository,
				as:'repository'
			}],
			where:{
				id:req.params.id
			}
		})
		res.json(devs)
	}catch(error){
		console.log(error)
		res.json(error)
	}
})

router.post("/devs", async (req:Request, res:Response) => {
	try{
		const dev = await db.Developer.create({
			...req.body
		})
		res.json(dev)
	}catch(error){
		res.json(error)
	}
})

router.put("/devs/:id", async (req:Request, res:Response) => {
	try{
		const dev = await db.Developer.findByPk(req.params.id)
		dev.set({
			...req.body
		})
		await dev.save()
		res.json(dev)
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
