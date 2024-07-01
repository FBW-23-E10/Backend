import express from 'express';

import usersRouter from './routes/usersRouter.js';
import { errorHandler ,notFound} from './middlewares/errors.js';


const app = express();
const PORT = 5001;

app.use(express.json())
app.use('/users',usersRouter)
app.get('/', (req, res) => {
    res.send('homepage');
  });

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
