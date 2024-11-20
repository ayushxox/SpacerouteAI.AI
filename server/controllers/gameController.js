const pool = require("../db");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { spawn } = require('child_process'); 

// Utility function to safely execute Python scripts using input files
const executePythonScript = (command, args, callback) => {
  const inputFilePath = path.join(__dirname, "input.json");
  const inputData = {
    command: args[0],
    user_route: args[1],
    actual_route: args[2],
  };

  fs.writeFileSync(inputFilePath, JSON.stringify(inputData), "utf8");

  const fullCommand = `python ${command} ${inputFilePath}`;
  exec(fullCommand, (error, stdout, stderr) => {
    fs.unlinkSync(inputFilePath); // Clean up the input file after execution
    callback(error, stdout, stderr);
  });
};

// Start Game Controller
exports.startGame = async (req, res) => {
  try {
    const startLocation = await pool.query(
      "SELECT name FROM locations ORDER BY RANDOM() LIMIT 1"
    );
    const endLocation = await pool.query(
      "SELECT name FROM locations WHERE name != $1 ORDER BY RANDOM() LIMIT 1",
      [startLocation.rows[0].name]
    );

    res.json({
      start_location_name: startLocation.rows[0].name,
      end_location_name: endLocation.rows[0].name,
    });
  } catch (err) {
    console.error("Error starting game:", err);
    res.status(500).json({ error: "Failed to start the game" });
  }
};

// Get Hint Controller
exports.getHint = (req, res) => {
  const userInput = req.body.userInput || "";
  const startLocation = req.body.startLocation;
  const endLocation = req.body.endLocation;

  const pythonProcess = spawn("python", [
    path.join(__dirname, "../groq_integration.py"),
  ]);

  pythonProcess.stdin.write(
    JSON.stringify({
      command: "get_hint",
      user_route: userInput,
      start_location: startLocation,
      end_location: endLocation,
    })
  );
  pythonProcess.stdin.end();

  pythonProcess.stdout.on("data", (data) => {
    res.json({ hint: data.toString().trim() });
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
    res.status(500).json({ error: "Failed to get hint" });
  });
};

// Submit Answer Controller
exports.submitAnswer = (req, res) => {
    const { userRoute, startLocation, endLocation } = req.body;

    const pythonProcess = spawn('python', [path.join(__dirname, '../groq_integration.py')]);

    pythonProcess.stdin.write(JSON.stringify({
        command: "calculate_score",
        user_route: userRoute,
        start_location: startLocation,
        end_location: endLocation
    }));
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', (data) => {
        if (!res.headersSent) {
            res.json({ score: data.toString().trim() });
        }
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to calculate score' });
        }
    });
};
