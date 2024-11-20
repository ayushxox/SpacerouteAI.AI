// /client/js/scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html'; // Redirect to login page if no token
        return;
    }

    const startLocationElement = document.getElementById('start-location');
    const endLocationElement = document.getElementById('end-location');
    const hintElement = document.getElementById('hint');
    const scoreElement = document.getElementById('score');

    fetch('/api/game/start', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        startLocationElement.textContent = data.start;
        endLocationElement.textContent = data.end;
    });

    document.getElementById('get-hint').addEventListener('click', () => {
        const userInput = document.getElementById('directions').value;

        fetch('/api/game/hint', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userInput })
        })
        .then(response => response.json())
        .then(data => {
            hintElement.textContent = data.hint;
        });
    });

    document.getElementById('submit-directions').addEventListener('click', () => {
        const userRoute = document.getElementById('directions').value;
        const actualRoute = ""; // Implement actual route calculation

        fetch('/api/game/score', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userRoute, actualRoute })
        })
        .then(response => response.json())
        .then(data => {
            scoreElement.textContent = data.score;
        });
    });

    // Logout functionality
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });
});
