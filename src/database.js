const mysql = require("mysql2");
const { promisify } = require("util");

const { database } = require("./keys");

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("DB Error: database connection closed");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("DB Error: database has too many connections");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("DB Error: database connection refused");
    }
  }

  if (connection) {
    connection.release();
    console.log("DB connected");
  }

  return;
});

// Promisify pool queries
pool.query = promisify(pool.query);

module.exports = pool;
