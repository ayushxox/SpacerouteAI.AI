// /server/routes/authRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Assuming you're using a PostgreSQL database connection pool

const router = express.Router();

// Login or Register route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log('Received username:', username);
    console.log('Received password:', password);

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Check if the user exists in the database
        const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (userResult.rows.length === 0) {
            // If user does not exist, create a new user
            const salt = await bcrypt.genSalt(10);

            console.log('Generating hash for password:', password);

            const hashedPassword = await bcrypt.hash(password, salt);

            // Insert the new user into the database
            const newUser = await pool.query(
                'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *',
                [username, hashedPassword]
            );

            // Generate JWT for the new user
            const token = jwt.sign({ userId: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.json({ message: 'User registered and logged in successfully', token });
        } else {
            // If user exists, verify the password
            const user = userResult.rows[0];
            const isMatch = await bcrypt.compare(password, user.password_hash);

            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            // If password matches, generate JWT
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.json({ message: 'User logged in successfully', token });
        }
    } catch (err) {
        console.error('Error during login or registration:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
