import express from "express";
import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Crear usuario(para pruebas)
router.post("/registrar", (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({error: "Faltan campos obligatorios"});
    } 
    
    const hashed = bcrypt.hashSync(password, 10);
    const id = uuidv4();

    const sql = 'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?)';
    
    db.run(sql, [id, name, email, hashed, role || "student"], function (err) {
       if (err) {
        return res.status(500).json({error: "Error crado el usuario", details: err });

    }
    res.json({ message: "Usuario creado exitosamente", id});

    });
});

//Login de usuario

router.post("/longin", (req, res) => {
    const { email, password} = req.body;
    
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.get(sql, [email], (err, user) => {
        if (err) return res.status(500).json({ error: "Error en la base de Datos"});
        if (!user) return res.status(401).json({error: "Usuario no Encontrado"});

        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) return res.status(401).json({error: "Contraseña Incorrecta"});

        const token = jwt.sing(
            { id: user.id, role: user.role, name: user.name},
             jwt_SECRET,
             { expireIn: "8h" }
        );

        res.json({ message: "Login Exitoso", 
            token, 
            user: { id: user.id,
            name: user.name, 
            email: user.email, 
            role: user.role
        }
    });
 });
});

export default routter;
    


