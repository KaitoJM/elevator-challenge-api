import sqlite3 from "sqlite3";

// Automatically detect if running tests (no ENV variable needed)
// Jest sets JEST_WORKER_ID when running tests
const isTestEnvironment = !!process.env.JEST_WORKER_ID;
const dbPath = isTestEnvironment ? "./test.db" : "./elevator.db";

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to DB", err);
  } else {
    console.log("SQLite connected");
  }
});

export default db;
