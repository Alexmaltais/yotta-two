const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

const router = express.Router();

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      role: req.body.role,
      jiraName: req.body.jiraName,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: 'User created',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Echec d'authentification"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password)
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Echec d'authentification"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, role: fetchedUser.role, jiraName: fetchedUser.jiraName, userId: fetchedUser._id},
        'le_nom_de_mon_chien_est_cadeau',
        { expiresIn: '3h' }
      );
      res.status(200).json({
        token: token,
        expiresIn: 10800,
        userId: fetchedUser._id,
        role: fetchedUser.role,
        jiraName: fetchedUser.jiraName
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Echec d'authentification"
      });
    });
});

module.exports = router;
