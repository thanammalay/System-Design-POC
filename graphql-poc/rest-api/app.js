const express = require('express');

const app = express();

const users = [
  {
    id: 1,
    name: 'John',
    email: 'john@gmail.com'
  },
  {
    id: 2,
    name: 'Sam',
    email: 'sam@gmail.com'
  }
];

const orders = [
  {
    id: 1,
    userId: 1,
    product: 'Laptop',
    amount: 50000
  },
  {
    id: 2,
    userId: 1,
    product: 'Mouse',
    amount: 1000
  }
];

// GET USERS
app.get('/users', (req, res) => {
  res.json(users);
});

// GET SINGLE USER
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  res.json(user);
});

// GET ORDERS OF USER
app.get('/orders/user/:userId', (req, res) => {
  const userOrders = orders.filter(
    o => o.userId == req.params.userId
  );

  res.json(userOrders);
});

app.listen(3000, () => {
  console.log('REST API running on port 3000');
});