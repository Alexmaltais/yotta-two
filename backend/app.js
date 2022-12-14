const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const tasksEpRoutes = require('./routes/tasks-ep');

const app = express();

mongoose.connect('mongodb://localhost:27017/mean-stack', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to db')
  })
  .catch(() => {
    console.log('Connection failed')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  )
  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/jiraEpargne', tasksEpRoutes);

 module.exports = app;
