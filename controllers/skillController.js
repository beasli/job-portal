const Skill = require('../models/skill');

exports.createSkill = async (req, res) => {
  try {
    const { name } = req.body;
    const skill = await Skill.create({ name });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSkillById = async (req, res) => {
  try {
    const { skillId } = req.params;
    const skill = await Skill.findByPk(skillId);

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    const { name } = req.body;
    const skill = await Skill.findByPk(skillId);

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    skill.name = name;
    await skill.save();
    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    const skill = await Skill.findByPk(skillId);

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    await skill.destroy();
    res.json({ message: 'Skill deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
