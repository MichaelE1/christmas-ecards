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
    db.run("CREATE TABLE Cards (id INTEGER PRIMARY KEY, content TEXT)");
    console.log("Cards table created!");
  }
});

app.post("/access", (req, res) => {
  db.get(
    "SELECT id, content FROM Cards WHERE id = ?",
    [req.body.ID.toString()],
    (err, row) => {
      console.log(err);
      res.json({ row });
    }
  );
});

app.post("/save", (req, res) => {
  db.run(
    "INSERT INTO Cards (content) VALUES (?)",
    [JSON.stringify(req.body)],
    function(err) {
      console.log(err);
      res.json({ id: this.lastID });
    }
  );
});

app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`));
