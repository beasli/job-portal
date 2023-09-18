const express = require('express');

const sequelize = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const skillRoutes = require('./routes/skillRoutes');

const formDataToRawJSON = require('./middleware/formDataToRawJSON');

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Apply the formDataToRawJSON middleware
app.use(formDataToRawJSON);

// Parse incoming JSON data
app.use(express.json());

// Use the user routes
app.use('/api', userRoutes);

// Use the skill routes
app.use('/api/skills', skillRoutes);

// New GET route to show a message (optional)
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello, this is a GET API route!' });
});

// Sync the database and start the server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

