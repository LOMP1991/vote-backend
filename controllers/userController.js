import db from "../database.js";

export const registrarUser = async (req, res) => {
    try {
        const { name, email, passsword } = req.body;

        if (!name || !email || !passsword) {
            return res.status(400).json({ error: " Todos los campos son obligatorios" });
        }
        const query = `INSERT INTO users (name, email, passsword) 
             VALUES (?, ?, ?)
             `;

        await db.run(query, [name, email, passsword]);

          res.json({ message: "Usuario registrado con éxito" });
        } catch (error) {
            console.error("Error registrando usuario", error);
            res.status(500).json({ error: "Error creando el usuario", details: error });
        }
    };