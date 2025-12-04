import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const DB_FILE = process.env.DB_FILE || "./votar.sqlite";

// Conectamos a la base de datos
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error(" Error al conectar a SQLite:", err.message);
  } else {
    console.log(" Conectado a SQLite:", DB_FILE);
  }
});

// Ejecutar migraciones desde init.sql
const migrationsPath = path.join(process.cwd(), "migrations", "init.sql");

export function runMigrations() {
  const sql = fs.readFileSync(migrationsPath, "utf8");

  db.exec(sql, (err) => {
    if (err) {
      console.error("Error ejecutando migraciones:", err);
    } else {
      console.log("Migraciones ejecutadas correctamente");
    }
  });
}

// Exportamos db para usarlo en los demás módulos
export default db;
