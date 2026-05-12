REST API vs GraphQL POC (Node.js)
Project Structure
poc-project/
│
├── rest-api/
│   ├── app.js
│   └── package.json
│
└── graphql-api/
    ├── app.js
    └── package.json


1.1 REST API POC
Install
mkdir rest-api
cd rest-api
npm init -y
npm install express
1.2.Run REST API
node app.js
1.3.REST API Testing
Get Users
GET http://localhost:3000/users
Get User By ID
GET http://localhost:3000/users/1
Get Orders By User
GET http://localhost:3000/orders/user/1

1.4.REST Problem
Frontend must call multiple APIs:
/users/1
/orders/user/1
Multiple requests are needed.

2.GraphQL POC
2.1Install
mkdir graphql-api
cd graphql-api
npm init -y
npm install express express-graphql graphql
2.2Run GraphQL API
node app.js
2.3Open GraphQL Playground
http://localhost:4000/graphql

GraphQL Query
{
  user(id: 1) {
    name
    email
    orders {
      product
      amount
    }
  }
}
GraphQL Response
{
  "data": {
    "user": {
      "name": "John",
      "email": "john@gmail.com",
      "orders": [
        {
          "product": "Laptop",
          "amount": 50000
        },
        {
          "product": "Mouse",
          "amount": 1000
        }
      ]
    }
  }
}

REST vs GraphQL Summary
Feature	REST	GraphQL
Endpoints	Multiple	Single
Data	Fixed	Flexible
Frontend Calls	Many	One
Easy to Learn	Yes	Medium
Best For	CRUD APIs	Complex dashboards
