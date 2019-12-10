const express = require("express");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.static("public"));

// Initialize sqlite
const dbFile = "./.data/sqlite.db";
const db = new sqlite3.Database(dbFile);

// If db file does not exist, create it
db.serialize(() => {
  if (!fs.existsSync(dbFile)) {
    db.run("CREATE TABLE Cards (id TEXT PRIMARY KEY, content TEXT)");
    console.log("Cards table created!");
  }
});

app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`));
