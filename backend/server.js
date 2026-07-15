// Auto-seed if database is empty
const db = require('./db');
const path = require('path');
const colleges = require('./collegesData.json');

const count = db.prepare('SELECT COUNT(*) as c FROM colleges').get().c;
if (count === 0) {
  const insert = db.prepare(`
    INSERT INTO colleges (name, city, state, address, contact_number, courses, type, website)
    VALUES (@name, @city, @state, @address, @contact_number, @courses, @type, @website)
  `);
  const insertMany = db.transaction((rows) => {
    for (const row of rows) insert.run(row);
  });
  insertMany(colleges);
  console.log(`Auto-seeded ${colleges.length} colleges`);
}const express = require('express');
const cors = require('cors');
const path = require('path');
const collegesRouter = require('./routes/colleges');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../fronend')));

app.use('/api/colleges', collegesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
