const db = require('./db');
const colleges = require('./collegesData.json');

// Clear existing data before reseeding, to avoid duplicates
db.exec('DELETE FROM colleges');
db.exec("DELETE FROM sqlite_sequence WHERE name='colleges'");

const insert = db.prepare(`
  INSERT INTO colleges (name, city, state, address, contact_number, courses, type, website)
  VALUES (@name, @city, @state, @address, @contact_number, @courses, @type, @website)
`);

const insertMany = db.transaction((rows) => {
  for (const row of rows) insert.run(row);
});

insertMany(colleges);

console.log(`Seeded ${colleges.length} colleges successfully.`);