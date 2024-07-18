import express from 'express';
import mongoose from 'mongoose';
import roles from './data/userRoles.js';
import offices from './data/offices.js';
import employees from './data/employees.js';
import addresses from './data/addresses.js';
import { Role } from './models/roleModel.js';
import { Office } from './models/officeModel.js';
import { Employee } from './models/employeeModel.js';
import { Address } from './models/addressModel.js';
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
    const employees = await Employee.find().populate('office','city').populate('roles').exec();
    console.log(employees)
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
app.post('/offices', (req, res) => {
  res.send('hey');
});
app.post('/offices/seed', async (req, res, next) => {
  const officesToSeed = offices.map((office) => new Office(office));
  await Office.insertMany(officesToSeed);
  const savedOffices = await Office.find();
  res.status(201).send(savedOffices);
});

//ROLE ROUTES
app.get('/roles', (req, res) => {});
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
//ADDRESS ROUTES
app.get('/addresses', (req, res) => {});
app.post('/addresses', (req, res) => {
  res.send('hey');
});
app.post('/addresses/seed', async (req, res, next) => {
  const addressesToSeed = addresses.map((address) => new Address(address));
  await Address.insertMany(addressesToSeed);
  const savedaddresses = await Address.find();
  res.status(201).send(savedaddresses);
});

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

mongoose.connect('mongodb+srv://noname:1234@cluster0.1b1vhee.mongodb.net/');
mongoose.connection
  .on('error', console.error)
  .on('open', () =>
    console.log(`Conntected to MongoDB / ${mongoose.connection.name}`)
  );
