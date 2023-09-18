const User = require('../models/user');
const Skill = require('../models/skill');

exports.addSkillToUser = async (req, res) => {
  try {
    const { skillId } = req.params;
    const { userId } = req;


    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the logged-in user matches the requested user
    if (user.id !== userId) {
      return res.status(403).json({ error: 'Unauthorized. You cannot update skills for this user' });
    }

    const skill = await Skill.findByPk(skillId);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    await user.addSkill(skill);
    res.json({ message: 'Skill added to user successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addSkillsToUser = async (req, res) => {
  try {
    const { userId } = req;
    const { skillIds } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the logged-in user matches the requested user
    if (user.id !== userId) {
      return res.status(403).json({ error: 'Unauthorized. You cannot update skills for this user' });
    }

    const skills = await Skill.findAll({ where: { id: skillIds } });
    if (skills.length !== skillIds.length) {
      return res.status(400).json({ error: 'One or more skills not found' });
    }

    await user.addSkills(skills);
    res.json({ message: 'Skills added to user successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserDataWithSkills = async (req, res) => {
    try {
      const { userId } = req; // userId is obtained from the decoded token
  
      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] },
        include: {
          model: Skill,
          as: 'skills',
          through: { attributes: [] }, // Exclude intermediate table attributes
        },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};
