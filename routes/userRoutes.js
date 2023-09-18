const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const verifyToken = require('../middleware/verifyToken');

// Sample route to create a user
router.post('/auth/register', authController.createUser);

// API route for user login
router.post('/auth/login', authController.loginUser);

// Add a single skill to a user
router.post('/user/skill/:skillId', verifyToken, userController.addSkillToUser);

// Add multiple skills to a user (in bulk)
router.post('/user/skills', verifyToken, userController.addSkillsToUser);

// Get all data of the authenticated user with their skills
router.get('/user', verifyToken, userController.getUserDataWithSkills);


module.exports = router;

