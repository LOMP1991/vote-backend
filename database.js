import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const initDB = async () => {
    const db = await open({
        filename: "./votar.sqlite",
        driver: sqlite3.Database,
    });

    console.log("Conexión a la base de datos establecida");

// Crear tabla de usuarios si no existe
 await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            passsword TEXT NOT NULL
        );
        
    `);

// Tabla de elecciones
 await db.exec(`
      CREATE TABLE IF NOT EXISTS elections (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         title TEXT NOT NULL,
         description TEXT,
         isActive INTEGER DEFAULT 0
       );
  `);
    console.log("Migraciones ejecutadas correctamente");

    return db;
 };

 export default await initDB();