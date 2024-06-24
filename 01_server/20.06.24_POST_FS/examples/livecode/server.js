import express from 'express';
import fs from 'fs/promises';
const app = express();
const PORT = process.env.PORT || 5001;
import cors from 'cors';

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('it works!');
});

const args = process.argv.slice(2).join(',');
console.log(args);

app.get('/hello', (req, res) => {
  res.send('hello ');
});

//node server.js 'yourinput'
//grab the passed in value from process.argv.slice(2)[0]

//WRITE FILE
//fs.writeFile('name of file',value)
//.then ===> console.log a message or do somethin else if you wish
//.catch any errors

//READ FILE
//fs.readFile('name of file','utf-8')
//.then ===> console.log the content of the file
//.catch any errors

/* fs.writeFile('user.txt',args)
.then(()=>console.log(`user.txt file was created with content ${args}`))
.catch(e=>console.log(e.message))  */

fs.readFile('user.txt', { encoding: 'utf-8' })
  .then((data) =>
    fs.writeFile('user.txt', `${data} ${JSON.stringify({ person: args })}`)
  )
  .catch((e) => console.log(e.message));

app.get('/user', (req, res) => {
  fs.readFile('user.txt', { encoding: 'utf-8' })
    .then((data) => res.send(data))
    .catch((e) => console.log(e.message));
});
app.post('/user', (req, res) => {
  console.log(req.body);

  res.send(`Hello user: ${JSON.stringify(req.body)}`);
});

let counter=0
app.post('/counter', (req, res) => {
  console.log(req.body);
  counter=req.body.count
  console.log(counter)
  res.send(`Hello user: ${JSON.stringify(req.body)}`);
});
app.get('/counter', (req, res) => {
  console.log(req.body);
  res.send(`Hello user: ${JSON.stringify(counter)}`);
});



app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
