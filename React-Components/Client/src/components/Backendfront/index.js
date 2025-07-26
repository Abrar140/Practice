const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Updated to use built-in express.json() instead of bodyParser

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/entriesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mongoose schema
const entrySchema = new mongoose.Schema({
  number: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  subject: { type: String, required: true },
  status: String,
  readingStatus: { type: String, default: "unread" }, // Default value for readingStatus
  sendingStatus: { type: String, default: "unsent" }, // Default value for sendingStatus
});

// Create Mongoose model
const Entry = mongoose.model("Entry", entrySchema);

// Routes
// GET all entries
app.get("/entries", async (req, res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET entries by status
app.get("/entries/status/:status", async (req, res) => {
  const { status } = req.params;
  try {
    const entries = await Entry.find({ status });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new entry
app.post("/entries", async (req, res) => {
  console.log("newentryreqzz"+req);
  const { number, from, to, subject, status, readingStatus, sendingStatus } = req.body;

  // Create new entry with defaults if necessary
  const newEntry = new Entry({
    number,
    from,
    to,
    subject,
    status,
    readingStatus: readingStatus || "unread",
    sendingStatus: sendingStatus || "unsent",
  });
console.log("newentry"+newEntry);
console.log("newentryreq"+req);
  try {
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update reading status by entry ID
app.put("/entries/:id/readingStatus", async (req, res) => {
  const { id } = req.params;
  const { readingStatus } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { readingStatus },
      { new: true }
    );
    res.json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update sending status by entry ID
app.put("/entries/:id/sendingStatus", async (req, res) => {
  const { id } = req.params;
  const { sendingStatus } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { sendingStatus },
      { new: true }
    );
    res.json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
