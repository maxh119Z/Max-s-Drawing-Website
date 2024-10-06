const express = require("express");
const Database = require("@replit/database");
const app = express();
const db = new Database();
const port = process.env.PORT || 3000;

app.use(express.json());

// Serve static files (like index.html, style.css, etc.)
app.use(express.static(__dirname));

// Route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/list-emails", async (req, res) => {
  try {
    // Retrieve stored emails from the Replit database
    const response = await db.get("emails"); // Retrieve the emails data (could be object or array)

    // If response is an object with `value`, use response.value; otherwise, treat it as an array
    const emails = response && response.value ? response.value : (Array.isArray(response) ? response : []);

    console.log("Retrieved emails:", emails);

    // Render the list of emails as HTML
    res.send(`
      <html>
        <head>
          <title>Email List</title>
        </head>
        <body>
          <h1>Stored Emails</h1>
          <ul>
            ${emails.length ? emails.map((email) => `<li>${email}</li>`).join("") : "<li>No emails found.</li>"}
          </ul>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error retrieving emails:", error);
    res.status(500).send("Server error");
  }
});


// Route to handle adding an email
// Route to handle adding an email
// Route to handle adding an email
app.post('/add-email', async (req, res) => {
  let newEmail = req.body.email;

  if (!newEmail) {
    // Handle missing email in request body
    return res.status(400).json({ message: 'Email is required' });
  }

  // Normalize the email: trim spaces and convert to lowercase
  newEmail = newEmail.trim().toLowerCase();

  try {
    // Retrieve the emails array from the database
    let response = await db.get('emails');

    // If response is an object with `value`, use response.value; otherwise, initialize as empty array
    let emails = response && response.value ? response.value : [];

    console.log("Before adding, retrieved emails:", emails); // Log the actual array of emails

    // Ensure emails is an array and normalize the emails before comparison
    emails = Array.isArray(emails) ? emails : [];
    const normalizedEmails = emails.map(email => email.trim().toLowerCase());

    // Check if the normalized email already exists
    if (!normalizedEmails.includes(newEmail)) {
      // Add the new email and save back to the database
      emails.push(newEmail);  // Use the normalized version
      console.log("After adding, emails:", emails); // Log after adding the email

      // Save only the array to the database, not an object
      await db.set('emails', emails); 

      console.log('Email added:', newEmail); // Log the success
      return res.status(200).json({ message: 'Email added successfully' });
    } else {
      console.log('Email already exists:', newEmail); // Log duplicates
      return res.status(400).json({ message: 'Email already exists' });
    }
  } catch (error) {
    console.error('Error saving to the database:', error); // Log the actual error
    return res.status(500).json({ message: 'Server error' });
  }
});


// Route to get all stored emails
app.get("/get-emails", async (req, res) => {
  try {
    const emails = await db.get("emails") || [];
    return res.status(200).json(emails);
  } catch (error) {
    console.error("Error retrieving emails:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
