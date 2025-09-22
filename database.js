const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/expenses.db');

db.serialize(() => {
    db.run('DELETE FROM expenses');
    db.run('INSERT INTO expenses (desc, amount, category) VALUES ("Lunch", 120, "Food")');
    db.run('INSERT INTO expenses (desc, amount, category) VALUES ("Bus", 30, "Transport")');
});

db.close();
