import { Request, Response } from "express";
import redis from '../redis'


export const getTasks = async(req:Request,res:Response)=>{
    try {
        const key = await redis.keys("task:*")
        const tasks = await Promise.all(key.map(async (key)=>{
            const value = await redis.get(key)
            return{id: key.split(':')[1],task : value}
        }))
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const addTask = async(req:Request , res: Response)=>{
    try {
        const  id = Date.now().toString()
        const  {task} = req.body
        await redis.set(`task:${id}`,task)
        res.status(200).json({id , task})
    } catch (error) {
        res.status(500).json(error)
    }
}

export const editTask = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const {task } = req.body
        await redis.set(`task:${id}`,task)
        res.status(200).json({id,task})
    } catch (error) {
        res.status(500)
        
    }
}

export const deleteTask = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        await redis.del(`task:${id}`)
        res.sendStatus(204)
    } catch (error) {
        res.status(500)
    }
}