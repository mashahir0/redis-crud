import express from 'express';
import redis from '../redis';
import { addTask, deleteTask, editTask, getTasks } from '../controller/taskController';

const taskRouter = express.Router();


taskRouter.get('/',getTasks)


taskRouter.post('/',addTask)

taskRouter.put('/:id',editTask);


taskRouter.delete('/:id',deleteTask);

export default taskRouter;
