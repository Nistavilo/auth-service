const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/user');
const authMiddleware = require('../middleware/auth');


router.post('/register', async (req, res) => {
    const {username, password} = req.body;

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { id: Date.now(), username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ msg: 'User registered successfully' });
});
