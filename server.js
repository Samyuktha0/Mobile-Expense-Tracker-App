const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const db = new sqlite3.Database('./data/expenses.db');

app.use(cors());
app.use(express.json());

db.run(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    desc TEXT,
    amount REAL,
    category TEXT
)`);

app.get('/api/expenses', (req, res) => {
    db.all('SELECT * FROM expenses ORDER BY id DESC', [], (err, rows) => {
        if (err) return res.status(500).send(err);
        res.json(rows);
    });
});

app.post('/api/expenses', (req, res) => {
    const { desc, amount, category } = req.body;
    db.run('INSERT INTO expenses (desc, amount, category) VALUES (?, ?, ?)', [desc, amount, category], function(err) {
        if (err) return res.status(500).send(err);
        res.json({ id: this.lastID });
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
