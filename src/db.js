const { Pool } = require("pg");

const dbHost = process.env.DB_HOST?.trim() || "localhost";
const dbPort = process.env.DB_PORT
  ? Number(process.env.DB_PORT)
  : 5432;

console.log("=== DATABASE CONFIG ===");
console.log("Host:", dbHost);
console.log("Port:", dbPort);
console.log("User:", process.env.DB_USER);
console.log("Database:", process.env.DB_NAME);
console.log("Password loaded:", !!process.env.DB_PASSWORD);
console.log("=======================");

const pool = new Pool({
  host: dbHost,
  port: dbPort,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;