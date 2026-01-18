import db from "../../db.js";

export default class OnboardRepository {
  // Initialize the table structure
  async initializeTable() {
    return new Promise((resolve, reject) => {
      const sql = `
        CREATE TABLE IF NOT EXISTS onboard_requests (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          current_floor INTEGER NOT NULL,
          dropoff_floor INTEGER NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `;

      db.run(sql, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  // Clear all data from the table (for testing)
  async clearAll() {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM onboard_requests", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  create(name, currentFloor, dropOffFloor) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO onboard_requests (name, current_floor, dropoff_floor)
        VALUES (?, ?, ?)
      `;

      db.run(sql, [name, currentFloor, dropOffFloor], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            name,
            currentFloor,
            dropOffFloor,
          });
        }
      });
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT id, name,
               current_floor AS currentFloor,
               dropoff_floor AS dropOffFloor
        FROM onboard_requests
        ORDER BY id ASC
      `;

      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows || []);
        }
      });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT id, name,
               current_floor AS currentFloor,
               dropoff_floor AS dropOffFloor
        FROM onboard_requests
        WHERE id = ?
      `;

      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row || null);
        }
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM onboard_requests WHERE id = ?`;

      db.run(sql, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }
}
