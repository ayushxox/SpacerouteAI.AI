// /server/app.js

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the views directory (where your EJS files are located)
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images) from the /client directory
app.use(express.static(path.join(__dirname, '../client')));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies (for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const gameRoutes = require('./routes/gameRoutes');
const authRoutes = require('./routes/authRoutes');

// Route for rendering the login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Route for rendering the game page
app.get('/game', (req, res) => {
    res.render('game');
});

// API routes
app.use('/api/game', gameRoutes);
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
