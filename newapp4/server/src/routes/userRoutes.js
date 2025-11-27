const express = require('express');
const { getUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:id', auth, getUser);

module.exports = router;