import express from 'express';
import { validateFields,validateAge } from './middleware/validateInput.js';
const app = express();
app.use(express.json());
const PORT = 3000;





//app.use('/validateuser',validateInput)

app.get('/', (req, res) => {
  res.send('hello');
});

app.post('/validateuser',validateAge,validateFields, (req, res) => {
  res.send(req.body);
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
