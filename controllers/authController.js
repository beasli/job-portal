const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await user.validPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Password is valid, generate and send JWT token
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

