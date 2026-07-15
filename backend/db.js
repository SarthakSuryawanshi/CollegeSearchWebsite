const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../database/colleges.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS colleges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT,
    address TEXT,
    contact_number TEXT,
    courses TEXT,
    type TEXT,
    website TEXT
  )
`);

module.exports = db;
