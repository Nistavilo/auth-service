const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/user');
const authMiddleware = require('../middleware/auth');
