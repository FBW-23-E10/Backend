import express from 'express';
import mongoose from 'mongoose';
import roles from './data/userRoles.js';
import offices from './data/offices.js';
import employees from './data/employees.js';
import { Role } from './models/roleModel.js';
import { Office } from './models/officeModel.js';
import { Employee } from './models/employeeModel.js';

const app = express();

app.get('/', (req, res) => {
  res.send('hey');
});

//EMPLOYEE ROUTES
app.get('/employees', async (req, res) => {
  const employees = await Employee.find();
  res.status(200).send(employees);
});
app.get('/employees/full', async (req, res, next) => {
  try {

    const position=req.query.position
    const minage=req.query.minage
    const employees = await Employee.find()
      .populate('office', 'city')
      .populate('roles')
      .where('position')
      .equals(position)
      .where('age')
      .gt(minage)
      .sort({ age: 'asc' })
      .exec();
    console.log(employees);
    res.status(200).send(employees);
  } catch (error) {
    next(error);
  }
});

app.post('/employees/seed', async (req, res, next) => {
  try {
    const employeesToSeed = employees.map((employee) => new Employee(employee));
    await Employee.insertMany(employeesToSeed);
    const savedEmployees = await Employee.find();
    res.status(201).send(savedEmployees);
  } catch (error) {
    next(error);
  }
});

//OFFICE ROUTES
app.get('/offices', (req, res) => {});

app.post('/offices/seed', async (req, res, next) => {
  const officesToSeed = offices.map((office) => new Office(office));
  await Office.insertMany(officesToSeed);
  const savedOffices = await Office.find();
  res.status(201).send(savedOffices);
});

//ROLE ROUTES

app.get('/roles/', async (req, res, next) => {
  try {
 /*    const limit = parseInt(req.query.limit) || 0;
    const currentPage = parseInt(req.query.page)-1 || 0;
    console.log(limit); */

    const roles = await Role.find() /* .populate('employees') */
      /* .limit(limit)
      .skip(currentPage * limit) */
      .where('name').equals('Developer')
      .exec();

    res.status(200).send(roles);
  } catch (error) {
    next(error);
  }
});
app.get('/roles/full', async (req, res, next) => {
  try {
    const roles = await Role.find().populate('employees').exec();

    res.status(200).send(roles);
  } catch (error) {
    next(error);
  }
});

app.post('/roles/seed', async (req, res, next) => {
  const rolesToSeed = roles.map((role) => new Role(role));
  await Role.insertMany(rolesToSeed);
  const savedRoles = await Role.find();
  res.status(201).send(savedRoles);
});

//ERROR_HANDLER

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message });
  }
});

//SERVER + MONGO STUFF

app.listen(4000, () => {
  console.log('server running on port 4000');
});

mongoose.connect('');
mongoose.connection
  .on('error', console.error)
  .on('open', () =>
    console.log(`Conntected to MongoDB / ${mongoose.connection.name}`)
  );
