const express = require('express');

const app = express();
const data = [{
  id: 1,
  firstName: 'Aman',
  lastName: 'Singh'
}, {
  id: 2,
  firstName: 'Avitesh',
  lastName: 'Singh'
}];
app.get('/users', (req, res) => {
  res.send(data);
});

const start = () => {
  app.listen(3001, () => {
    console.log('Server is up at 3001');
  });
};

module.exports = start;