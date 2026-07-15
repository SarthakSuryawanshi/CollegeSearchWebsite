const express = require('express');
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
