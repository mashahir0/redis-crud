import express from 'express';
import cors from 'cors'
import taskRouter from './routes/tasks';

const app = express();
app.use(cors(
    {
  origin: 'http://localhost:5173', 
  credentials: true
}
));
app.use(express.json());

app.use('/tasks', taskRouter);

app.listen(4000, () => console.log('Server on http://localhost:4000'));
