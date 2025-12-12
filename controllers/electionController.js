import db from "../database.js";

export const createElection = async (req, res) => {
   try {
      const { title, description } = req.body;

      if (!title) {
            return res.status(400).json({ error: "El título es obligatorio" });
    }


    const query = `
        INSERT INTO elections (title, description)
        VALUES (?, ?)
        `;

     await db.run(query, [title, description]);

    res.json({ message: "Elección creada exitosamente" });
   } catch (error) {
    res.status(500).json({ error: "Error al crear la elección", details: error });
   }
};


export const getElections = async (req, res) => {
   try{
      const elections = await db.all(`
      SELECT id, title, description, isActive
      FROM elections
      ORDER BY id DESC
    `);

    res.json(elections);
} catch (error) {
   res.status(500).json({
      error: "Error al obtener las elecciones", 
      details: error
   });

}
};