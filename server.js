const express = require("express");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const shortid = require("shortid");
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
    db.run(
      "CREATE TABLE Cards (id INTEGER PRIMARY KEY, shortid STRING, content TEXT)"
    );
    console.log("Cards table created!");
  }
});

app.post("/access", (req, res) => {
  db.get(
    "SELECT shortid, content FROM Cards WHERE shortid = ?",
    [req.body.ID.toString()],
    (err, row) => {
      if (err) console.log(err);
      res.json({ row });
    }
  );
});

app.post("/save", (req, res) => {
  const id = shortid.generate();
  db.run(
    "INSERT INTO Cards (shortid, content) VALUES (?, ?)",
    [id, JSON.stringify(req.body)],
    function(err) {
      if (err) console.log(err);
      res.json({ id });
    }
  );
});

app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`));
