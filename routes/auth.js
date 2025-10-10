const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
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


router.post('/login',async(req,res)=>{
  const {username,password} = req.body;
  const user = users.find(u => u.username === username);

  if(!user) return res.status(400).json({msg: 'Invalid credentials'});
  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch) return res.status(400).json({msg: 'Invlid credentials'});

  const token = jwt.sign({id:user.id},process.env.JWT_SECRET, {expiresIn:'1h'});
  res.json({token});

})


router.get('/profile', authMiddleware, (req,res)=> {
  const user = users.find (u=> u.id === req.user.id);
  res.json({id:user.id, username:user.username})
})

module.exports = router;