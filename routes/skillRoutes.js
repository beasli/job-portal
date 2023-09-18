const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');


// Create a new skill
router.post('/', skillController.createSkill);

// Get all skills
router.get('/', skillController.getAllSkills);

// Get a skill by ID
router.get('/:skillId', skillController.getSkillById);

// Update a skill by ID
router.put('/:skillId', skillController.updateSkill);

// Delete a skill by ID
router.delete('/:skillId', skillController.deleteSkill);

module.exports = router;
