const express = require('express');

const fs = require('fs');

const path = require('path');

const app = express();

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', "*");
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization, intuit_originatingip, intuit_tid");
  res.header('Access-Control-Allow-Credentials', true);
  next();
};

app.use(allowCrossDomain);
app.use(express.json());
const data = [{
  id: 1,
  firstName: 'Aman',
  lastName: 'Singh'
}, {
  id: 2,
  firstName: 'Avitesh',
  lastName: 'Singh'
}, {
  id: 3,
  firstName: 'Nihaal',
  lastName: 'Singh'
}, {
  id: 4,
  firstName: 'Minni',
  lastName: 'Kaur'
}];
app.post('/user', (req, res) => {
  const pathToUsers = path.join(__dirname, './users.json');
  const rawdata = fs.readFileSync(pathToUsers);
  debugger;
  let users = JSON.parse(rawdata);
  let lastId = users[users.length - 1].id;
  debugger;
  console.log(Number.parseInt(lastId));
  users = [...users, {
    id: lastId + 1,
    ...req.body
  }];
  fs.writeFileSync(pathToUsers, JSON.stringify(users));
  res.send({
    status: 200
  });
});
app.get('/users', (req, res) => {
  const rawdata = fs.readFileSync(path.join(__dirname, './users.json'));
  res.send(JSON.parse(rawdata));
});
app.get('/users/:id', (req, res) => {
  let data = {
    id: 1,
    firstName: 'Test',
    lastName: 'Singh',
    age: 38,
    address: 'abc'
  };

  if (req.params.id === '1') {
    data = {
      id: 1,
      firstName: 'Aman',
      lastName: 'Singh',
      age: 38,
      address: 'abc'
    };
  }

  res.send(data);
});

const start = () => {
  app.listen(3001, () => {
    console.log('Server is up at 3001');
  });
};

module.exports = start;